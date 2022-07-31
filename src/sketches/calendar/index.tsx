import {ReactP5Wrapper, Sketch} from 'react-p5-wrapper'
import {useTitle} from '../../ducks/page'

const sketch: Sketch = (p5) => {
  const theta = 360 / 365

  p5.setup = () => {
    p5.createCanvas(800, 800)

    p5.noLoop()
  }

  p5.draw = () => {
    p5.background(0)

    const cX = p5.width / 2
    const cY = p5.height / 2
    const r = p5.width * .9 / 2

    p5.translate(cX, cY)
    p5.noFill()
    p5.stroke(255)
    p5.push()
    p5.strokeWeight(4)
    p5.circle(0, 0, -r * 2)
    p5.circle(0, 0, -150 * 2)
    p5.pop()

    p5.text('July 24th 2022', -40, -4, 100, 100)

    // Lines
    for (let i = 0; i < 365; i++) {
      p5.rotate(p5.radians(theta))

      if (i % 30 !== 0) {
        p5.line(0, -r, 0, -r + 20)
        continue
      }

      p5.line(0, -150, 0, -r)
    }
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
