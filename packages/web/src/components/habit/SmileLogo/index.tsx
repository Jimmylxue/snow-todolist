import { EStatus } from '@/api/sign/habit/type';
import smile1Png from '@/assets/img/sign/smile1.png';
import smile2Png from '@/assets/img/sign/smile2.png';

type TProps = {
  status: EStatus;
};

export function SmileIcon({ status }: TProps) {
  return (
    <img
      src={status === EStatus.进行中 ? smile2Png : smile1Png}
      style={{
        width: 40,
        height: 40,
      }}
      alt=''
    />
  );
}
