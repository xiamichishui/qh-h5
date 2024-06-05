/**
 * 跳转到微信支付
 * @param wxUrl 微信跳转url, 从订单接口获取(/order/h5/addPayOrder)
 */
export function forwardWxPay(wxUrl: string): Promise<void> {
  let hideFrame = document.createElement('iframe');
  const promise = new Promise<void>((resolve, reject) => {
    hideFrame.onload = () => {
      //其他逻辑
      setTimeout(() => {
        hideFrame.parentNode!.removeChild(hideFrame);
      }, 1000);
      resolve();
    };
  });

  hideFrame.setAttribute('src', wxUrl);
  hideFrame.setAttribute('sandbox', 'allow-scripts allow-forms allow-top-navigation allow-same-origin');
  hideFrame.style.visibility = 'hidden';
  hideFrame.style.width = '0';
  hideFrame.style.height = '0';
  document.body.appendChild(hideFrame);
  return promise;
}
