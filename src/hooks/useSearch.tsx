import { TaskItem } from '@/api/todolist/task/type';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type searchInfo = {
  searchInfo?: TaskItem;
  setSearchInfo: (taskItem: TaskItem) => void;
};

export const SearchInfoContext = createContext<searchInfo>({
  searchInfo: undefined,
  setSearchInfo: () => {},
});

type TProps = {
  children: ReactNode;
};

export const SearchProvider: FC<TProps> = (props) => {
  const [searchInfo, setSearchInfo] = useState<TaskItem | undefined>();

  const searchCtxValue = {
    searchInfo,
    setSearchInfo,
  };

  return (
    <SearchInfoContext.Provider value={searchCtxValue}>
      {props.children}
    </SearchInfoContext.Provider>
  );
};

export const useSearchInfo = () => {
  return useContext(SearchInfoContext);
};
