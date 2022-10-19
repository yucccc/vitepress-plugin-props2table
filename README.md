<h1 align="center"> vitepress-plugin-props2table </h1>

<p align="center" >
<a  href="https://www.npmjs.com/package/vitepress-plugin-props2table" > 
 <img src="https://img.shields.io/npm/v/vitepress-plugin-props2table?color=a1b858"/> 
 </a>

<a  href="https://codecov.io/gh/yucccc/vitepress-plugin-props2table" > 
 <img src="https://codecov.io/gh/yucccc/vitepress-plugin-props2table/branch/main/graph/badge.svg?token=YTFYSEI46D"/> 
 </a>

</p>



<p align="center">Parsing interface Show as a table.</p>

## why?

Writing component documents makes the work cumbersome.   
Using this plug-in, you can directly import parameter files to parse the table format you want.

<details>
  <summary>中文</summary>
  编写组件文档让工作变得繁琐，使用该插件可以直接导入参数文件，从而解析为你想要的表格格式
</details>


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

<h2>Output table demo</h2>
<table><thead><tr><th style="white-space:nowrap;text-align:left;">参数</th><th style="white-space:nowrap;text-align:left;">说明</th><th style="white-space:nowrap;text-align:left;">类型</th><th style="white-space:nowrap;text-align:left;">是否必填</th><th style="white-space:nowrap;text-align:left;">可选值</th><th style="white-space:nowrap;text-align:left;">默认值</th></tr></thead><tbody><tr><td style="white-space:nowrap;text-align:left;">a</td><td style="white-space:nowrap;text-align:left;">描述a</td><td style="white-space:nowrap;text-align:left;">string</td><td style="white-space:nowrap;text-align:left;">true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;">默认值是1</td></tr><tr><td style="white-space:nowrap;text-align:left;">b</td><td style="white-space:nowrap;text-align:left;">描述b 是一个枚举值</td><td style="white-space:nowrap;text-align:left;">a | b | c</td><td style="white-space:nowrap;text-align:left;">true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;">默认值是a</td></tr><tr><td style="white-space:nowrap;text-align:left;">c</td><td style="white-space:nowrap;text-align:left;">描述c是一个外部引用的类型</td><td style="white-space:nowrap;text-align:left;">Props2</td><td style="white-space:nowrap;text-align:left;">true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:left;">e</td><td style="white-space:nowrap;text-align:left;">描述e 是一个数组</td><td style="white-space:nowrap;text-align:left;">string[]</td><td style="white-space:nowrap;text-align:left;">true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:left;">f</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;">Record&lt;string, string&gt;</td><td style="white-space:nowrap;text-align:left;">true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr></tbody></table>

## Get Parse Interface

> If you don't want to render it as a table and want to get the parsing results  
> you can directly use the `parseInterface` method.

```typescript
import { parseInterface } from 'vitepress-plugin-props2table'
parseInterface('you code') // return JSON => ParseInterfaceTypes
```

[ParseInterfaceTypes](http://yucccc.com/vitepress-plugin-props2table/#parseinterfacetypes)

## doc

http://yucccc.com/vitepress-plugin-props2table/
