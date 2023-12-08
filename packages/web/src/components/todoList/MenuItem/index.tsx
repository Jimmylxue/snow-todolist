import { FC, HTMLAttributes, ReactNode } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.less';
import classNames from 'classnames';
import { Popconfirm } from 'antd';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  text: string | ReactNode;
  message: number | ReactNode;
  checked?: boolean;
  showEdit?: boolean;
  onEdit?: () => void;
  showDel?: boolean;
  onDel?: () => void;
}

export const MenuItem: FC<TProps> = ({
  icon,
  text,
  message,
  className,
  checked,
  onEdit,
  onDel,
  showEdit,
  showDel,
  ...args
}) => {
  return (
    <>
      <div
        {...args}
        className='snow_project_menuItem_hover flex justify-between items-center px-2 py-2 rounded-md cursor-pointer '
        style={{
          backgroundColor: checked ? '#eee' : '',
        }}>
        <div className='flex items-center'>
          {icon}
          <span className='ml-2'>{text}</span>
        </div>
        <div className='flex'>
          <span
            className={classNames('text-xs', {
              'snow-message-count': showEdit,
            })}
            style={{
              color: '#b1b1b1',
            }}>
            {message}
          </span>
          {showDel && (
            <Popconfirm
              okText='确定'
              cancelText='取消'
              title='确定删除该任务吗？'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={(e) => {
                e?.stopPropagation();
                onDel?.();
              }}>
              <span
                className='snow-edit mr-2 text-xs'
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                删除
              </span>
            </Popconfirm>
          )}
          {showEdit && (
            <span
              className='snow-edit text-xs'
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}>
              编辑
            </span>
          )}
        </div>
      </div>
    </>
  );
};
