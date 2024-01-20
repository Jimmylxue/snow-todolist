import { Modal } from 'antd';
import { MenuItem } from '../SliderBar';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { setting } from './const';

type TProps = {
  onClose: () => void;
  visible: boolean;
};

export function Setting({ onClose, visible }: TProps) {
  const [currentSet, setCurrentSet] = useState<number>(0);
  return (
    <Modal
      bodyStyle={{
        padding: 0,
      }}
      title={null}
      closable={false}
      footer={null}
      open={visible}
      onOk={() => {}}
      onCancel={() => {}}
      width={1000}>
      <div
        className='flex'
        style={{
          height: 500,
        }}>
        <div
          className='w-1/5 h-full px-3 flex-shrink-0'
          style={{
            backgroundColor: '#fafafa',
          }}>
          <div className=' h-12 flex items-center font-semibold text-base'>
            设置
          </div>
          {setting.map((set, index) => (
            <MenuItem
              key={set.key}
              checked={index === currentSet}
              icon={set.icon}
              text={set.name}
              message={<></>}
              onClick={() => {
                setCurrentSet(index);
              }}
            />
          ))}
        </div>
        <div className=' flex-grow'>
          <div
            className=' h-12 flex items-center border-b-gray-200  w-full px-6 justify-between '
            style={{
              borderBottom: '1px solid #eee',
            }}>
            <div className=' font-semibold'>{setting[currentSet].name}</div>
            <CloseOutlined className=' cursor-pointer' onClick={onClose} />
          </div>
          <div className='px-6 py-4' style={{ height: 450 }}>
            {setting[currentSet].component}
          </div>
        </div>
      </div>
    </Modal>
  );
}
