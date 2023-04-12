# [unplugin-code-position](https://github.com/legend402/unplugin-code-position)

[![NPM version](https://www.npmjs.com/package/unplugin-code-position?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-code-position)

Click on an element on the page to find its corresponding position in the code

在页面上点击元素，跳转到在代码中对应的位置


Hold down the shift key and click on an element on the page to jump to the corresponding code location

按住shift键后点击页面上的元素跳转到对应的代码位置

## Usage

| options | desc             | default |  |
| ------- | ---------------- | ------- | - |
| port    | 启动服务的端口号 | 9001    |  |

## Install

```bash
npm i unplugin-code-position -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginCodePosition， { getUseablePort } from 'unplugin-code-position/vite'

export default defineConfig({
  plugins: [
    UnpluginCodePosition ({ /* options */ }),
  ],
})
// or

export default defineConfig(async () => {
 return {
  plugins: [
    UnpluginCodePosition ({ port: await getUseablePort(9004)) }),
  ],
}
}))
```

Example: [`playground/`](./playground/)

`<br></details>`


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-code-position/webpack')({ /* options */ })
  ]
}
```

`<br></details>`

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-code-position/webpack')({ /* options */ }),
    ],
  },
}
```

Example: [`playground2/`](./playground2/)

`<br></details>`
