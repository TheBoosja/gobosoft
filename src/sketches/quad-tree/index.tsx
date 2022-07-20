import React from 'react'
import {ReactP5Wrapper, Sketch} from 'react-p5-wrapper'
import {Boundary} from './models/Boundary'
import {Point} from './models/Point'
import {QuadTree} from './models/QuadTree'

const sketch: Sketch = (p5) => {
  const SIZE = 600

  const points: Point<undefined>[] = []
  const tree = new QuadTree(new Boundary(0, 0, SIZE, SIZE), 4, 0)

  p5.setup = () => {
    p5.createCanvas(SIZE, SIZE)
    p5.frameRate(5)

    //    for (let i = 0; i < 100; i++) {
    //      const x = p5.random(SIZE - 4)
    //      const y = p5.random(SIZE - 4)
    //      const point = new Point(x, y, undefined)
    //      points.push(point)
    //      tree.insert(point)
    //}

    console.log(tree.toString())
  }

  p5.mousePressed = () => {
    const point = new Point(p5.mouseX, p5.mouseY, undefined)
    points.push(point)
    tree.insert(point)
  }

  p5.draw = () => {
    p5.background(0)

    for (const p of points) {
      p5.circle(p.x, p.y, 4)
    }

    p5.push()
    p5.noFill()
    p5.stroke(255)
    tree.draw(p5)
    p5.pop()
  }
}

const QuadTreeSketch = () => {
  return <ReactP5Wrapper sketch={sketch} />
}

export default QuadTreeSketch
