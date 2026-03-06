/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // sans: ['ui-sans-serif', 'system-ui'],
      sans: ['courier-new', 'courier', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 解决tailwind 覆盖 antd 样式问题
  },
};
