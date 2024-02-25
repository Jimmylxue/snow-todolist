import { EStatus, THabit } from '@/api/sign/habit/type';
import { DropDownProps, Dropdown } from 'antd';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  placement?: DropDownProps['placement'];
  trigger?: DropDownProps['trigger'];
  onChange: (type: 'edit' | 'complete' | 'delete' | 'reset') => void;
  habit: THabit;
};

export function MenuContainer({
  children,
  placement,
  trigger,
  onChange,
  habit,
}: TProps) {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            label: (
              <a
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => onChange('edit')}>
                编辑
              </a>
            ),
          },
          {
            key: '2',
            label: (
              <a
                target='_blank'
                rel='noopener noreferrer'
                onClick={() =>
                  onChange(
                    habit?.status === EStatus.已归档 ? 'reset' : 'complete',
                  )
                }>
                {habit?.status === EStatus.已归档 ? '恢复' : '归档'}
              </a>
            ),
          },
          {
            key: '3',
            label: (
              <a
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => onChange('delete')}>
                删除
              </a>
            ),
          },
        ],
      }}
      placement={placement}
      trigger={trigger}>
      {children}
    </Dropdown>
  );
}
