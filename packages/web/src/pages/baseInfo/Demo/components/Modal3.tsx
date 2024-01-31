import { Modal } from 'antd';

type TProps = {
  initValue: {
    name: string;
  };
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

export function Modal3({ initValue, open, onClose, onOk }: TProps) {
  return (
    <Modal title='modal1' open={open} onCancel={onClose} onOk={onOk}>
      <p>业务三</p>
      modal2:{initValue.name}
    </Modal>
  );
}
