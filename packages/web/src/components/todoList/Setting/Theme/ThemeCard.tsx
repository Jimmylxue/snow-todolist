import { ThemeType } from '@/config/themeConst';
import { CheckOutlined } from '@ant-design/icons';

type TProps = {
  theme: ThemeType;
  checked: boolean;
  onChooseTheme: () => void;
};

export function ThemeCard({ theme, checked, onChooseTheme }: TProps) {
  const {
    pageBackgroundColor,
    primaryTextColor,
    name,
    primaryBackgroundColor,
    radioBorderColor,
  } = theme;
  return (
    <div
      className=' border-gray-200 border border-solid rounded-md  overflow-hidden mr-4 mb-4'
      style={{
        width: 200,
        height: 85,
      }}
      onClick={onChooseTheme}>
      <div
        className='py-2 px-2 text-white text-xs'
        style={{
          backgroundColor: primaryBackgroundColor,
          color: primaryTextColor,
        }}>
        {name}
      </div>
      <div
        className=' flex items-start px-2 h-full pt-3'
        style={{
          backgroundColor: pageBackgroundColor,
        }}>
        <div
          className=' border border-solid rounded-full'
          style={{
            width: 15,
            height: 15,
            borderColor: radioBorderColor,
          }}></div>
        <div className='ml-2'>
          <div
            style={{
              width: 155,
              height: 8,
            }}
            className=' bg-gray-300 rounded'></div>
          <div className=' flex justify-between items-center'>
            <div
              style={{
                width: 120,
                height: 8,
              }}
              className=' bg-gray-300 rounded mt-2'></div>
            {checked && (
              <div>
                <CheckOutlined
                  style={{
                    color: primaryBackgroundColor,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
