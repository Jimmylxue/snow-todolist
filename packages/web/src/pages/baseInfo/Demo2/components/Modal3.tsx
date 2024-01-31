import { IUseModalResult } from '@/hooks/useModal';
import { Modal } from 'antd';

export function Modal3({ ...args }: IUseModalResult) {
  const { open, initValue, closeModal, onOk } = args;
  return (
    <Modal title='modal3' open={open} onCancel={closeModal} onOk={onOk}>
      <p>业务三</p>
      modal3:{initValue?.name}
    </Modal>
  );
}
