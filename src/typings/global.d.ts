declare global {
  const $dialog: import('vant').showDialog;
  const $message: import('vant').showToast;

  interface Window {
    $dialog: import('vant').showDialog;
    $message: import('vant').showToast;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}

/**
 * 分页
 */
export interface Page<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
}
