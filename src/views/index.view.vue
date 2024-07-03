<template>
  <van-config-provider :theme-vars="themeVars" class="flex-vertical page-container">
    <van-nav-bar title="H5充值" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div style="padding: 17px 17px 0; flex: 1" class="flex-vertical">
      <div class="flex-main">
        <div class="account-input">
          <label for="phone" class="phone-label">
            {{ Recharge.user?.phone || '请输入氢次元账号或手机号' }}
          </label>

          <van-field v-if="Recharge.user" readonly :modelValue="Recharge.user?.username" class="phone-input">
            <template #right-icon><van-icon name="clear" @click="Recharge.onPhoneClear" /></template>
          </van-field>

          <van-field
            v-if="!Recharge.user"
            id="phone"
            v-model="Recharge.phone"
            type="text"
            clearable
            class="phone-input"
            @update:model-value="Recharge.onPhoneChange"
          />
          <van-field v-show="false"></van-field>
        </div>

        <div class="amount-hint margin-v">请选择充值金额</div>

        <div class="list-box margin-v">
          <div
            class="list-item flex-center-middle"
            :class="{ checked: item == Recharge.selected }"
            v-for="item in Recharge.list"
            :key="item.id"
            @click="item.cashAmount && Recharge.selectItem(item)"
          >
            <div v-if="item.cashAmount">
              <div class="checkbox-div">
                <van-icon name="success" size="18" />
              </div>
              <div class="text-center">
                <img src="@/assets/images/amount.svg" alt="" />
                <div class="amount">￥{{ item.cashAmount }}</div>
                <div class="hamount">{{ item.hamount }}L氢气</div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-amount margin-v flex-horizontal">
          <div class="custom-prefix flex-middle flex-end">￥</div>
          <van-field
            v-model="Recharge.customInput"
            style="background: transparent; padding-left: 5px"
            class="flex-main"
            type="number"
            clearable
            placeholder="自定义充值金额（必须为100的整数倍）"
            @focus="Recharge.selected = null"
            @blur="Recharge.onCustomBlur"
            @update:modelValue="Recharge.onCustomChange"
          />
        </div>

        <div class="user-protocol margin-v">
          <van-checkbox v-model="Recharge.checked">我已阅读并同意</van-checkbox>
          <a @click="Recharge.onShowModal(TweetMark.user_agree)">《服务协议》</a>
          和
          <a @click="Recharge.onShowModal(TweetMark.privacy)">《隐私政策》</a>
        </div>
      </div>
      <van-button round type="primary" style="margin-bottom: 15px" block :disabled="isDisabled" @click="Recharge.onConfirmClick">
        确定充值
      </van-button>
    </div>

    <van-dialog
      v-model:show="Pay.showPayConfirm"
      :title="Pay.payTitle"
      :show-cancel-button="false"
      :show-confirm-button="false"
      class-name="pay-result-dialog"
    >
      <div class="pay-confirm-ok" @click="Pay.onPayOkClick">已完成支付</div>
      <div class="pay-confirm-retry" @click="Pay.showPayConfirm = false">支付遇到问题，重新支付</div>
    </van-dialog>
    <van-dialog v-model:show="Recharge.showTweetModal" :title="Recharge.tweet.name">
      <div v-html="Recharge.tweet.agreeContent" class="qh-html"></div>
    </van-dialog>
  </van-config-provider>
