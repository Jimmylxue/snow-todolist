import { PlusOutlined } from '@ant-design/icons';
import { SButton } from '../todoList';
import { Radio } from 'antd';
import { EStatus } from '@/api/sign/habit/type';

type TProps = {
  status: EStatus;
  onChange: (val: EStatus) => void;
  onAddHabit: () => void;
};

export function NavBar({ status, onChange, onAddHabit }: TProps) {
  return (
    <div className=' flex justify-between items-center px-3 mb-3'>
      <div className=' text-xl font-bold'>打卡</div>
      <div>
        <Radio.Group value={status} onChange={(e) => onChange(e.target.value)}>
          <Radio.Button value={EStatus.进行中}>坚持中</Radio.Button>
          <Radio.Button value={EStatus.已归档}>已归档</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <SButton icon={<PlusOutlined />} onClick={onAddHabit} />
      </div>
    </div>
  );
}
