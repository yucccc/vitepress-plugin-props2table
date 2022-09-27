import { defineConfig } from 'vite'
import { props2table } from '../src/index'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  server: {
    open: true,
    hmr: true,
  },
  plugins: [
    props2table(),
    Inspect(),
  ],
})
