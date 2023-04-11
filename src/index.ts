import type http from 'http'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import { getHtmlPositionCode } from './utils/position'
import { codeLineTrack } from './utils/code'
import { createHttpServer } from './utils/httpServer'
import { getUseablePort } from './utils/port'

let server: http.Server

export default createUnplugin<Options | undefined>((options = {}) => ({
  name: 'unplugin-code-position',
  enforce: 'pre',
  transformInclude(id) {
    return !id.includes('node_modules') && !id.includes('index.html')
  },
  transform(code, path) {
    return codeLineTrack(code, path.split('?')[0])
  },
  vite: {
    configResolved() {
      const { port = 9001 } = options
      if (server)
        return
      server = createHttpServer(port)
    },
    transformIndexHtml(code) {
      const { port = 9001 } = options
      const extraScript = getHtmlPositionCode(port)
      return code + extraScript
    },
  },
  webpack(compiler) {
    const { port = 9001 } = options
    compiler.hooks.done.tap('CodePositionServer', () => {
      if (server)
        return
      server = createHttpServer(port)
    })
    compiler.hooks.emit.tap('AddSource', (compilation) => {
      Object.keys(compilation.assets).forEach((filename) => {
        let content = compilation.assets[filename].source() as string
        if (filename === 'index.html')
          content = content + getHtmlPositionCode(port)

        compilation.assets[filename] = {
          source() {
            return content
          },
          size() {
            return content.length
          },
        } as any
      })
    })
  },
}))

export {
  getUseablePort,
}
