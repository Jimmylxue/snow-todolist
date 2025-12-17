export type ThemeType = {
  name: string;
  key: string;
  primaryBackgroundColor: string;
  pageBackgroundColor: string;
  primaryTextColor: string;
  radioBorderColor: string;
};

// 默认主题
export const defaultTheme = {
  name: 'Todo-List',
  key: 'default',
  primaryBackgroundColor: '#DB4C3F',
  pageBackgroundColor: '#FFF',
  primaryTextColor: '#FFF',
  radioBorderColor: '#666',
};

// 暗黑主题
const blackTheme = {
  name: '暗黑色',
  key: 'black',
  primaryBackgroundColor: '#2e2e2e',
  pageBackgroundColor: '#FFF',
  primaryTextColor: '#FFF',
  radioBorderColor: '#666',
};

// 深色主题
const darkTheme = {
  name: '深色',
  key: 'dark',
  primaryBackgroundColor: '#333333',
  pageBackgroundColor: '#1e1e1e',
  primaryTextColor: '#FFF',
  radioBorderColor: '#b3b3b3',
};

// 淡灰色主题
const grayTheme = {
  name: '淡灰色',
  key: 'gray',
  primaryBackgroundColor: '#f7f7f7',
  pageBackgroundColor: '#FFF',
  primaryTextColor: '#444',
  radioBorderColor: '#666',
};

// 橘色主题
const orangeTheme = {
  name: '橘色',
  key: 'orange',
  primaryBackgroundColor: '#e58938',
  pageBackgroundColor: '#FFF',
  primaryTextColor: '#FFF',
  radioBorderColor: '#666',
};

export const themeConst = [
  defaultTheme,
  blackTheme,
  // darkTheme,
  grayTheme,
  orangeTheme,
];
