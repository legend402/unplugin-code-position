# [unplugin-code-position](https://github.com/legend402/unplugin-code-position)

[![NPM version](https://www.npmjs.com/package/unplugin-code-position?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-code-position)

transform px to rem, you can specify the directory you want to convert to

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
import UnpluginCodePosition from 'unplugin-code-position/vite'

export default defineConfig({
  plugins: [
    UnpluginCodePosition ({ /* options */ }),
  ],
})
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
