import { Modal } from 'antd';

type TProps = {
  initValue: string;
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

export function Modal1({ initValue, open, onClose, onOk }: TProps) {
  return (
    <Modal title='modal1' open={open} onCancel={onClose} onOk={onOk}>
      <p>业务一</p>
      modal1:{initValue}
    </Modal>
  );
}
