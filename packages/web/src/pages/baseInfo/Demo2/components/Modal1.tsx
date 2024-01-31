import { IUseModalResult } from '@/hooks/useModal';
import { Modal } from 'antd';

export function Modal1({ ...args }: IUseModalResult) {
  const { open, initValue, closeModal, onOk } = args;
  return (
    <Modal title='modal1' open={open} onCancel={closeModal} onOk={onOk}>
      <p>业务一</p>
      modal1:{initValue}
    </Modal>
  );
}
