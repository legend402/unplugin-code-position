import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin, { getUseablePort } from '../src/vite'

export default defineConfig(async () => {
  return {
    plugins: [
      Inspect(),
      Unplugin({
        port: await getUseablePort(9002),
      }),
    ],
  }
})
