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

  const searchList = searchListResult?.result?.result || [];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      width={900}>
      <div>
        <Input
          value={searchText}
          className=' w-full rounded'
          placeholder='搜索'
          prefix={
            <SearchOutlined
              style={{
                fontWeight: 300,
              }}
              className=' text-lg'
            />
          }
          onChange={handleInput}
        />
        {!!searchList.length && (
          <div className='mt-2'>
            {searchList.map((task) => (
              <div
                className='dz-search-item w-full flex items-center py-2 border border-solid border-gray-300 px-3 mt-1 rounded cursor-pointer'
                key={task.taskId}
                onClick={() => {
                  closeModal();
                  setSearchInfo(task);
                }}>
                <div className='primary-color mr-1'>#</div>
                <div>{task?.typeMessage?.typeName || '任务类型'}</div>
                <RightOutlined className=' text-xs mx-2' />
                <div>{task.taskName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
