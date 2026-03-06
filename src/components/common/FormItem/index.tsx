import { EditOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import './index.less';

type TProps = {
  name: string;
  value: string;
  editable?: boolean;
  onEdit?: () => void;
  onChange?: (value: any) => void;
  type?: 'input' | 'select';
  clickable?: boolean;
};

export function FormItem({
  name,
  value,
  editable,
  onEdit,
  onChange,
  type = 'input',
  clickable,
}: TProps) {
  return (
    <div
      id='snow-form-item'
      className=' flex justify-between items-center py-2 px-4 rounded'
      style={{
        backgroundColor: 'rgb(252,252,252)',
      }}>
      <div>{name}</div>
      {clickable ? (
        <a onClick={onEdit}>{value}</a>
      ) : (
        <div className=' flex items-center'>
          {type === 'input' ? (
            <Input
              className=' text-right border-none bg-transparent'
              value={value}
              onChange={(e) => {
                onChange?.(e.target.value);
              }}
            />
          ) : (
            <Select
              value={value}
              style={{ width: 120 }}
              onChange={(value) => {
                onChange?.(value);
              }}
              options={[
                { value: 0, label: '男' },
                { value: 1, label: '女' },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}
