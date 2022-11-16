import { ReactP5Wrapper, Sketch } from 'react-p5-wrapper'
import { throttle } from '../../common/utils'
import { useTitle } from '../../ducks/page'
import { Day } from './utils'

const sketch: Sketch = (p5) => {
  const today = new Day()
  let highlightDayIndex: number

  let cx: number
  let cy: number
  let r: number

  const pad = 90

  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800)
    canvas.mouseMoved(
      throttle(() => {
        highlightDayIndex = today.getIndexOfYearFromXY(
          p5.mouseX,
          p5.mouseY,
          cx,
          cy,
          p5
        )
        console.log('highlight', highlightDayIndex)
        p5.redraw()
      }, 0)
    )

    cx = p5.width / 2
    cy = p5.height / 2
    r = (p5.width * 0.9) / 2

    p5.noLoop()
  }

  p5.draw = () => {
    p5.background(0)

    p5.translate(cx, cy)
    p5.noFill()
    p5.stroke(125)

    // Lines
    for (let i = 0; i < today.DAYS_IN_YEAR; i++) {
      p5.rotate(p5.radians(today.THETA))

      if (i === today.indexOfYear) {
        p5.push()
        p5.fill(255)
        p5.arc(0, 0, r * 2, r * 2, p5.radians(0.5), p5.radians(today.THETA))
        p5.pop()
      }

      if (i === highlightDayIndex) {
        p5.push()
        p5.fill('green')
        p5.arc(0, 0, r * 2, r * 2, p5.radians(0.5), p5.radians(today.THETA))
        p5.pop()
      }

      if (i % 28 !== 0 || i === today.DAYS_IN_YEAR - 1) {
        p5.line(0, r, 0, r - 20)
        continue
      }

      p5.line(0, pad, 0, r)
    }

    p5.push()
    p5.strokeWeight(4)
    p5.circle(0, 0, r * 2)
    p5.fill('black')
    p5.circle(0, 0, pad * 2)
    p5.pop()

    p5.stroke(255)
    p5.text(today.format, -40, -4, 100, 100)
  }
}

const Calendar = () => {
  useTitle('Calendar')

  return (
    <>
      <div className='grid grid-flow-col'>
        <div className='justify-self-end self-end p-1 mr-2'>&nbsp;</div>
      </div>
      <ReactP5Wrapper sketch={sketch} />
    </>
  )
}

export default Calendar
