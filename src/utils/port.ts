import { createServer } from 'net'

const isPortInUse = (port: number) => {
  return new Promise((resolve) => {
    const server = createServer().listen(port)
    server.on('listening', () => {
      server.close()
      resolve(false)
    })
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE')
        resolve(true)
    })
  })
}

/**
 * 返回一个没有在使用的端口号
 * @param initialPort 默认端口
 * @returns number
 */
export const getUseablePort = async (initialPort: number) => {
  while (true) {
    const isInUse = await isPortInUse(initialPort)
    if (isInUse)
      initialPort++
    else
      return initialPort
  }
}

