import { useState } from 'react';

export function useModal<T extends any>() {
  const [open, setOpen] = useState<boolean>();
  const [initValue, setInitValue] = useState<T>();

  const openModal = (initValue?: T) => {
    setInitValue(initValue);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return {
    open,
    initValue,
    openModal,
    closeModal,
  };
}
