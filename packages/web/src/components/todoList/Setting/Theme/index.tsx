import { Switch, Typography } from 'antd';
import { ThemeCard } from './ThemeCard';
import { themeConst } from '@/config/themeConst';
import { useTheme } from '@/config/theme';

const { Text } = Typography;

export function Theme() {
  const { nowTheme, setTheme } = useTheme();
  return (
    <div>
      <div>个性化您的Todo-List颜色来匹配您的风格、心情和个性</div>
      <div className='flex items-center mt-2'>
        <Switch defaultChecked onChange={() => {}} />
        <div className='ml-3'>同步主题</div>
      </div>
      <div>
        <div className='flex items-center mt-3 mb-2'>
          <Switch defaultChecked onChange={() => {}} />
          <div className='ml-3'>自动深色主题</div>
        </div>
        <Text type='secondary'>
          当您的系统在浅色和深色主题之间切换时跟随切换。
        </Text>
      </div>

      <div className='my-2 font-semibold text-base'>您的主题</div>

      <div className='flex flex-wrap'>
        {themeConst.map((theme, index) => (
          <ThemeCard
            key={index}
            theme={theme}
            checked={nowTheme?.name === theme.name}
            onChooseTheme={() => {
              setTheme(theme);
            }}
          />
        ))}
      </div>
      <div>
        <Text type='secondary'>
          深色和淡灰色还处于实验阶段，会有些许显示异常，后续完善。
        </Text>
      </div>
    </div>
  );
}
