import { useTerminal } from '@/components/useTerminal';
import { memo } from 'react';
import { Setting } from '@/components/Setting';
import { useBackground } from '@/hooks/useBackground';

export default memo(() => {
  const terminal = useTerminal();
  useBackground({ terminal });
  const { terminalNode } = terminal;
  return (
    <div className=' h-full'>
      {terminalNode}
      <Setting terminal={terminal} />
    </div>
  );
});
