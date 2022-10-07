# VitePress-Plugin-props2table


## install

```bash
pnpm i vitepress-plugin-props2table
```

## usage

1、add plugin in `vite.config.js`

```typescript
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
@props2table(./path.ts, 'myid1')
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
@props2table(./path.ts, 'c-interface', 'InterfaceDefinition')
```

@props2table(../src/parseInterface.ts, 'c-interface', 'InterfaceDefinition')


## 高级

### 自定义解析器
> 目前默认只解析typescript文件   
> 有些情况下 你可能需要解析tsx 或者其他文件（前提是babel支持）    
> 你可以传入第二个参数 使其支持解析其他文件类型  

```typescript
 props2table({}, ['jsx'])
```




### 获取解析结果
> 有些情况下 你可能不想要解析为表格 或者你想在其他地方使用解析结果  
> 你可以直接使用 parseInterface 解析返回即可   
> 🐷: 可在任意地方使用 不再是通过插件的方式在 ``vite.config.ts`` 中使用  


```typescript
import { parseInterface } from 'vitepress-plugin-props2table'
parseInterface('you code')
```
