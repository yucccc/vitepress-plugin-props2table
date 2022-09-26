import { defineConfig } from 'vite'
import { props2table } from '../src/index'

export default defineConfig({
  server: {
    open: true,
    hmr: true,
  },
  plugins: [
    props2table(),
  ],
})
