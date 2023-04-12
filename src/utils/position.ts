export const getHtmlPositionCode = (port = 9002): string => {
  return `
    <script>
      const initDom = () => {
        document.onmousedown = (e) => {
          if (e.shiftKey && e.button === 0) {
            e.preventDefault()
            e.stopPropagation()
            sendRequestToOpenFileInEditor(getFilePath(e))
          }
        }
      }
      
      const getFilePath = e => {
        let element = e
        element = e.target || element
      
        if (!element || !element.getAttribute) return null
        if (element.getAttribute('code-location')) {
          return element.getAttribute('code-location')
        }
        return getFilePath(element.parentNode)
      }
      
      const sendRequestToOpenFileInEditor = (filePath) => {
        const protocol = window.location.protocol || 'http:'
        const hostname = window.location.hostname || 'localhost'
        fetch(\`\${protocol}//\${hostname}:${port}?filePath=\${filePath}\`, { cors: true })
        .catch(err => {
          console.log(err)
        })
      }
      initDom()
    </script>
  `
}