</template>
<script setup lang="tsx">
  import { type ConfigProviderThemeVars, showToast } from 'vant';
  import { http, http2 } from '@/util/http';
  import { catchError, debounceTime, map, of, Subject, switchMap } from 'rxjs';

  import {
    addPayOrder,
    ChannelEnum,
    getOrderInfo,
    OderStatus,
    PayNumberEnum,
    type RechangeItem,
    type SysUser,
    TweetMark,
    TypeEnum
  } from './index.service';
  import { closePayDialog, showPayDialog } from '@/components/pay-choose-dialog';
  import { forwardPay } from '@/views/pay';
  import { globalLoading } from '@/hooks/use-loading';
  import { isMobile, NumberUtil } from '@/util/utils';

  const white = '#fff';
  const themeVars: ConfigProviderThemeVars = {
    navBarBackground: 'transparent',
    navBarTextColor: white,
    navBarTitleTextColor: white,
    navBarIconColor: white,
    checkboxLabelColor: '#999'
  };

  /**
   * 频道编号
   */
  const channelNo = 1;
  const isDisabled = computed(() => !(Recharge.checked && Recharge.user && (Recharge.selected || Recharge.custom)));

  const Recharge = reactive({
    list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }] as RechangeItem[],
    phone: '',
    user: null as SysUser | null,
    checked: false,
    customInput: null as number | null,
    custom: null as number | null,
    customRechangeItem: null as RechangeItem | null,
    selected: null as RechangeItem | null,
    showTweetModal: false,
    tweet: { name: '', agreeContent: '' },
    selectItem(item: RechangeItem) {
      Recharge.selected = item;
      Recharge.custom = null;
      Recharge.customInput = null;
    },
    onPhoneClear() {
      Recharge.user = null;
      Recharge.phone = '';
    },
    onCustomChange(v: number) {
      if (v && v > 0 && v % 100 === 0) {
        Recharge.custom = v;
      } else {
        Recharge.custom = null;
      }
    },
    onCustomBlur() {
      if (!Recharge.customInput) {
        return;
      }
      const custom = +Recharge.customInput;
      if (!(custom > 0 && custom % 100 === 0)) {
        $message('充值金额必须是100的整数倍');
      }
    },
    async onPhoneChange(value: string) {
      phoneChange$.next(value);
    },
    async onConfirmClick() {
      const amount = getAmount();
      if (amount) {
        showPayDialog({
          money: amount.amount,
          hamount: amount.tranHAmount,
          onOk(v) {
            return Pay.onOk(v as 1 | 2);
          }
        });
      }
    },
    async onShowModal(type: TweetMark) {
      const [tweet] = await http.get<{ name: string; agreeContent: string }[]>(`/agree/list`, { agreeType: type, status: 0 });
      Recharge.showTweetModal = true;
      Recharge.tweet = tweet;
    }
  });

  function getAmount() {
    const { custom, selected } = Recharge;
    if (custom) {
      const percent = Recharge.customRechangeItem?.percent ?? 1;
      return { amount: `${custom}`, tranHAmount: NumberUtil.multiply(percent, custom!) };
    }

    if (selected) {
      return { amount: `${selected!.cashAmount}`, tranHAmount: selected!.hamount };
    }

    return null;
  }

  const Pay = reactive({
    showPayConfirm: false,
    payTitle: '',
    orderNo: '',
    // 支付类型 1:微信支付;2.支付宝支付
    async onOk(payType: 1 | 2) {
      const title = { 1: '微信', 2: '支付宝' }[payType];
      Pay.payTitle = `请确认${title}支付是否完成`;

      if (!Recharge.user) {
        return false;
      }

      const amount = getAmount();
      if (!amount) {
        return false;
      }

      if (!isMobile) {
        $message('仅支持手机端支付');
        return false;
      }

      const { orderInfo, orderNo } = await addPayOrder({
        payChannel: ChannelEnum.H5,
        payNumber: PayNumberEnum.WM,
        payType,
        userId: Recharge.user.id,
        ...amount!
      });

      Pay.orderNo = orderNo;

      let url: string;
      // 支付宝
      if (payType === 2) {
        // alipay_sdk=alipay-sdk-java-4.39.79.ALL&app_id=2021003197631032&biz_content=%7B%22out_trade_no%22%3A%22HYHE_ORDER_20240612204816221876%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E6%B0%A2%E6%B0%94%E5%85%85%E5%80%BC%22%2C%22total_amount%22%3A%226%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F39.105.13.19%3A8011%2Forder%2FaliPayNotify&return_url=https%3A%2F%2Fwww.baidu.com&sign=eK1M%2BwQ%2B8STDM%2BNnlOlbgod64UDimHN3LCrAMHNd47eQc9NRkTVpxc2h6EzHNC80xVc8z%2F9XZEH24%2FkhgRJ7hcatmQGOArWIA0UScxsGsleAKeqTG22yJIc8uqcNBceerVWlGdhEYq%2BNNBtplPgt8j7d9iWRzDy%2BSUKl%2BW81e5mjOSqQyznhpXp9xa2BypELP3mU6yxcbJS%2BJ7CDHdMuY%2BGFnnjfAq56l6thegkFHd3BPlZ4gwOF6Hpvoo%2FoYksqq3xUJN87Qw%2BJ5egfpOt3i59KVv5Zq8itHJamTambMMeLjJ42nvKh4420PbnjLNbwcfRexfxLiUPe7ymzasW0UQ%3D%3D&sign_type=RSA2&timestamp=2024-06-12+20%3A48%3A16&version=1.0
        url = `https://openapi.alipay.com/gateway.do?${orderInfo}`;
      } else {
        // {"h5_url":"https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx12210621100303b5a492c42e54695a0001&package=2778671236"}
        const { h5_url } = typeof orderInfo === 'string' ? JSON.parse(orderInfo) : orderInfo;
        if (!h5_url) {
          $message('获取支付信息失败，请重试');
          return false;
        }
        url = h5_url;
      }

      globalLoading.startLoading();
      try {
        await forwardPay(url);
      } catch (e) {
        $message('订单支付失败，设备不支持');
        globalLoading.endLoading();
        return false;
      }
      Pay.showPayConfirm = true;
      globalLoading.endLoading();
      return false;
    },

    async onPayOkClick() {
      const status = await getOrderInfo(Pay.orderNo);
      if (!status) {
        showToast('订单支付失败，订单不存在');
        return;
      }
      if (status === OderStatus.PAY_YES) {
        showToast('订单支付成功');
        Pay.showPayConfirm = false;
        closePayDialog();
      } else {
        showToast('订单支付失败，如有疑问请联系客服');
      }
    }
  });

  const phoneChange$ = new Subject<string>();
  phoneChange$
    .pipe(
      debounceTime(500),
      switchMap(phone => {
        if (phone) {
          return http2
            .get<SysUser>('/sysUser/selectUserByPhone', { phone, channelNo }, { loading: false })
            .pipe(catchError(() => of(null)));
        }
        return of(null);
      })
    )
    .subscribe(user => {
      Recharge.user = user;
    });

  http2
    .get<RechangeItem[]>(`/account/info/rechange/config/${TypeEnum.WM}/${ChannelEnum.H5}`)
    .pipe(map(list => list || []))
    .subscribe(list => {
      const realList: RechangeItem[] = [];
      for (const item of list) {
        if (item.defaultFlag === 1 || item.cashAmount) {
          realList.push(item);
        }
        if (item.defaultFlag === 0) {
          if (!item.cashAmount) {
            Recharge.customRechangeItem = item;
          } else {
            item.hamount = NumberUtil.multiply(item.cashAmount, item.percent);
          }
        }
      }

      Recharge.list = realList;
      Recharge.selected = Recharge.list[1];
    });

  function onClickLeft() {
    // showChoosePayDialog();
  }
