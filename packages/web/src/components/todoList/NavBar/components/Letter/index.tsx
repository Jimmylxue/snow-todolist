import { useReadLetter, useUserLetter } from '@/api/letter';
import { EReadStatus } from '@/api/letter/type';
import { BellOutlined } from '@ant-design/icons';
import { Collapse, Drawer, Empty } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const { Panel } = Collapse;

export function Letter() {
  const [drawerShow, setDrawerShow] = useState<boolean>(false);

  const { data, refetch } = useUserLetter(
    ['userLetter'],
    {
      platform: 1,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutateAsync } = useReadLetter();

  const hasNotRead = useMemo(() => {
    return !!data?.result?.find((letter) => letter.status === EReadStatus.未读);
  }, [data?.result]);

  const onChange = async (key: string | string[]) => {
    const activityKey = key?.[key.length - 1];
    console.log('当前点击的key', activityKey);
    const letter = data?.result?.[+activityKey];
    if (letter?.status === EReadStatus.未读) {
      await mutateAsync({
        status: EReadStatus.已读,
        recordId: letter.recordId,
      });
    }
  };

  useEffect(() => {
    if (drawerShow) {
      refetch();
    }
  }, [drawerShow]);

  return (
    <>
      <div className='mr-4 relative '>
        <BellOutlined
          className=' text-xl cursor-pointer'
          onClick={() => {
            setDrawerShow(true);
          }}
        />
        {hasNotRead && (
          <div className=' absolute bg-green-500 rounded-full w-2 h-2 -right-1 -top-1'></div>
        )}
      </div>
      <Drawer
        title='站内信'
        placement='right'
        onClose={() => {
          setDrawerShow(false);
        }}
        open={drawerShow}>
        {!!data?.result?.length ? (
          <Collapse onChange={onChange}>
            {data.result.map((letter, index) => (
              <Panel
                header={
                  <div className=' flex items-center'>
                    {letter.status === EReadStatus.未读 && (
                      <div className='  bg-green-500 rounded-full w-2 h-2 mr-2'></div>
                    )}
                    {letter.letter.title}
                  </div>
                }
                key={index}>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: letter.letter.content,
                    }}></p>
                  <p className=' text-right'>{letter.createdTime}</p>
                </div>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Empty />
        )}
      </Drawer>
    </>
  );
}
