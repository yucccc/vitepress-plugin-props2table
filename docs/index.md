# VitePress-Plugin-props2table


## install

```bash
pnpm i vitepress-plugin-props2table
```

## usage

1、add plugin in `vite.config.js`

```typescript
// vite.config.ts

import { props2table } from 'vitepress-plugin-props2table'

export default defineConfig({
    plugins: [
        props2table(),
    ],
})
```



2、add command in markdown

```markdown
<!-- ./path.ts is you file path -->
@props2table(./path.ts)
```


3、and you will see a table

@props2table(../test/props-all.ts)

## 自定义表格

1、 需要增加一个id以对应配置的id id可以是任意值
> 🐷: id不填为``default`` 如果想要多个表格使用同一个配置，id相同即可 或者重写default配置





```markdown
@props2table(./path.ts)
```

2、然后在``vite.config.js``中配置

```typescript

import { props2table } from 'vitepress-plugin-props2table'

export default defineConfig({
    plugins: [
        props2table({
            // id对应上面的填写的id
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
    ],
})

```

3、最后你会看到一个自定义的表格
@props2table(../test/props-all.ts, "myid1")


## 只解析某个返回

有些情况下 你不想到把整个导出都解析出来 因此你可以指定解析某个返回

```markdown
<!-- 只解析./path.ts文件下 interface Props 的返回 -->
@props2table(./path.ts, 'default', 'Emits')
```

@props2table(../test/props.ts, default, 'Emits')
