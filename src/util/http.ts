import { lastValueFrom, map, Observable } from 'rxjs';
import { ajax, type AjaxConfig, type AjaxResponse } from 'rxjs/ajax';

class HttpClientClass {
  get<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  get<T = any>(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  get(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  get(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  get(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;

  get(url: string, params?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      params,
      method: 'GET',
      ...options
    });
  }

  // post
  post<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  post<T = any>(url: string, body?: any, options?: HttpOptions & { observe: 'response' }): Observable<AjaxResponse<T>>;
  post<T = any>(
    url: string,
    body?: any,
    options?: (HttpOptions & { includeDownloadProgress: true }) | { includeUploadProgress: true }
  ): Observable<AjaxResponse<T>>;

  post<T = any>(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  post(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;

  post(url: string, body?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      body,
      method: 'POST',
      ...options
    });
  }

  put<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  put<T = any>(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  put(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;

  put(url: string, body?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      body,
      method: 'PUT',
      ...options
    });
  }

  patch<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  patch<T = any>(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  patch(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;

  patch(url: string, body?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      body,
      method: 'PATCH',
      ...options
    });
  }

  delete<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  delete<T = any>(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  delete(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  delete(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  delete(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'text' }
  ): Observable<AjaxResponse<string>>;

  delete(url: string, params?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      params,
      method: 'DELETE',
      ...options
    });
  }

  head<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  head<T = any>(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType?: 'json' }
  ): Observable<AjaxResponse<T>>;

  head(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Observable<AjaxResponse<ArrayBuffer>>;

  head(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  head(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;

  head(url: string, params?: any, options?: HttpOptions): Observable<any> {
    return _request(url, {
      params,
      method: 'HEAD',
      ...options
    });
  }

  request<T>(url: string, config: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Observable<T>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Observable<ArrayBuffer>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Observable<Blob>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'text' }): Observable<string>;

  request<T>(url: string, config: HttpOptions & { observe: 'response'; responseType?: 'json' }): Observable<AjaxResponse<T>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }): Observable<AjaxResponse<ArrayBuffer>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'blob' }): Observable<AjaxResponse<Blob>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'text' }): Observable<AjaxResponse<string>>;
  request(url: string, config: HttpOptions): Observable<any> {
    return _request(url, config);
  }
}

class HttpClientPromiseClass {
  get<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  get(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  get<T = any>(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType?: 'json' }): Promise<AjaxResponse<T>>;

  get(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  get(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  get(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  get(url: string, params?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      params,
      method: 'GET',
      ...options
    });
  }

  // post
  post<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  post<T = any>(url: string, body?: any, options?: HttpOptions & { observe: 'response' }): Promise<AjaxResponse<T>>;

  post<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }): Promise<AjaxResponse<T>>;

  post(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  post(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  post(url: string, body?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      body,
      method: 'POST',
      ...options
    });
  }

  put<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  put<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }): Promise<AjaxResponse<T>>;

  put(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  put(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  put(url: string, body?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      body,
      method: 'PUT',
      ...options
    });
  }

  patch<T = any>(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  patch<T = any>(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType?: 'json' }
  ): Promise<AjaxResponse<T>>;

  patch(
    url: string,
    body?: any,
    options?: HttpOptions & { observe?: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  patch(url: string, body?: any, options?: HttpOptions & { observe?: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  patch(url: string, body?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      body,
      method: 'PATCH',
      ...options
    });
  }

  delete<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  delete(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  delete<T = any>(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType?: 'json' }
  ): Promise<AjaxResponse<T>>;

  delete(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  delete(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  delete(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  delete(url: string, params?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      params,
      method: 'DELETE',
      ...options
    });
  }

  head<T = any>(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  head(url: string, params?: any, options?: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  head<T = any>(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType?: 'json' }
  ): Promise<AjaxResponse<T>>;

  head(
    url: string,
    params?: any,
    options?: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }
  ): Promise<AjaxResponse<ArrayBuffer>>;

  head(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  head(url: string, params?: any, options?: HttpOptions & { observe: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;

  head(url: string, params?: any, options?: HttpOptions): Promise<any> {
    return _requestPromise(url, {
      params,
      method: 'HEAD',
      ...options
    });
  }

  request<T>(url: string, config: HttpOptions & { observe?: 'body'; responseType?: 'json' }): Promise<T>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'arraybuffer' }): Promise<ArrayBuffer>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'blob' }): Promise<Blob>;

  request(url: string, config: HttpOptions & { observe?: 'body'; responseType: 'text' }): Promise<string>;

  request<T>(url: string, config: HttpOptions & { observe: 'response'; responseType?: 'json' }): Promise<AjaxResponse<T>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'arraybuffer' }): Promise<AjaxResponse<ArrayBuffer>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'blob' }): Promise<AjaxResponse<Blob>>;

  request(url: string, config: HttpOptions & { observe: 'response'; responseType: 'text' }): Promise<AjaxResponse<string>>;
  request(url: string, config: HttpOptions): Promise<any> {
    return _requestPromise(url, config);
  }
}

