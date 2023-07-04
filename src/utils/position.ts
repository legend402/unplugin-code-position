export const getHtmlPositionCode = (port = 9002): string => {
  return `
    <style>
      .position-switch {
        position: fixed;
        top: 50px;
        right: 10px;
        height: 30px;
        width: 80px;
        border-radius: 30px;
        background: #fff;
        box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .2);
        cursor: pointer;

      }
      .position-switch .inner-ball {
        position: absolute;
        top: 2px;
        left: 2px;
        height: 26px;
        width: 26px;
        background: #ddd;
        border-radius: 50%;
        transition: all .3s;
      }
      .position-switch .text {
        position: absolute;
        left: 45px;
        color: #ddd;
        font-size: 12px;
        line-height: 30px;
        white-space: nowrap;
        transition: all .3s;
        user-select: none;
      }
      .position-switch.active .inner-ball {
        top: 2px;
        left: 52px;
        background: #1890FF;
      }
      .position-switch.active .text {
        left: 10px;
        color: #1890FF;
      }
      .position-move-div {
        position: fixed;
        top: 0;
        left: 0;
        padding: 6px;
        border-radius: 5px;
        background: rgba(68, 189, 135, .2);
        transition: all .1s;
        pointer-events: none;
        z-index: 999;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/el-dragmove@0.0.2-beta.3/dist/index.min.js"></script>
    <script>
      let isOpen = false;

      const initDom = () => {
        document.onmousedown = (e) => {
          if (e.shiftKey && e.button === 0 && isOpen) {
            e.preventDefault()
            e.stopPropagation()
            sendRequestToOpenFileInEditor(getFilePath(e))
          }
        }
      }
      
      const getFilePathNode = e => {
        let element = e
        element = e.target || element
      
        if (!element || !element.getAttribute) return null
        if (element.getAttribute('code-location')) {
          return element
        }
        return getFilePath(element.parentNode)
      }

      const getFilePath = e => {
        return getFilePathNode(e)?.getAttribute('code-location')
      }

      const createSwitch = () => {
        const switchDiv = document.createElement('div')
        switchDiv.className = "position-switch"
        switchDiv.innerHTML = '<div class="inner-ball"></div><span class="text">code</span>'
        switchDiv.setAttribute('data-flag', 0)
        switchDiv.addEventListener('click', e => {
          if (!isMoved()) return
          if (switchDiv.dataset.flag === '0') {
            isOpen = true
            switchDiv.setAttribute('data-flag', 1)
            switchDiv.classList.add('active')
            setTemplateDivVisible(true)
          } else {
            isOpen = false
            switchDiv.setAttribute('data-flag', 0)
            switchDiv.classList.remove('active')
            setTemplateDivVisible(false)
          }
        })

        document.body.appendChild(switchDiv)
        const dragMove = new DragMoveModel({ targetEl: switchDiv, limitMoveBorder: true })

        function isMoved() {
          const flag = !dragMove.moveInsX && !dragMove.moveInsY
          return flag
        }
      }
      createSwitch()
      
      const sendRequestToOpenFileInEditor = (filePath) => {
        const protocol = window.location.protocol || 'http:'
        const hostname = window.location.hostname || 'localhost'
        fetch(\`\${protocol}//\${hostname}:${port}?filePath=\${filePath}\`, { cors: true })
        .catch(err => {
          console.log(err)
        })
      }
      initDom()

      const useMousePoint = () => {
        const div = document.createElement('div');
        div.className = 'position-move-div';
        document.body.appendChild(div);
      
        window.addEventListener('mousemove', (e) => {
          const el = getFilePathNode(e);
          if (el && isOpen) {
            const { top, left, width, height } = el.getBoundingClientRect();
            div.style.top = top - 6 + 'px';
            div.style.left = left - 6 + 'px';
            div.style.width = width + 'px';
            div.style.height = height + 'px';
          }
        });

        const setTemplateDivVisible = (bool) => div.style.display = bool ? 'block' : 'none';
        return {
          templateDiv: div,
          setTemplateDivVisible
        }
      };
      const { setTemplateDivVisible } = useMousePoint()
    </script>
  `
}
