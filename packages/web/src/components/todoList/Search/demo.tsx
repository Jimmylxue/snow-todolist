import { useSearchTask } from '@/api/todolist/task';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

export function Demo() {
  const [searchText, setSearchText] = useState<string>('');

  const { data: searchListResult } = useSearchTask(
    ['searchTask', searchText],
    {
      taskName: searchText,
    },
    {
      enabled: !!searchText.length,
    },
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // 这里 监听到 searchText变化 触发网络请求
  }, [searchText]);

  return (
    <div>
      <Input
        className=' w-full rounded'
        placeholder='搜索'
        value={searchText}
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
    </div>
  );
}
