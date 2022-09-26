import { expect, test } from 'vitest'
// import { reg, replaceReg } from '../src/props2md'
import { replaceReg } from '../src/props2md'

const reg = /\B@props2table\(.+\)\B/g
// demo内的应该被忽略掉
const inDemo = /(?<=\`)[\s\S]*(?=\`)/

function matchReg(code: string) {
  code = code.replace(inDemo, '')
  return code.match(reg)
}

test.only('reg ✅', () => {
  // 匹配 props2table 后的内容 在空格前停止

  const code1 = ' @props2table(./test/test.ts) '
  const match = reg.exec(code1)
  expect(match![0]).toBe('@props2table(./test/test.ts)')

  const code2 = 'props2table2(./test/test.ts)'
  const match2 = reg.exec(code2)
  expect(match2).toBe(null)

  const code4 = `
    ...some md
    @props2table(./test/test1.ts)
    @props2table(./test/test2.ts)
    ...some md
    `
  const match4 = code4.match(reg)
  expect(match4![0]).toBe('@props2table(./test/test1.ts)')
  expect(match4![1]).toBe('@props2table(./test/test2.ts)')

  const code5 = `
    ...some md
    @props2table(./test/test1.ts)
    \`\`\`markdown
    // 不会被匹配
    @props2table(./test/test2.ts)
    \`\`\`
    ...some md
    @props2table(./test/test3.ts)
    `
  const match5 = matchReg(code5)
  expect(match5![0]).toBe('@props2table(./test/test1.ts)')
  expect(match5![1]).toBe('@props2table(./test/test3.ts)')
})

test('replaceReg ✅', () => {
  const code1 = 'props2table ./test/test.ts'
  const match = code1.replace(replaceReg, '123')
  expect(match).toBe('123')

  const code2 = 'props2table2./test/test.ts'
  const match2 = code2.replace(replaceReg, '123')
  expect(match2).toBe('props2table2./test/test.ts')

  const code3 = `
    props2table ./test/test.ts
    props2table ./test/test2.ts
    121 213`
  const match3 = code3.replace(replaceReg, '123')

  expect(match3).toBe(`
    123
    123
    121 213`)
})
