const addLineAttr = (lineStr: string, line: number, path: string) => {
  if (!/^\s+</.test(lineStr))
    return lineStr

  const reg = /((((^(\s)+\<))|(^\<))[\w-]+)|(<\/template)/g
  let leftTagList: any = lineStr.match(reg)
  if (leftTagList) {
    leftTagList = Array.from(new Set(leftTagList))
    leftTagList.forEach((item: string | string[]) => {
      const skip = ['KeepAlive', 'template', 'keep-alive', 'transition', 'router-view', 'RouterView']
      if (item && !skip.some(i => item.includes(i))) {
        const reg = new RegExp(`${item}`)
        const location = `${item} code-location="${path}:${line}"`
        lineStr = lineStr.replace(reg, location)
      }
    })
  }
  return lineStr
}

export const codeLineTrack = (code: string, path: string) => {
  const lineList = code.split('\n')
  const newList: string[] = []
  lineList.forEach((item, idx) => {
    newList.push(addLineAttr(item, idx + 1, path))
  })
  return newList.join('\n')
}
