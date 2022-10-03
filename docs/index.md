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
        props2table({}),
    ],
})
```



2、add command in markdown

```markdown
// ./test.ts is you file path
@props2table(./test.ts)
```


3、and you will see a table

@props2table(../test/props-all.ts)

