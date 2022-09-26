import { defineConfig } from 'vite'
import { props2table } from '../src/index'

export default defineConfig({
  base: '/vitepress-plugin-props2table/',
  server: {
    open: true,
    hmr: true,
  },
  plugins: [
    props2table(),
  ],
})
