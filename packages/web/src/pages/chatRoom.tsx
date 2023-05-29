import Content from '@/components/chatRoom/Content';
import Message from '@/components/chatRoom/Message';
import SendBox from '@/components/chatRoom/SendBox';
import User from '@/components/chatRoom/User';
import { useChatRoom } from '@/hooks/chatRoom/useChatRoom';
import { Button } from 'antd';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default memo(() => {
  const { loginUser, messageList, userList } = useChatRoom();
  const navigate = useNavigate();

  useEffect(() => {
    window.oncontextmenu = function () {
      return true;
    };
  }, []);

  return (
    <div
      className=' w-full h-screen flex text-white'
      style={{
        backgroundColor: '#343540',
      }}>
      <div className='slider w-1/5 relative overflow-hidden flex flex-col h-full'>
        <div className=' flex flex-col justify-center items-center m-1'>
          <img
            src='https://img1.baidu.com/it/u=4050463138,1499422748&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1673974800&t=db34835adc90ef962e8848d96deb5683'
            alt=''
          />
          <span className=' text-lg my-2'>吉米小黑屋</span>
        </div>
        <div className=' overflow-auto h-fit px-2 flex-grow'>
          {userList.map((user, index) => (
            <User user={user} key={index} />
          ))}
        </div>

        <Button
          type='link'
          className=' w-full absolute bottom-4'
          style={{
            background: 'none',
          }}
          onClick={() => {
            navigate('/');
          }}>
          back snowIndex
        </Button>
      </div>
      <div
        className='context w-full  flex flex-col items-center justify-center py-4'
        style={{
          backgroundColor: '#2e2f38',
        }}>
        <p>
          如果觉得不错 👍，给个{' '}
          <a
            className=' text-blue-500'
            href='https://github.com/Jimmylxue/snowIndex'>
            star
          </a>{' '}
          ⭐ 吧，你的认可是我最大的动力 ！
        </p>
        <Content>
          {messageList.map((message, index) => (
            <Message message={message} key={index}></Message>
          ))}
        </Content>
        <SendBox user={loginUser}></SendBox>
        <p className='mt-2 mb-0'>吉米小黑屋 - 如有侵权联系我删除</p>
        <div className='flex mt-2'>
          <a className='mx-2' href='https://github.com/Jimmylxue/snowIndex'>
            github
          </a>
          <a className='mx-2' href='http://www.jimmyxuexue.top/'>
            知识星球
          </a>
        </div>
      </div>
    </div>
  );
});
