import {Point} from "./Point"

export class Boundary<T> {
  constructor(public x: number, public y: number, public w: number, public h: number) {
  }

  contains = (point: Point<T>) => {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.w &&
      point.y >= this.y &&
      point.y <= this.y + this.h
    )
  }

  subdivide = () => {
    return {
      ne: new Boundary(this.x + this.w / 2, this.y, this.w / 2, this.h / 2),
      nw: new Boundary(this.x, this.y, this.w / 2, this.h / 2),
      se: new Boundary(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2),
      sw: new Boundary(this.x, this.y + this.h / 2, this.w / 2, this.h / 2),
    }
  }

  toString = () => {
    return `(${this.x},${this.y},${this.w},${this.h})`
  }
}
