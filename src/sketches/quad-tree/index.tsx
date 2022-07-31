import React from 'react'
import {ReactP5Wrapper, Sketch} from 'react-p5-wrapper'
import {useTitle} from '../../ducks/page'
import {Boundary} from './models/Boundary'
import {Point} from './models/Point'
import {QuadTree} from './models/QuadTree'

const sketch: Sketch = (p5) => {
  const SIZE = 800

  const points: Point<undefined>[] = []
  const tree = new QuadTree(new Boundary(0, 0, SIZE, SIZE), 4, 0)

  p5.setup = () => {
    p5.createCanvas(SIZE, SIZE)
    p5.frameRate(5)

    for (let i = 0; i < 500; i++) {
      const x = p5.random(SIZE - 4)
      const y = p5.random(SIZE - 4)
      const point = new Point(x, y, undefined)
      points.push(point)
      tree.insert(point)
    }

    console.log(tree.toString())
  }

  p5.mousePressed = () => {
    const point = new Point(p5.mouseX, p5.mouseY, undefined)
    points.push(point)
    tree.insert(point)
  }

  p5.draw = () => {
    p5.background(0)
    p5.noStroke()

    const range = new Boundary(p5.mouseX - 100 / 2, p5.mouseY - 100 / 2, 100, 100)
    const result = tree.query(range)

    for (const p of points) {
      if (result.includes(p)) {
        p5.fill('red')
      } else {
        p5.fill(255)
      }
      p5.circle(p.x, p.y, 4)
    }


    p5.push()
    p5.noFill()
    p5.stroke(255)
    tree.draw(p5)
    p5.stroke('red')
    p5.pop()

    p5.push()
    p5.noFill()
    p5.stroke('red')
    p5.rect(range.x, range.y, range.w, range.h)
    p5.pop()
  }
}

const QuadTreeSketch = () => {
  useTitle('Quad Tree')

  return (
    <>
      <div className='grid grid-flow-col'>
        <div className='justify-self-end self-end p-1 mr-2'>&nbsp;</div>
      </div>
      <ReactP5Wrapper sketch={sketch} />
    </>
  )
}

export default QuadTreeSketch
