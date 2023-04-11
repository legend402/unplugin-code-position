import http from 'http'
import child_process from 'child_process'

export const createHttpServer = (port: number) => {
  const server = http.createServer((req, res) => {
    const code = req.url?.split('?')[1]
    if (code?.length) {
      const path = code.split('=')[1]
      if (path)
        child_process.exec(`code -r -g ${path}`)
    }
    res.end(
      JSON.stringify({
        status: 'success',
        code: 200,
      }),
    )
  })

  server.listen(port, () => {
    console.log(`codePositionServer started on port ${port}`)
  })

  return server
}
