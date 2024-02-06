import { DropDownProps, Dropdown } from 'antd';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  placement?: DropDownProps['placement'];
  trigger?: DropDownProps['trigger'];
};

export function MenuContainer({ children, placement, trigger }: TProps) {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            label: (
              <a target='_blank' rel='noopener noreferrer'>
                编辑
              </a>
            ),
          },
          {
            key: '2',
            label: (
              <a target='_blank' rel='noopener noreferrer'>
                归档
              </a>
            ),
          },
          {
            key: '3',
            label: (
              <a target='_blank' rel='noopener noreferrer'>
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
