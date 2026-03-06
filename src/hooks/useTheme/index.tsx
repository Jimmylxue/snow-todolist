import { ThemeType } from '@/hooks/useTheme/themeConst';
import { makeAutoObservable } from 'mobx';
import { ThemeService } from './theme.service';
import { FC, ReactNode, createContext, useContext } from 'react';
import { ConfigProvider } from 'antd';

class ThemeInfo {
  /**
   * 内存中的 theme
   */
  _nowTheme?: ThemeType;
  /**
   * 缓存中的 theme
   */
  _cacheTheme?: ThemeType;

  constructor(private _themeService: ThemeService) {
    makeAutoObservable(this);
    this._initTheme();
  }

  private _initTheme() {
    this._nowTheme = this._themeService.getDefaultTheme();
    this._cacheTheme = this._nowTheme;
    if (this._nowTheme) {
      this._updatePage(this._nowTheme!);
    }
  }

  set updateTheme(theme: ThemeType) {
    this._nowTheme = theme;
    this._cacheTheme = theme;
    this._updateCacheTheme(theme);
    this._updatePage(theme);
  }

  get theme() {
    return this._nowTheme || this._cacheTheme;
  }

  private _updatePage(theme: ThemeType) {
    document.documentElement.dataset.theme = theme.key;
    ConfigProvider.config({
      theme: {
        primaryColor: theme.primaryBackgroundColor,
      },
    });
  }

  private _updateCacheTheme(theme: ThemeType) {
    localStorage.setItem('tdl-theme-color', JSON.stringify(theme));
  }
}

export const todolistTheme = new ThemeInfo(new ThemeService());

const ThemeContext = createContext(
  {} as {
    theme: ThemeInfo;
  },
);

type TProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<TProps> = (props) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: todolistTheme,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
