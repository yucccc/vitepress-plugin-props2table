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

test('replaceCode2table', () => {
    const code = `@props2table(./props-all.ts, id)`
    const { code: tableCode, importPath } = replaceCode2table(code, {
        'id': {
            title: 'id',
            columns: [{ 'dataKey': 'name', 'title': '名称' }]
        }
    })
    expect(tableCode).toBe(`
## id
<table> 
<thead>
<tr>
<th style="white-space: nowrap;text-align:left">名称</th>
</tr>
</thead>
<tbody>
<tr>
<td style="white-space: nowrap;text-align:left">a</td>
</tr>
<tr>
<td style="white-space: nowrap;text-align:left">b</td>
</tr>
<tr>
<td style="white-space: nowrap;text-align:left">c</td>
</tr>
<tr>
<td style="white-space: nowrap;text-align:left">e</td>
</tr>
<tr>
<td style="white-space: nowrap;text-align:left">f</td>
</tr>
</tbody>
</table>`)

    expect(importPath).toEqual(['./props-all.ts'])

    const code2 = `@props2table(./non existent path.ts, id)`
    const rcode = replaceCode2table(code2, {
        'id': {
            title: 'id',
            columns: [{ 'dataKey': 'name', 'title': '名称' }]
        }
    })
    expect(rcode.code).toBe(code2)
    expect(rcode.importPath).toEqual([])
})