function _requestPromise(url: string, options?: HttpOptions): Promise<any> {
  return lastValueFrom(_request(url, options));
}

function _request(url: string, options?: HttpOptions): Observable<any> {
  let config: any = Object.assign(
    { url, observe: 'body', responseType: 'json', method: 'GET', timeout: 0, async: true, crossDomain: false, withCredentials: false },
    options || {}
  );

  let _url = config.url!;
  const index = url.indexOf('?');
  let query: URLSearchParams;

  if (index > 0) {
    query = new URLSearchParams(_url.substring(index + 1));
  } else {
    query = new URLSearchParams();
  }

  if (HttpInterceptor.request) {
    config = HttpInterceptor.request(config);
  }
  if (config.params && typeof config.params !== 'string') {
    serializeParams(config.params, query);
  }
  config.queryParams = query;

  let ajax$ = ajax(config).pipe(
    map(x => {
      if (x.type === 'download_load') {
        return config.observe === 'body' ? x.response : x;
      }
      return x;
    })
  );

  if (HttpInterceptor.response) {
    ajax$ = HttpInterceptor.response(config, ajax$);
  }
  return ajax$;
}

export const HttpInterceptor: {
  request?: (config: HttpOptions) => HttpOptions;
  response?: (config: HttpOptions, response: Observable<AjaxResponse<any> | any>) => Observable<AjaxResponse<any> | any>;
} = {};

/**
 * 使用Promise API
 */
export const http = new HttpClientPromiseClass();

/**
 * 使用Observable API
 */
export const http2 = new HttpClientClass();

type HttpMergeProps = {
  observe?: 'body' | 'response';
  params?: any;
  url?: string;
  /**
   * 显示loading
   */
  loading?: boolean;
};

export type HttpOptions = Omit<AjaxConfig, 'queryParams' | 'url'> & HttpMergeProps;

export function serialize<T>(obj: T) {
  if (!obj) {
    return;
  }
  const list: { key: string; value: string }[] = [];
  buildParam(obj, list);

  let url = '';
  for (const it of list) {
    url += `${it.key}=${it.value}&`;
  }
  if (url) {
    url = url.substring(0, url.length - 2);
  }
  return url;
}
/**
 * 把js对象序列化对请求数据
 * @param obj
 * @param query URLSearchParams
 * @returns
 */
function serializeParams<T>(obj: T, query: URLSearchParams): void {
  if (!obj) {
    return;
  }
  const list: { key: string; value: string }[] = [];
  buildParam(obj, list);
  for (const it of list) {
    query.append(it.key, it.value);
  }
}

function buildParam<T extends Record<string, any>>(inObj: T, list: { key: string; value: string }[]) {
  let value: any;
  let subName: string;
  let innerObj: Record<string, string>;
  for (const name in inObj) {
    value = inObj[name];
    if (value instanceof Array) {
      for (let i = 0; i < value.length; ++i) {
        if (value[i] instanceof Array || value[i] instanceof Object) {
          if (value[i].toJSON) {
            list.push({ key: name, value: value[i].toJSON() });
            continue;
          }
          innerObj = {};
          innerObj[name + '[' + i + ']'] = value[i];
          buildParam(innerObj, list);
        } else if (value[i] !== undefined && value[i] !== null) {
          list.push({ key: name, value: value[i] });
        }
      }
      continue;
    }
    if (value instanceof Object) {
      if (value.toJSON) {
        list.push({ key: name, value: value.toJSON() });
        continue;
      }

      for (subName of Object.keys(value)) {
        innerObj = {};
        innerObj[name + '.' + subName] = value[subName];
        buildParam(innerObj, list);
      }
      continue;
    }
    if (value !== undefined && value !== null) {
      list.push({ key: name, value });
    }
  }
}
