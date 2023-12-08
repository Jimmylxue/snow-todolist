import { FC, HTMLAttributes, ReactNode } from 'react';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  text?: ReactNode;
}

export const SButton: FC<TProps> = ({ icon, className, text, ...args }) => {
  return (
    <div
      className={`btn_hover flex justify-center items-center flex-shrink-0 ${className}`}
      {...args}>
      <div
        className=' flex justify-center items-center'
        style={{
          width: 28,
          height: 28,
        }}>
        {icon}
      </div>
      {text}
    </div>
  );
};
