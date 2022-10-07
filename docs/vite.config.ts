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
      },
      'c-interface': {
        title: 'ParseInterfaceTypes',
        columns: [
          {
            title: 'name',
            dataKey: 'name',
          },
          {
            title: '描述',
            dataKey: 'comments.description',
          },
          {
            title: '类型',
            dataKey: 'type',
          },
          {
            title: '是否必填',
            dataKey: (data) => data.required ? '是' : '否',
            align: 'center'
          },
        ],
      }
    }),
    Inspect(),
  ],
})
