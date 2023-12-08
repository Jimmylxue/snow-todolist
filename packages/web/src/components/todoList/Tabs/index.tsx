import { Tabs } from 'antd';
import { TabConst, TabKey } from './tabConst';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './tabs.less';

export function STabs() {
  const { pathname } = useLocation();
  const [tabKey, setTabKey] = useState<TabKey>('/center');
  const navigate = useNavigate();
  const onTabChange = (key: string) => {
    setTabKey(key as any);
    navigate(key);
  };

  useEffect(() => {
    setTabKey(pathname as any);
  }, [pathname]);

  return (
    <div className='dz-tabs mt-3 ml-5'>
      <Tabs items={TabConst} activeKey={tabKey} onChange={onTabChange} />
    </div>
  );
}
