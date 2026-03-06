import { SearchOutlined } from '@ant-design/icons';
import { SearchModal } from './SearchModal';
// import { SearchModal } from './SearchModalBad';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

export function Search() {
  const searchModal = useModal();

  useEffect(() => {
    hotkeys('ctrl+k', (e) => {
      e.preventDefault();
      searchModal.openModal();
    });
    hotkeys('command+k', (e) => {
      e.preventDefault();
      searchModal.openModal();
    });
    hotkeys('escape', function (e) {
      e.preventDefault();
      searchModal.closeModal();
    });
  }, []);

  return (
    <>
      <div
        onClick={() => {
          searchModal.openModal();
        }}
        className=' flex justify-between items-center rounded-lg text-xs px-3 cursor-pointer mr-3 hover:border hover:border-solid hover:border-gray-200'
        style={{
          height: 40,
          backgroundColor: 'rgba(0,0,0,.1)',
        }}>
        <SearchOutlined
          style={{
            fontWeight: 300,
          }}
          className=' text-lg'
        />
        <div className=' mx-2'>搜索</div>
        <div className=' border border-solid border-gray-400 px-1 rounded'>
          ⌘ K
        </div>
      </div>
      <SearchModal {...searchModal} />
    </>
  );
}
