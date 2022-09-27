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
@props2table(./test.ts)
```


3、and you will see a table

@props2table(../test/props.ts)



## 自定义 

### 只取其中一项

```markdown

@props2table(../test/props2.ts, { "key": "Props" } )

```
- output

@props2table(../test/props2.ts, { "key": "Props2" } )


### 自定义标题



```markdown

@props2table('export interface Props {
   /**
    * @default yuc
    */
   name: string
   /**
    * @description 年龄
    */
   age: number
}', { "key": "Props", "title": "自定义标题" } )

```
- output
@props2table(../test/props2.ts, { "key": "Props", "title": "自定义标题" } )



### 自定义表头

```markdown
  

@props2table(you path, { "key": "Props", "title": "自定义表头", "header": ["a","b", "c", "d", "e"] } )

```
- output


@props2table(../test/props2.ts, { "key": "Props", "title": "自定义表头", "header": ["a","b", "c", "d", "e"] } )


::: tip
 通常自定义表头需要配置自定义表体 `body`，否则表头和表体不对应
:::


### 自定义表格

```markdown
  

@props2table(you path, 
    { 
        "key": "Props", 
        "title": "自定义表格", 
        "header": ["属性名","描述"],
        "body": [
            "name",
            "description"
        ]
    } 
)

```

@props2table(../test/props2.ts, {  "key": "Props",  "title": "自定义表格",  "header": ["描述", "属性名"], "body": [ "description", "name" ] } )





## 说明

### 表格返回数据