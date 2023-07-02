export const POPUP_DIALOG_STATE_NAME = 'popup';

export interface PopupState {
  popupProps: {
    isShow: boolean;
    header: string;
    content: string;
    isConfirm?: boolean;
    onClick?: () => void;
  };
}
