import { themeConst } from '@/hooks/useTheme/themeConst';

export class ThemeService {
  _defaultThemeKey = 'default';

  constructor() {}

  getLocalTheme() {
    return localStorage.getItem('tdl-theme-color');
  }

  setLocalTheme(theme: string) {
    return localStorage.setItem('tdl-theme-color', theme);
  }

  getDefaultTheme() {
    const localTheme = this.getLocalTheme();
    if (localTheme) return JSON.parse(localTheme);
    return themeConst.find((theme) => theme.key === this._defaultThemeKey);
  }
}
