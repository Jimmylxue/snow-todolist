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
      onCancel={onClose}
      width={1000}
      className='snow-setting-modal'
      centered
      maskStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)' }}
    >
      <div
        className='flex overflow-hidden rounded-2xl'
        style={{
          height: 600,
        }}>
        <div
          className='w-[240px] h-full p-4 flex-shrink-0 bg-gray-50/80 backdrop-blur-sm border-r border-gray-100'
        >
          <div className='h-14 flex items-center px-3 mb-2'>
             <div className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                <span className='w-1 h-6 bg-[var(--primary-color)] rounded-full block'></span>
                设置
             </div>
          </div>
          <div className='space-y-1'>
            {setting.map((set, index) => (
              <div
                key={set.key}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  index === currentSet 
                    ? 'bg-white shadow-sm text-[var(--primary-color)] font-medium' 
                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                }`}
                onClick={() => setCurrentSet(index)}
              >
                <div className='text-lg'>{set.icon}</div>
                <div className='text-sm'>{set.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-grow flex flex-col bg-white'>
          <div className='h-16 flex items-center justify-between px-8 border-b border-gray-100'>
            <div className='text-lg font-bold text-gray-800'>{setting[currentSet].name}</div>
            <div 
              className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all'
              onClick={onClose}
            >
              <CloseOutlined className='text-sm' />
            </div>
          </div>
          <div className='flex-1 overflow-y-auto px-8 py-6 custom-scrollbar'>
            {setting[currentSet].component}
          </div>
        </div>
      </div>
    </Modal>
  );
}
