import { HttpInterceptor } from './http';
import { catchError, finalize, Observable, switchMap } from 'rxjs';
import { globalLoading } from '@/hooks/use-loading';

export function httpSetup() {
  let requestCount = 0;
  HttpInterceptor.request = function (config) {
    if (config.loading !== false) {
      requestCount++;
      globalLoading.startLoading();
    }

    let url = config.url!;
    if (!/^http/i.test(url)) {
      if (url.charAt(0) !== '/') {
        url = '/' + url;
      }
      url = (import.meta.env.YYX_BASE_API || '') + url;
    }

    config.url = url;

    if (config.method === 'GET' || config.method === 'DELETE') {
      config.params ||= {};
      config.params.r = Date.now();
    }

    return config;
  };

  HttpInterceptor.response = function (config, response) {
    return response.pipe(
      finalize(() => {
        if (config.loading !== false) {
          requestCount--;
          if (requestCount === 0) {
            globalLoading.endLoading();
          }
        }
      }),
      switchMap(result => {
        return new Observable<any>(observe => {
          if (config.responseType === 'json') {
            if (result?.code !== 0) {
              observe.error({ bizError: true, status: result?.code, message: result?.msg ?? '未知错误' });
              return;
            }
            observe.next(result.data);
            observe.complete();
            return;
          }

          if (result.response instanceof Blob && result.response.type === 'application/json') {
            result.response.text().then(text => {
              const err = JSON.parse(text) as { code: number; errorMsg: string };
              observe.error({ bizError: true, status: err.code, message: err.errorMsg ?? '未知错误' });
            });
            return;
          }

          if (result.response instanceof ArrayBuffer && result.responseHeaders['content-type'].indexOf('application/json') >= 0) {
            const text = arrayBufferToString(result.response);
            const err = JSON.parse(text) as { code: number; errorMsg: string };
            observe.error({ bizError: true, status: err.code, message: err.errorMsg ?? '未知错误' });
            return;
          }

          observe.next(result);
          observe.complete();
        });
      }),
      catchError((err: HttpErrorInfo) => {
        if (err.bizError) {
          $message(err.message);
        } else if (err.status == 403) {
          $message('你没有权限访问');
        } else if (err.status == 404) {
          $message('你访问的地址不存在, 请检查');
        } else {
          $message('啊哦，网络出了点问题~');
        }
        throw err;
      })
    );
  };
}

export interface HttpErrorInfo {
  bizError: boolean;
  status: number;
  message: string;
}

function arrayBufferToString(buffer: ArrayBuffer, encoding = 'utf-8') {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(buffer);
}
