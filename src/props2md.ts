// 将ts转换为table
import { resolve } from 'node:path'
import getCallerFile from 'get-caller-file';
import type { Plugin } from 'vite'
import fs from 'node:fs'
import { parseInterface } from './parseInterface'
import { ParserPlugin } from '@babel/parser'
import get from 'lodash.get'
import merge from 'lodash.merge'
import isString from 'lodash.isstring'
import type { InterfaceDefinition } from './parseInterface'

// 把< > 转码
function encodeHtml(str: string) {
  if (isString(str)) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  return str
}

export const matchReg = /@props2table\((.+)\)/g

// demo内的应该被忽略
export const inDemoReg = /\`{2,3}[\s\S]*?\`{2,3}/g

function getCodeIndex(code: string) {
  if (code.includes('@')) {
    return [...code.matchAll(inDemoReg)].map(item => [item.index, item.index! + item[0].length])
  }
  return []
}

export function replaceCode2table(
  code: string,
  replaceConfig: PluginConfig,
  parsePlugins?: ParserPlugin[]
) {
  const demoScope = getCodeIndex(code)
  const hmrPaths: string[] = []
  dir = dir || getCallerFile()
  const c2t = code.replaceAll(matchReg, (substring, params: string, index: number) => {

    // demo内不进行替换
    for (let i = 0; i < demoScope.length; i++) {
      const element = demoScope[i];
      if (index > element[0]! && index < element[1]!) {
        return substring
      }
    }
    let [filePath, id = 'default', interfaceName] = params.split(',')
    filePath = normalizeParam(filePath)
    id = normalizeParam(id)
    interfaceName = normalizeParam(interfaceName)

    const path = resolve(dir.replace('file://', ''), '..', filePath)
    let fileContent = null
    try {
      fileContent = fs.readFileSync(path, 'utf-8')
    } catch (error) {
      console.error('path not found');
      return substring
    }

    const tableData = parseInterface(fileContent, parsePlugins)

    const config = replaceConfig[id]

    if (!config) {
      console.warn('not found config', id)
      return substring
    }

    hmrPaths.push(filePath)
    return (interfaceName ? [interfaceName] : Object.keys(tableData)).map(title => {
      return genTable(title, config, tableData[title])
    }).join('')

  })
  return {
    code: c2t,
    importPath: hmrPaths
  }
}

function normalizeParam(str: string) {
  if (str) {
    return str.replaceAll(/['"]/g, '').trim()
  }
  return ''
}

function genTHeader(header: ColumnsType[]) {
  return `<thead>
<tr>
${header.map(({ title, align = 'left' }) => `<th style="white-space: nowrap;text-align:${align}">${title}</th>`).join('\n')}
</tr>
</thead>`
}

function genTBody(body: ColumnsType[], data: InterfaceDefinition[]) {
  return `<tbody>
${data.map((item) => {
    return `<tr>
${body.map(({ dataKey, align = 'left' }) => `<td style="white-space: nowrap;text-align:${align}">${isString(dataKey) ? encodeHtml(get(item, dataKey, '')) : dataKey(item)}</td>`)
        .join('\n')}
</tr>`
  }).join('\n')}
</tbody>`
}

// TODO: footer
function genTFooter() {
  return null
}

// TODO: 合并header和body的渲染
export function genTable(
  title: string,
  config: {
    title?: string
    columns: ColumnsType[]
  },
  data: InterfaceDefinition[],
) {
  const _title = config.title || title
  return `
## ${_title}
<table> 
${genTHeader(config.columns)}
${genTBody(config.columns, data)}
</table>`
}

export interface ColumnsType {
  /**
   * header 显示标题
   */
  title: string
  /**
   * 表格对齐方式
   */
  align?: 'left' | 'right' | 'center'
  /**
   * 表格数据对应的key字段
   */
  dataKey: string | ((data: InterfaceDefinition) => string)
}
export interface PluginConfig {
  [key: 'default' | string]: {
    title?: string
    columns: ColumnsType[]
  }
}
const defaultConfig = {
  default: {
    columns: [
      {
        title: '参数',
        dataKey: 'name'
      },
      {
        title: '说明',
        dataKey: 'comments.description'
      },
      {
        title: '类型',
        dataKey: 'type'
      },
      {
        title: '是否必填',
        dataKey: 'required'
      },
      {
        title: '可选值',
        dataKey: 'comments.options'
      },
      {
        title: '默认值',
        dataKey: 'comments.default'
      }
    ]
  }
}
let dir: string = ''
export function props2table(
  config: PluginConfig = {},
  parsePlugins?: ParserPlugin[]
): Plugin {
  dir = getCallerFile()
  return {
    enforce: 'pre',
    name: 'props2table',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const { importPath, code: tableCode } = replaceCode2table(code, merge(defaultConfig, config), parsePlugins)
        return {
          code: tableCode + hmrCode(importPath),
        }
      }
    },
  }
}

export function hmrCode(paths: string[]) {
  return `
<script setup>
  const hmrFiles = import.meta.glob(${JSON.stringify(paths)}, {  eager: true })
</script>
  `
}