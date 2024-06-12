/**
 * 跳转到支付地址
 * @param payUrl 跳转url, 从订单接口获取(/order/h5/addPayOrder)
 */
export function forwardPay(payUrl: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let hasLoad = false;
    let hideFrame = document.createElement('iframe');
    hideFrame.onload = () => {
      hasLoad = true;
      //其他逻辑
      setTimeout(() => {
        hideFrame.parentNode!.removeChild(hideFrame);
      }, 500);
      resolve();
    };

    hideFrame.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
      hasLoad = true;
      reject(error);
    };

    setTimeout(() => {
      if (!hasLoad) {
        hideFrame.parentNode!.removeChild(hideFrame);
        reject();
      }
    }, 5000);

    hideFrame.setAttribute('src', payUrl);
    hideFrame.setAttribute('sandbox', 'allow-scripts allow-forms allow-top-navigation allow-same-origin');
    hideFrame.style.visibility = 'hidden';
    hideFrame.style.width = '0';
    hideFrame.style.height = '0';
    document.body.appendChild(hideFrame);
  });
}
