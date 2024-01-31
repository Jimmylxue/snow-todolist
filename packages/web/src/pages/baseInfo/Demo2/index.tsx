import { Button } from 'antd';
import { Modal1 } from './components/Modal1';
import { Modal2 } from './components/Modal2';
import { Modal3 } from './components/Modal3';
import { useModal } from '@/hooks/useModal';

export function Demo2() {
  const modal1 = useModal<string>({});
  const modal2 = useModal<number>({});
  const modal3 = useModal<{ name: string }>({});

  return (
    <>
      <Button
        onClick={() => {
          modal1.openModal('点击业务按钮1设置的值');
        }}>
        业务一展示
      </Button>
      <Button
        onClick={() => {
          modal2.openModal(999);
        }}>
        业务二展示
      </Button>
      <Button
        onClick={() => {
          modal3.openModal({ name: 'jimmy' });
        }}>
        业务三展示
      </Button>

      <Modal1 {...modal1} />
      <Modal2 {...modal2} />
      <Modal3 {...modal3} />
    </>
  );
}
