/**
 *  用于import.meta
 */
declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    readonly YYX_BASE_API: string;
    readonly YYX_API_BASEURL: string;
  }
}
