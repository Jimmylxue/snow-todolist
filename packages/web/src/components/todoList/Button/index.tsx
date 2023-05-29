import { FC, HTMLAttributes, ReactNode } from 'react';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
}

export const SButton: FC<TProps> = ({ icon, className, ...args }) => {
  return (
    <div
      {...args}
      className={`btn_hover flex justify-center items-center flex-shrink-0 ${className}`}
      style={{
        width: 28,
        height: 28,
      }}>
      {icon}
      {/* <UnorderedListOutlined className=' flex text-xl flex-shrink-0' /> */}
    </div>
  );
};
