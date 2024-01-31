import { IUseModalResult } from '@/hooks/useModal';
import { Modal } from 'antd';

export function Modal2({ ...args }: IUseModalResult) {
  const { open, initValue, closeModal, onOk } = args;
  return (
    <Modal title='modal2' open={open} onCancel={closeModal} onOk={onOk}>
      <p>业务二</p>
      modal2:{initValue}
    </Modal>
  );
}
