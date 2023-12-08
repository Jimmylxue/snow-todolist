import p1 from '@/assets/img/todolist/p1.jpeg';
export function BaseInfo() {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
      <div className=' flex flex-col justify-center items-center'>
        <img src={p1} alt='' />
        <p className=' font-bold'>作者最近很懒~😋</p>
        <p className=' text-desc text-xs mt-2'>敬请期待...</p>
      </div>
    </div>
  );
}
