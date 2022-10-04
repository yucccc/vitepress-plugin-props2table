import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

import { props2table } from '../src/index'

export default defineConfig({
  server: {
    open: true,
    hmr: true,
  },
  plugins: [
    props2table({
      myid1: {
        title: '自定义表格标题',
        columns: [
          {
            title: '自定义header标题',
            dataKey: 'name',
            align: 'center',
          },
          {
            title: '自定义描述--',
            dataKey: 'comments.description',
            align: 'center',
          },
          {
            title: '支持版本',
            dataKey: (data) => {
              return `${data.comments.version || ''}`
            },
          },
        ],
      }
    }),
    Inspect(),
  ],
})
