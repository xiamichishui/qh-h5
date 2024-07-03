<template>
  <div class="flex-vertical full-height">
    <div class="flex-main">
      <van-nav-bar :title="props.titleText">
        <template #left>
          <van-icon
            name="cross"
            @click="emit('close')"
            style="color: var(--van-popup-close-icon-color); font-size: var(--van-popup-close-icon-size)"
          />
        </template>
      </van-nav-bar>

      <div style="padding: 16px">
        <van-radio-group v-model="payType">
          <van-cell-group style="background-color: #f7f8fa; border-radius: 8px">
            <van-cell
              v-for="item in props.payWays"
              :key="item.payType"
              :title="item.text"
              :icon="item.icon"
              clickable
              @click="payType = item.payType"
              size="large"
              :style="{ ...item.style, ...style }"
            >
              <template #right-icon>
                <van-radio :name="item.payType" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

        <div class="text-center" style="color: #333; font-size: 20px; margin-top: 40px">
          <span>￥</span>
          <span style="font-size: 40px; font-weight: 500">{{ props.money }}</span>
          <div v-if="props.hamount" class="hamount">{{ props.hamount }}L氢气</div>
        </div>
      </div>
    </div>

    <div style="padding: 16px">
      <van-button block round color="linear-gradient(to right, #ff6034, #ee0a24, #ff6034)" @click="onOkClick">
        {{ props.buttonText }}
      </van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { OkFn, PayType, PayWay } from './pay-choose-dialog';

  interface Props {
    titleText?: string;
    buttonText?: string;
    money?: string | number;
    hamount?: number;
    onOk?: OkFn;
    payWays?: PayWay[];
  }

  const props = withDefaults(defineProps<Props>(), {
    titleText: '确认付款',
    buttonText: '确认支付',
    payWays: () => [
      { icon: 'wechat-pay', text: '微信支付', payType: 1, style: { color: '#0ad16d' } },
      { icon: 'alipay', text: '支付宝', payType: 2, style: { color: '#00cbfe' } }
    ]
  });

  const payType = defineModel<PayType>('payType', { default: 1 });
  const emit = defineEmits(['close']);

  function onCloseClick() {
    emit('close');
  }

  function onOkClick() {
    handleClose(props.onOk);
  }

  function handleClose(fn?: OkFn) {
    if (!fn) {
      onCloseClick();
      return;
    }
    const ret = fn(payType.value!);
    if (ret == null || ret === true) {
      onCloseClick();
    } else if ((ret as Promise<any>).then) {
      (ret as Promise<any>).then(v => {
        if (v == null || v === true) {
          onCloseClick();
        }
        return v;
      });
    }
  }

  const style = { backgroundColor: 'transparent', '--van-cell-icon-size': '24px' };
</script>
<style scoped lang="less">
  ::v-deep(.van-cell__title) {
    color: #333 !important;
  }

  .hamount {
    font-weight: 400;
    font-size: 14px;
    color: #999;
  }
</style>
