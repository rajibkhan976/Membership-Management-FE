// craco.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@comps': path.resolve(__dirname, 'src/comps/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@jg': path.resolve(__dirname, 'src/JG_V2_8/'),
      'jg-view': path.resolve(__dirname, 'src/JG_V2_8/_core/CreateView.ts'),
      'jg-widget': path.resolve(__dirname, 'src/JG_V2_8/_core/CreateWidget.ts'),
      'jg-routes': path.resolve(__dirname, 'src/JG_V2_8/_core/routes/JGRoutes.tsx'),
    },
  },
}
