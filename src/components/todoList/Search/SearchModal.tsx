import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import './index.less';
import { useSearchTask } from '@/api/todolist/task';
import { useSearchInfo } from '@/hooks/useSearch';
import { IUseModalResult } from '@/hooks/useModal';

export const SearchModal = ({ open, closeModal }: IUseModalResult) => {
  const [searchText, setSearchText] = useState('');
  const { data: searchListResult } = useSearchTask(
    ['searchTask', searchText],
    {
      taskName: searchText,
    },
    {
      enabled: !!searchText.length,
    },
  );
  const { setSearchInfo } = useSearchInfo();
  const inputLock = useRef<boolean>(false);

  const searchList = searchListResult?.result?.result || [];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputLock.current) {
      return;
    }
    setSearchText(e.target.value);
  };

  return (
    <Modal
      zIndex={100}
      open={open}
      title={null}
      closable={false}
      footer={null}
      onCancel={closeModal}
      destroyOnClose
      width={600}
      className='snow-search-modal'
      maskStyle={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
      modalRender={(modal) => (
        <div className='snow-search-container animate__animated animate__fadeInDown'>
          {modal}
        </div>
      )}>
      <div className='p-4'>
        <Input
          className='snow-search-input w-full rounded-xl text-lg border-none shadow-none'
          placeholder='搜索任务...'
          bordered={false}
          autoFocus
          prefix={
            <SearchOutlined
              style={{
                fontSize: 20,
                color: '#999',
                marginRight: 8,
              }}
            />
          }
          onChange={handleInput}
          onCompositionStart={() => {
            inputLock.current = true;
          }}
          onCompositionEnd={(e) => {
            inputLock.current = false;
            handleInput(e as any);
          }}
        />
        <div className='snow-divider my-2'></div>
        
        {!!searchList.length ? (
          <div className='mt-2 max-h-[400px] overflow-y-auto snow-search-list'>
            {searchList.map((task) => (
              <div
                className='snow-search-item w-full flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200'
                key={task.taskId}
                onClick={() => {
                  closeModal();
                  setSearchInfo(task);
                }}>
                <div className='snow-search-tag mr-3'>
                  {task?.typeMessage?.typeName || '任务'}
                </div>
                <div className='flex-grow text-gray-700 font-medium'>
                  {task.taskName}
                </div>
                <RightOutlined className='text-gray-300 text-xs' />
              </div>
            ))}
          </div>
        ) : (
          <div className='py-12 flex flex-col items-center justify-center text-gray-400'>
             {searchText ? '未找到相关任务' : '输入关键词开始搜索...'}
          </div>
        )}
        
        <div className='flex justify-end mt-4 pt-2 border-t border-gray-100'>
           <div className='text-xs text-gray-400 flex items-center gap-4'>
              <span className='flex items-center'><span className='kbd'>↵</span> 选择</span>
              <span className='flex items-center'><span className='kbd'>esc</span> 关闭</span>
           </div>
        </div>
      </div>
    </Modal>
  );
};
