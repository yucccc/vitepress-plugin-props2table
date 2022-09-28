import { existsSync, readFileSync } from 'node:fs'
import ts from 'typescript'
const map = {
  StringKeyword: 'string',
  NumberKeyword: 'number',
  BooleanKeyword: 'boolean',
  NullKeyword: 'null',
  UndefinedKeyword: 'undefined',
  SymbolKeyword: 'symbol',
  AnyKeyword: 'any',
  UnionType: 'union',
  FunctionType: 'function',
  IntersectionType: 'intersection',
  VoidKeyword: 'void',
}

function getType(kind) {
  return map[ts.SyntaxKind[kind]]
}
function getTsType(kind) {
  return ts.SyntaxKind[kind]
}
export interface Column {
  name: string
  type: string
  /**
   * 原始解析 用户可能有自定义需求
   */
  sourceType: any
  description: string
  defaultValue: string
  OptionalValue: string
  required: boolean
}
interface RD {
  [key: string]: Column[]
}
let isCode = false
function getNode(filePathOrCode: string, interfaceName?: string) {
  const data: RD = {}
  const node = ts.createSourceFile(
    'x.ts',
    isCode ? filePathOrCode : readFileSync(filePathOrCode, { encoding: 'utf-8' }),
    ts.ScriptTarget.Latest,
  )
  node.forEachChild((child) => {
    // 处理导入 需要再次解析导入的数据
    if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') { }
    // 处理 interface 导出的才进行处理
    if (ts.SyntaxKind[child.kind] === 'InterfaceDeclaration'
      && getTsType(child.modifiers?.[0].kind) === 'ExportKeyword'
      // 如果有指定interfaceName 则只处理指定的
      && (!interfaceName || interfaceName === child.name.escapedText)
    ) {
      data[child.name.escapedText] = []
      child.members.forEach((member) => {
        const { jsDoc } = member
        let description = ''
        const comments = {}
        const sourceType: any = {}
        if (jsDoc) {
          // 用户只写了一行Jsdoc注释 默认认为是描述
          if (jsDoc.comment) {
            description = jsDoc.comment
          }
          else {
            jsDoc.forEach((doc) => {
              const { tags } = doc
              if (tags) {
                tags.forEach((tag) => {
                  comments[tag.tagName.escapedText] = tag.comment
                })
              }
              else {
                comments.description = doc.comment
              }
            })
          }
        }
        let type = map[ts.SyntaxKind[member.type.kind]]
        sourceType.type = type
        if (type === 'union') {
          sourceType.types = member.type.types.map((item) => {
            return map[ts.SyntaxKind[item.kind]] || item.literal?.text
          })
          type = sourceType.types.join(' | ')
        }
        if (type === 'function') {
          sourceType.parameters = []
          member.type.parameters.forEach((item) => {
            sourceType.parameters.push([item.name.escapedText, getType(item.type.kind)])
          })
          sourceType.returnType = getType(member.type.type.kind)
          type = `(${sourceType.parameters.map(item => item.join(':')).join(', ')}) => ${sourceType.returnType}`
        }

        data[child.name.escapedText].push({
          name: member.name.escapedText,
          type,
          sourceType,
          description: description || comments.description,
          defaultValue: comments.default,
          OptionalValue: comments.optional,
          required: true,
        })
      })
    }
  })

  return data
}

export function parseInterface(filePathOrCode: string, interfaceName?: string) {
  if (filePathOrCode.startsWith('/') || filePathOrCode.startsWith('.')) {
    isCode = false
    if (!existsSync(filePathOrCode)) {
      throw new Error(`file not found  ${filePathOrCode}`)
    }
  }
  else {
    isCode = true
  }
  return getNode(filePathOrCode, interfaceName)
}
