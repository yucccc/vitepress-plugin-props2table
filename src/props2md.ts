// 将ts转换为table
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { parseInterface } from './parseInterface'
// TODO:
// 1、点击复制
// 2、传参问题
// 3、替换规则bug

export const reg = /\B@props2table\(.+\)\B/g
// demo内的应该被忽略掉
export const inDemo = /\`\`[\s\S]*?\`\`/g
export function getParams(code: string): [string, Config] {
  const content = code.replace('@props2table(', '').replace(')', '')
  const cut = content.indexOf(',')
  return [
    cut > 0 ? content.slice(0, cut) : content,
    cut > 0 ? JSON.parse(content.slice(cut + 1)) : {},
  ]
}
export function matchReg(code: string) {
  code = code.replaceAll(inDemo, '')
  console.log('-----------------')

  console.log(code)

  console.log('-----------------')
  return code.matchAll(reg)
}

interface Config {
  header: THeader
  body: TBody
  title: string
  key: string
}

type THeader = (string | { name: string; textAlign: 'left' | 'right' | 'center' })[]
// type TBody = (string | ((item: Column) => string))[]
type TBody = (string)[]

const defaultHeader = ['参数', '说明', '类型', '可选值', '默认值']

const defaultBody = ['name', 'description', 'type', 'OptionalValue', 'defaultValue']

function genTHeader(header: THeader) {
  return `  <thead>
    <tr>
      ${header.map(item => `<th style="white-space: nowrap">${item}</th>`).join('\n      ')}
    </tr>
  </thead>`
}
// @ts-expect-error TODO
function genTBody(members, body: TBody) {
  return `  <tbody>
    ${members.map((item: any) => {
    return `<tr>
      ${body.map(bitem => `<td style="white-space: nowrap">${item[bitem]}</td>`).join('\n      ')}
    </tr>`
  }).join('\n   ')}
  </tbody>
  `
}

// TODO: footer
function genTFooter() {
  return null
}

function genTable(title: string, header: THeader, body: TBody, item: any) {
  return `
<h2>${title}</h2>
<table>
${genTHeader(header)}
${genTBody(item, body)}
</table>
`
}
export function props2table(config?: Record<string | 'default', Config> | Config): Plugin {
  return {
    enforce: 'pre',
    name: 'props2table',
    transform(code, id) {
      if (id.endsWith('.md')) {
        console.log(config)
        const matches = matchReg(code)
        const hmrPaths = []
        if (matches) {
          for (const match of matches) {
            const [filePath, params] = getParams(match[0])

            console.log(getParams(match[0]))

            const { key, header, body, title: customTitle } = params

            const p = join(__dirname, filePath.trim())
            try {
              const data = parseInterface(p)
              hmrPaths.push(filePath.trim())
              const table = (key ? [key] : Object.keys(data))
                .map(title => genTable(customTitle || title, header || defaultHeader, body || defaultBody, data[title]))
                .join('')

              code = code.replace(match[0], table)
            }
            catch (error) {

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