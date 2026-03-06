import { WelcomeModal } from '@/components/todoList/Welcome';
import { useEffect, useState } from 'react';

export function useWelcome() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  useEffect(() => {
    const isHideWelcome = localStorage.getItem('snow-hideWelcome');
    if (isHideWelcome && isHideWelcome === 'hide') {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  }, []);

  const node = (
    <WelcomeModal
      show={showWelcome}
      handleOk={() => {
        localStorage.setItem('snow-hideWelcome', 'hide');
        setShowWelcome(false);
      }}
      handleCancel={() => {
        setShowWelcome(false);
      }}
    />
  );

  return { node };
}
