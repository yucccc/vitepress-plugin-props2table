import { test, expect } from 'vitest'
import { inDemoReg, matchReg, replaceCode2table } from '../src/props2md'

test('is in demo ', () => {
    const code = `
        \`\`\`js
        const a = 1
        \`\`\`

        \`\`\`markdown
        @props2table(path)
        \`\`\`
    `
    const match = [...code.matchAll(inDemoReg)]

    expect(match[0][0]).toBe('```js\n        const a = 1\n        ```')
    expect(match[1][0]).toBe('```markdown\n        @props2table(path)\n        ```')
})

test('match reg', () => {
    const code = `

        \`\`\`js
        const a = 1
        \`\`\`

        \`\`\`markdown
        @props2table(path, id)
        \`\`\`

        @props2table(path2)
        @props2table(path)

    `
    const match = [...code.matchAll(matchReg)]

    expect(match[0][0]).toBe('@props2table(path, id)')
    expect(match[1][0]).toBe('@props2table(path2)')
    expect(match[2][0]).toBe('@props2table(path)')
    // 多个参数
    const code2 = `
        @props2table(path, id, 'id2')
        @props2table( path, id, 'id2'  )
    `
    const match2 = [...code2.matchAll(matchReg)]

    expect(match2[0][1]).toBe("path, id, 'id2'")
    expect(match2[1][1]).toBe(" path, id, 'id2'  ")


})

test('只替换demo外的', () => {
    // const code = `
    //     \`\`\`markdown
    //     @props2table(path)
    //     \`\`\`

    //     \`\`\`markdown
    //     @props2table(path2)
    //     \`\`\`

    //     @props2table(path3, id) 
    // `
    // const match = [...code.matchAll(matchReg)]

    // const b = replaceCode2table(code, {})

    // expect(b).toBe(`
    //     \`\`\`markdown
    //     @props2table(path)
    //     \`\`\`

    //     \`\`\`markdown
    //     @props2table(path2)
    //     \`\`\`

    //     table 
    // `)

    // expect(match[0][0]).toBe('@props2table(path)')


})

