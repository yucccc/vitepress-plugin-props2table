import { test } from 'vitest'

/**
 * 写一个正则表达式
 * 忽略掉```markdown 与 ```之间的内容
 * 匹配@props2table(../test/props2.ts, { "key": "Props2" } )
 */
const regg = /(?<=\`\`\`markdown)[\s\S]*?(?=\`\`\`)/g

test.only('reg ✅', () => {
  // 匹配 props2table 后的内容 在空格前停止
  const code = `
    \`\`\`markdown
    @props2table(../test/props2.ts, { "key": "Props2" } )
    \`\`\`

    @props2table(../test/props2.ts, { "key": "Props3" } )

  `
})

