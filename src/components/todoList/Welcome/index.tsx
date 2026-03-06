import { Modal } from 'antd';

type TProps = {
  show: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export function WelcomeModal({ show, handleOk, handleCancel }: TProps) {
  return (
    <Modal
      title='欢迎进入snow-todoList'
      open={show}
      onOk={handleOk}
      okText='不再提醒'
      cancelText='关闭'
      onCancel={handleCancel}>
      <p>
        大家好我是吉米，今天非常荣幸的跟大家伙介绍我的第一个产品！todoList。
      </p>
      <p className='mt-2'>
        记todoList
        是一个非常棒的学习方式和习惯，它可以让培养我们的学习自驱力。欢迎使用本站记录todoList。
      </p>
      <p className='mt-2'>
        (如果觉得不错 👍，给个{' '}
        <a
          href='https://github.com/Jimmylxue/snow-todolist'
          target='snow-todoList'>
          star ⭐
        </a>{' '}
        吧，你的认可是我最大的动力 ！)
      </p>
      <p className='mt-2'>
        期待小伙伴们的{' '}
        <a
          href='https://github.com/Jimmylxue/snow-todolist'
          target='snow-todoList'>
          issue
        </a>{' '}
        和
        <a
          href='https://github.com/Jimmylxue/snow-todolist'
          target='snow-todoList'>
          {' '}
          pr
        </a>{' '}
        🤞🤞🤞
      </p>
    </Modal>
  );
}
