import {P5CanvasInstance} from "react-p5-wrapper";
import {Boundary} from "./Boundary";
import {Point} from "./Point";

export class QuadTree<T> {
  private points: Point<T>[] | null = [];
  private isDivided: boolean = false;

  northwest: QuadTree<T> | null = null;
  northeast: QuadTree<T> | null = null;
  southwest: QuadTree<T> | null = null;
  southeast: QuadTree<T> | null = null;

  constructor(public boundary: Boundary<T>, public size: number, public depth: number) {}

  subdivide = () => {
    const subdivitions = this.boundary.subdivide()
    this.northwest = new QuadTree(subdivitions.nw, this.size, this.depth + 1)
    this.northeast = new QuadTree(subdivitions.ne, this.size, this.depth + 1);
    this.southwest = new QuadTree(subdivitions.sw, this.size, this.depth + 1);
    this.southeast = new QuadTree(subdivitions.se, this.size, this.depth + 1);

    this.isDivided = true

    for (const p of this.points!) {
      const inserted =
        this.northwest.insert(p) ||
        this.northeast.insert(p) ||
        this.southwest.insert(p) ||
        this.southeast.insert(p)

      if (!inserted) {
        console.log(this, p)
        throw new Error('Not inserted')
      }
    }

    this.points = null
  }

  insert = (point: Point<T>): boolean => {
    if (!this.boundary.contains(point)) {
      console.log('not within boundary', this.boundary.toString(), point)
      return false
    }

    if (!this.isDivided) {
      if (this.points!.length < this.size) {
        this.points!.push(point)
        return true
      }

      this.subdivide()
    }

    return this.northwest!.insert(point) ||
      this.northeast!.insert(point) ||
      this.southwest!.insert(point) ||
      this.southeast!.insert(point)
  }

  draw = (p5: P5CanvasInstance) => {
    p5.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h)

    this.northwest?.draw(p5)
    this.northeast?.draw(p5)
    this.southwest?.draw(p5)
    this.southeast?.draw(p5)
  }

  toString = (): any => {
    return {
      p: this.boundary.toString(),
      nw: this.northwest?.toString(),
      ne: this.northeast?.toString(),
      sw: this.southwest?.toString(),
      se: this.southeast?.toString()
    }
  }
}
