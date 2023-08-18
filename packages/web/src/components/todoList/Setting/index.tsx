import { Modal } from 'antd';
import { MenuItem } from '../SliderBar';
import { CloseOutlined, SkinOutlined, SmileOutlined } from '@ant-design/icons';
import { Theme } from './Theme';

type TProps = {
  onClose: () => void;
  visible: boolean;
};

export function Setting({ onClose, visible }: TProps) {
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
          {/* <MenuItem
            checked={true}
            icon={<SmileOutlined />}
            text={'账户'}
            message={<></>}
            onClick={() => {}}
          /> */}
          <MenuItem
            checked={false}
            icon={<SkinOutlined />}
            text={'主题'}
            message={<></>}
            onClick={() => {}}
          />
        </div>
        <div className=' flex-grow'>
          <div
            className=' h-12 flex items-center border-b-gray-200  w-full px-6 justify-between '
            style={{
              borderBottom: '1px solid #eee',
            }}>
            <div className=' font-semibold'>主题</div>
            <CloseOutlined className=' cursor-pointer' onClick={onClose} />
          </div>
          <div className='px-6 py-4'>
            <Theme />
          </div>
        </div>
      </div>
    </Modal>
  );
}
