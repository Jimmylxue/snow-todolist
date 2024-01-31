import { useState } from 'react';

export type IUseModalResult<T = any> = {
  open: boolean;
  initValue?: T;
  openModal: (initValue?: T) => void;
  closeModal: () => void;
  onOk?: (values?: T) => void;
};

type CallBack<T> =
  | {
      onOk?: (values?: T) => void;
    }
  | undefined;

export function useModal<T extends any>(
  callback: CallBack<T>,
): IUseModalResult<T> {
  const [open, setOpen] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<T>();

  const openModal = (initValue?: T) => {
    setInitValue(initValue);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onOk = callback?.onOk;

  return {
    open,
    initValue,
    openModal,
    closeModal,
    onOk,
  };
}
