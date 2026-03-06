import p1 from '@/assets/img/todolist/p1.jpeg';
import EmptyImage from '@/assets/img/todolist/empty.jpg';
import { ReactNode } from 'react';

type TProps = {
  desc?: string | ReactNode;
  emptyType?: 1 | 2;
};

export function Empty({ desc, emptyType = 1 }: TProps) {
  return (
    <div className=' mt-20 w-full flex justify-center items-center flex-col'>
      <img src={emptyType === 1 ? p1 : EmptyImage} alt='' />
      <p className=' font-bold'>{desc || '暂无数据'}</p>
    </div>
  );
}
