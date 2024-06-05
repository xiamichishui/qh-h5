import { http } from '@/util/http';

export function addPayOrder(req: PayOrderReq) {
  return http.post<PayOrderResp>('/order/h5/addPayOrder', req);
}

/**
 * 查询订单状态
 * @param orderNo 订单号
 */
export async function getOrderInfo(orderNo: string) {
  const [order] = await http.post<OderInfoResp[]>('/order/page', {
    page: {
      pageIndex: 1,
      pageSize: 1
    }
  });
  return order;
}

/**
 * 订单管理请求参数 实体类
 */
export interface PayOrderReq {
  /**
   * 充值金额
   */
  amount?: string;
  /**
   * 下单渠道 1:安卓;2.苹果，3.H5
   */
  payChannel?: ChannelEnum;
  /**
   * 购买的是否是会员 0: 会员支付  1 购买章节  2 充值氢气
   */
  payNumber?: number;
  /**
   * 会员配置的id
   */
  payNumberConfigId?: number;
  /**
   * 支付类型 1:微信支付;2.支付宝支付
   */
  payType?: 1 | 2;
  /**
   * 兑换氢气额度
   */
  tranHAmount?: number;
  userId: number;
}

/**
 * 订单管理返回数据 实体类
 */
export interface PayOrderResp {
  /**
   * 订单金额，单元是元
   */
  amount?: number;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 描述
   */
  description?: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 会员配置id
   */
  numberConfigId?: number;
  /**
   * 会员配置名称
   */
  numberConfigName?: string;
  /**
   * 第三方支付下单后返回的订单信息
   */
  orderInfo?: string;
  /**
   * 订单编号
   */
  orderNo: string;
  /**
   * 购买的是否是会员 0:是;1:否
   */
  payNumber?: number;
  /**
   * 付类型 1:微信支付;2.支付宝支付
   */
  payType?: 1 | 2;
  /**
   * 状态 1:未支付;2.已支付;3.支付关闭;4.支付失败
   */
  status?: number;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 用户id
   */
  userId?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 生效时间:已支付时的时间
   */
  vaildTime?: Date;
}

/**
 * 订单管理返回数据 实体类
 */
export interface OderInfoResp {
  /**
   * 订单金额，单元是元
   */
  amount?: number;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 描述
   */
  description?: string;
  /**
   * 主键id
   */
  id: number;
  /**
   * 会员配置id
   */
  numberConfigId?: number;
  /**
   * 会员配置名称
   */
  numberConfigName?: string;
  /**
   * 第三方支付下单后返回的订单信息
   */
  orderInfo?: string;
  /**
   * 订单编号
   */
  orderNo: string;
  /**
   * 购买的是否是会员 0:是;1:否
   */
  payNumber: 0 | 1;
  /**
   * 付类型 1:微信支付;2.支付宝支付
   */
  payType: number;
  /**
   * 状态 1:未支付;2.已支付;3.支付关闭;4.支付失败
   */
  status: 1 | 2 | 3 | 4;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 用户id
   */
  userId?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 生效时间:已支付时的时间
   */
  vaildTime?: Date;
}

export enum ChannelEnum {
  Android = 0,
  IOS = 1,
  H5 = 2
}

export enum TypeEnum {
  /**
   * 会员支付
   */
  MQ = 0,
  /**
   * 购买章节
   */
  WQ = 1,
  /**
   * 充值氢气
   */
  WM = 2
}

export enum TweetMark {
  user_agree = 'user_agree',
  privacy = 'privacy',
  faq = 'faq',
  vip_agree = 'vip_agree',
  child_mode_password = 'child_mode_password'
}

/**
 * SysUser
 */
export interface SysUser {
  appUser?: number;
  avatar?: string;
  birthday?: Date;
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 删除状态 0 正常 1 已删除
   */
  delFlag?: number;
  email?: string;
  id: number;
  isMember?: number;
  isRealAuth?: number;
  isSpecial?: number;
  password?: string;
  phone: string;
  qqName?: string;
  realname?: string;
  selectedRoleNames?: string;
  selectedroles?: string;
  sex?: number;
  /**
   * 状态 0 可用 1 不可用
   */
  status?: number;
  /**
   * 更新人
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: Date;
  username?: string;
  usernameUpdateTime?: Date;
  userSource?: number;
  wechatName?: string;
  weiboName?: string;
}

/**
 * 用户充值配置 出参信息
 */
export interface RechangeItem {
  /**
   * 充值或者兑换金额
   */
  cashAmount: number;
  /**
   * 充值渠道 0-Android 1-IOS  2-H5
   */
  channel: ChannelEnum;
  /**
   * 创建时间
   */
  createdAt?: Date;
  /**
   * 创建人
   */
  createdBy?: number;
  /**
   * 是否默认展示配置  0-否 1-是
   */
  defaultFlag: 0 | 1;
  /**
   * 水分子额度
   */
  h2oAmount: number;
  hamount: number;
  /**
   * 明细ID
   */
  id: number;
  /**
   * 兑换比例
   */
  percent: number;
  /**
   * 类型 0-现金兑换氢气 1-水分子兑换氢气  2-水分子兑换现金
   */
  type?: TypeEnum;
  /**
   * 更新时间
   */
  updateAt?: Date;
  /**
   * 更新人
   */
  updateBy?: number;
}
