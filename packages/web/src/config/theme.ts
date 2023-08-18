import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { ThemeType, defaultTheme, themeConst } from './themeConst';

const defaultThemeKey = 'default';

export function getLocalTheme() {
  return localStorage.getItem('tdl-theme-color');
}

export function setLocalTheme(theme: string) {
  return localStorage.setItem('tdl-theme-color', theme);
}

export function useTheme() {
  const [nowTheme, setNowTheme] = useState<ThemeType>();

  const setTheme = (theme: ThemeType) => {
    ConfigProvider.config({
      theme: {
        primaryColor: theme.primaryBackgroundColor,
      },
    });
    setLocalTheme(theme.name);
    setNowTheme(theme);
    document.documentElement.dataset.theme = theme.key;
  };

  const initTheme = () => {
    const nowTheme = getLocalTheme() || defaultThemeKey;
    console.log('nowTheme', nowTheme);
    const selectTheme =
      themeConst.find((theme) => theme.name === nowTheme) || defaultTheme;
    setTheme(selectTheme);
    console.log(selectTheme.key);
    document.documentElement.dataset.theme = selectTheme.key;
  };

  return { setTheme, initTheme, nowTheme };
}
