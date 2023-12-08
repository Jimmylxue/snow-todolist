import classNames from 'classnames';
import { useState, ReactNode } from 'react';
import * as icons from '@ant-design/icons';
import './style.less';

type TProps = {
  children: ReactNode;
};

export function SliderBar({ children }: TProps) {
  const [menuShow, setMenuShow] = useState<boolean>(true);

  return (
    <div
      className={classNames(
        'sliderBar-container whitespace-nowrap flex-shrink-0 overflow-hidden primarySliderBarBackgroundColor relative',
        {
          sliderBarShow: menuShow,
          sliderBarClose: !menuShow,
        },
      )}>
      {children}
      {!menuShow && (
        <div
          className=' fixed z-10 left-2'
          style={{
            top: '50px',
          }}>
          <icons.RightCircleOutlined
            onClick={() => {
              console.log('memu');
              setMenuShow(true);
            }}
            style={{
              fontSize: 20,
              color: '#ddd',
            }}
          />
        </div>
      )}
      <div className=' absolute right-2 top-2'>
        <icons.LeftCircleOutlined
          onClick={() => {
            setMenuShow(false);
          }}
          style={{
            fontSize: 20,
            color: '#ddd',
          }}
        />
      </div>
    </div>
  );
}