</script>

<style scoped lang="less">
  .van-hairline--bottom:after {
    border-bottom-width: 0;
  }

  .margin-v {
    margin-bottom: 16px;
    margin-top: 16px;
  }

  .phone-label {
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding) 0;
    font-size: 16px;
    color: #999;
    display: block;
    height: 30px;
    line-height: 30px;
  }
  .phone-input {
    font-size: 28px;
    color: #333;
  }

  .account-input {
    background: #fff;
    height: 102px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .page-container {
    background: url(@/assets/images/header-bg.svg) left -44px no-repeat;
    background-size: contain;
  }

  .amount-hint {
    color: #999;
  }

  .list-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;

    .list-item {
      aspect-ratio: 1;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid transparent;
      position: relative;
      .checkbox-div {
        display: none;
      }
      &.checked {
        border-color: #0ad16d;
        .checkbox-div {
          display: block;
          width: 22px;
          height: 20px;
          background: #0ad16d;
          border-radius: 0px 8px 0px 8px;
          position: absolute;
          right: 0;
          top: 0;
          color: #fff;
          text-align: center;
        }
      }

      .amount {
        font-size: 24px;
        color: #333333;
        height: 33px;
        line-height: 33px;
        font-weight: 600;
      }
      .hamount {
        font-weight: 400;
        font-size: 12px;
        color: #999;
        line-height: 16px;
      }
    }
  }

  .custom-amount {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 3px 0;
    .custom-prefix {
      width: 28px;
      color: #333;
      font-weight: 500;
      font-size: 16px;
    }
  }

  .user-protocol {
    font-weight: 400;
    font-size: 12px;
    color: #999;
    display: flex;
    a {
      color: #0ad16d;
    }
  }

  .qh-html {
    color: #666;
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .qh-html strong {
    color: #333;
  }

  .qh-html h3 {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .pay-confirm-ok {
    color: #de3554;
    line-height: 42px;
    height: 42px;
    font-size: 20px;
    text-align: center;
    border-top: 1px solid #dee0e1;
    border-bottom: 1px solid #dee0e1;
  }
  .pay-confirm-retry {
    color: #707273;
    line-height: 44px;
    height: 44px;
    font-size: 18px;
    text-align: center;
  }
</style>
