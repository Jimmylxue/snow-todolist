import { Button } from 'antd';
import { Modal1 } from './components/Modal1';
import { Modal2 } from './components/Modal2';
import { useRef, useState } from 'react';
import { Modal3 } from './components/Modal3';

export function Demo() {
  const [modal1Show, setModal1Show] = useState<boolean>(false);
  const modal1InitValue = useRef<string>('1');

  const [modal2Show, setModal2Show] = useState<boolean>(false);
  const modal2InitValue = useRef<number>(3);

  const [modal3Show, setModal3Show] = useState<boolean>(false);
  const modal3InitValue = useRef<{ name: string }>({ name: '' });

  return (
    <>
      <Button
        onClick={() => {
          modal1InitValue.current = '点击业务按钮1设置的值';
          setModal1Show(true);
        }}>
        业务一展示
      </Button>
      <Button
        onClick={() => {
          modal2InitValue.current = 999;
          setModal2Show(true);
        }}>
        业务二展示
      </Button>
      <Button
        onClick={() => {
          modal3InitValue.current = { name: 'jimmy' };
          setModal3Show(true);
        }}>
        业务三展示
      </Button>

      <Modal1
        initValue={modal1InitValue.current}
        open={modal1Show}
        onClose={() => {
          setModal1Show(false);
        }}
        onOk={() => {
          setModal1Show(false);
        }}
      />

      <Modal2
        initValue={modal2InitValue.current}
        open={modal2Show}
        onClose={() => {
          setModal2Show(false);
        }}
        onOk={() => {
          setModal2Show(false);
        }}
      />

      <Modal3
        initValue={modal3InitValue.current}
        open={modal3Show}
        onClose={() => {
          setModal3Show(false);
        }}
        onOk={() => {
          setModal3Show(false);
        }}
      />
    </>
  );
}
