// 将ts转换为table
import { join } from 'node:path'
import type { Plugin } from 'vite'
import type { Column } from './parseInterface'
import { parseInterface } from './parseInterface'

export const reg = /\B@props2table\(.+\)\B/g
// demo内的应该被忽略掉
export const inDemo = /(?<=\`)[\s\S]*(?=\`)/g
export function getParams(code: string) {
  return code.replace('@props2table(', '').replace(')', '').split(',')
}
export function matchReg(code: string) {
  code = code.replace(inDemo, '')
  return code.matchAll(reg)
}

interface Config {
  header: THeader
  body: TBody
}

type THeader = (string | { name: string; textAlign: 'left' | 'right' | 'center' })[]
type TBody = (string | ((item: Column) => string))[]

const defaultHeader = ['参数', '说明', '类型', '可选值', '默认值']

const defaultBody = ['name', 'description', 'type', 'OptionalValue', 'defaultValue']

function genTHeader(header: THeader) {
  return `<thead>
                <tr>
                    ${header.map(item => `<th style="white-space: nowrap">${item}</th>`).join('')}
                </tr>
            </thead>`
}

function genTBody(members, body) {
  return members.map((item) => {
    return `<tr>
            <td style="white-space: nowrap">${item[body[0]]}</td>
            <td style="white-space: nowrap">${item[body[1]]}</td>
            <td style="white-space: nowrap">${item[body[2]]}</td>
            <td style="white-space: nowrap">${item[body[3]]}</td>
            <td style="white-space: nowrap">${item[body[4]]}</td>
           </tr>`
  }).join('')
}

// TODO: footer
function genTFooter() {
  return null
}

function genTable(title, header, bodyConfig, item) {
  return `<h2>${title}</h2>
            <table>
            ${genTHeader(header)}
            ${genTBody(item, bodyConfig)}
           </table>`
}

export function props2table(config?: Config): Plugin {
  return {
    enforce: 'pre',
    name: 'props2table',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const matches = matchReg(code)
        const hmrPaths = []
        if (matches) {
          for (const match of matches) {
            const [filePath] = getParams(match[0])
            const p = join(__dirname, filePath.trim())
            try {
              const data = parseInterface(p)
              hmrPaths.push(filePath.trim())
              const table = Object.keys(data).map(title => genTable(title, defaultHeader, defaultBody, data[title])).join('')
              code = code.replace(match[0], table)
            } catch (error) {

            }

          }

          // `| Tables        | Are           | Cool  |
          // | ------------- |:-------------:| -----:|
          // | col 3 is      | right-aligned | $1600 |
          // | col 2 is      | centered      |   $12 |
          // | zebra stripes | are neat      |    $1 |`

          return {
            code: code + hmrCode(hmrPaths),
          }
        }
      }
    },
  }
}

function hmrCode(paths: string[]) {
  return `\n<script setup>
    const demos = import.meta.glob(${JSON.stringify(paths)}, {  eager: true })
  </script>
  `
}