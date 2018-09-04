import { MARKETS, CURRENCIES } from 'constants/currency'
import { QUICK_BETS_GEAR } from 'constants/constants'
import { isMobile, isBrowser } from 'utils/platform'

const multiple = (position: number): number => (!position ? 1 : (10 * multiple(position - 1)))

export const validateMarket = (market: string) => ~MARKETS.indexOf(market)

export const validateCurrency = (currency: string) => ~CURRENCIES.indexOf(currency)

export const roundDown = (value: number, decimal: number) => (value && (Math.floor(value * multiple(decimal)) / multiple(decimal)))

export const roundUp = (value: number, decimal: number) => (value && (Math.ceil(value * multiple(decimal)) / multiple(decimal)))

export const errorLoading = (err: string) => console.error('Dynamic page loading failed: ', err)

export const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1)

const loadedScripts: string[] = []

export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    if (~loadedScripts.indexOf(src)) {
      resolve()
    } else {
      const script = document.createElement('script')
      script.src = src
      script.addEventListener('load', () => {
        loadedScripts.push(src)
        resolve()
      })
      script.addEventListener('error', (e) => {
        reject(e)
      })
      document.head.appendChild(script)
    }
  })
}

export const getLocationSearch = (requestUrl: string | undefined) => {
  let search = null

  if (!isMobile) {
    if (isBrowser) {
      search = window.location.search
    } else if (requestUrl) {
      const url = require('url')
      search = url.parse(requestUrl).search
    }
  }

  return search
}

export const getQuickBetsOption = (blance: number, currency = 'ETC') => {
  let gear = 'one'
  switch (currency) {
    case 'ETH':
      if (blance > 1 && blance <= 10) {
        gear = 'two'
      } else if (blance > 10) {
        gear = 'three'
      }
      break
    case 'ETC':
      if (blance > 10 && blance <= 100) {
        gear = 'two'
      } else if (blance > 100) {
        gear = 'three'
      }
      break
  }
  return QUICK_BETS_GEAR[currency][gear]
}

export const toFiexdNumber = (value: string, pre = 1) => {
  value = String(value)
  if (value.trim().length <= 0 || /^[0-9]*$/.test(value)) {
    return value
  }
  let output = value
  if (value.includes('.')) {
    output = value.substring(0, value.lastIndexOf('.') + 1 + pre)
  }
  return output
}

export const toCanvas = (drawing_elem: any, percent: number, forecolor: string, bgcolor: string, title = '可用资产', amount = '0', currency: string) => {
  if (isNaN(percent) || percent <= 0) {
    return
  }
    /*
        @drawing_elem: 绘制对象
        @percent：绘制圆环百分比, 范围[0, 100]
        @forecolor: 绘制圆环的前景色，颜色代码
        @bgcolor: 绘制圆环的背景色，颜色代码
    */
  const context = drawing_elem.getContext('2d')
  const center_x = drawing_elem.width / 2
  const center_y = drawing_elem.height / 2
  const rad = Math.PI * 2 / 100
  let speed = 0

  function writeTitle() {
    context.save() // save和restore可以保证样式属性只运用于该段canvas元素
    context.fillStyle = '#333'
    const font_size = 16
    context.font = font_size + 'px Helvetica'
    const text_width = context.measureText(title).width
    context.fillText(title, center_x - text_width / 2, center_y + font_size / 2 - 20)
    context.restore()
  }

  // 绘制背景圆圈
  function backgroundCircle() {
    context.save()
    context.beginPath()
    context.lineWidth = 8
    const radius = center_x - context.lineWidth
    context.lineCap = 'round'
    context.strokeStyle = bgcolor
    context.arc(center_x, center_y, radius, 0, Math.PI * 2, false)
    context.stroke()
    context.closePath()
    context.restore()
  }

  // 绘制运动圆环
  function foregroundCircle(n: number) {
    context.save()
    const grd = context.createLinearGradient(0, 0, 170, 0)
    grd.addColorStop(0,'#3be98a')
    grd.addColorStop(1,'#03b7b8')
    context.strokeStyle = grd // forecolor
    context.lineWidth = 14
    context.lineCap = 'round'
    const radius = center_x - context.lineWidth
    context.beginPath()
    context.arc(center_x, center_y, radius + 5 , -Math.PI / 2, -Math.PI / 2 + n * rad, false) //  -Math.PI / 2 // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    context.stroke()
    context.closePath()
    context.restore()
  }

  // 绘制文字
  function text() {
    context.save() // save和restore可以保证样式属性只运用于该段canvas元素
    context.fillStyle = forecolor
    const font_size = 14
    context.font = font_size + 'px Helvetica'
    const text_width = context.measureText(`${amount} ${currency}`).width
    context.fillText(`${amount} ${currency}`, center_x - text_width / 2, center_y + font_size / 2) // n.toFixed(0) + '%', center_x - text_width / 2, center_y + font_size / 2
    context.restore()
  }

  // 执行动画

  (function drawFrame() {
    if (speed >= percent) return
    window.requestAnimationFrame(drawFrame)
    context.clearRect(0, 0, drawing_elem.width, drawing_elem.height)
    backgroundCircle()
    writeTitle()
    text()
    foregroundCircle(speed)
    speed += 1
  })()
}
