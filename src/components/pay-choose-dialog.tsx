import PayChoose from './PayChoose.vue';
import { Popup, type PopupCloseIconPosition, type PopupPosition } from 'vant';
import { type ComponentInstance, extend, inBrowser } from 'vant/lib/utils';
import { mountComponent, usePopupState } from 'vant/lib/utils/mount-component';

let instance: ComponentInstance;

export type PayType = 1 | 2 | number | string;
export interface PayWay {
  icon?: string;
  text?: string;
  payType: PayType;
  style?: Record<string, any>;
}

export type OkFn = (payType: PayType) => void | null | undefined | boolean | Promise<void | null | undefined | boolean>;
export interface PayDialogOption {
  round?: boolean;
  position?: PopupPosition;
  closeIcon?: string;
  closeable?: boolean;
  transition?: string;
  iconPrefix?: string;
  closeOnPopstate?: boolean;
  closeIconPosition?: PopupCloseIconPosition;
  safeAreaInsetTop?: boolean;
  safeAreaInsetBottom?: boolean;
  titleText?: string;
  hamount?: number;
  money?: string | number;
  style?: Record<string, any>;
  payType?: PayType;
  onOk?: OkFn;
  onCancel?: () => void;
}

export interface PayDialogResult {
  close(): void;
  instance: ComponentInstance;
}

const DEFAULT_OPTIONS = {
  teleport: 'body',
  position: 'bottom',
  style: { height: '50%' },
  closeIconPosition: 'top-left',
  payType: 1
} as const;

let currentOptions = extend({}, DEFAULT_OPTIONS);

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState();
      return () => (
        <Popup {...state} onUpdate:show={toggle}>
          <PayChoose
            titleText={state.titleText}
            money={state.money}
            hamount={state.hamount}
            onClose={() => state.onClose()}
            onOk={v => state.onOk(v)}
            v-model:payType={state.payType}
          ></PayChoose>
        </Popup>
      );
    }
  };

  ({ instance } = mountComponent(Wrapper));
}

/**
 * Display a message prompt dialog with a default confirm button
 */
export function showPayDialog(options: PayDialogOption): PayDialogResult {
  if (!instance) {
    initInstance();
  }
  const onOk = options.onOk || ((action: PayType) => true);
  instance.open(
    extend({}, currentOptions, options, {
      onOk(action: PayType) {
        return onOk(action);
      },
      onClose() {
        instance.toggle(false);
        return options.onCancel && options.onCancel();
      }
    })
  );

  return {
    close() {
      closePayDialog();
    },
    instance
  };
}

export const resetPayDialogDefaultOptions = () => {
  currentOptions = extend({}, DEFAULT_OPTIONS);
};

export const closePayDialog = () => {
  if (instance) {
    instance.toggle(false);
  }
};
