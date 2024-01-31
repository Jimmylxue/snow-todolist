import { Modal } from 'antd';

type TProps = {
  initValue: number;
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

export function Modal2({ initValue, open, onClose, onOk }: TProps) {
  return (
    <Modal title='modal1' open={open} onCancel={onClose} onOk={onOk}>
      <p>业务二</p>
      modal2:{initValue}
    </Modal>
  );
}
