import {P5CanvasInstance} from "react-p5-wrapper";
import {Boundary} from "./Boundary";
import {Point} from "./Point";

export class QuadTree<T> {
  static MAX_DEPTH = 8;
  private points: Point<T>[] | null = [];
  private isDivided: boolean = false;

  northwest: QuadTree<T> | null = null;
  northeast: QuadTree<T> | null = null;
  southwest: QuadTree<T> | null = null;
  southeast: QuadTree<T> | null = null;

  constructor(public boundary: Boundary<T>, public capacity: number, public depth: number) {}

  get sections() {
    if (!this.isDivided) {
      return []
    }

    return [
      this.northwest!,
      this.northeast!,
      this.southwest!,
      this.southeast!
    ]
  }

  subdivide = () => {
    const subdivitions = this.boundary.subdivide()
    this.northwest = new QuadTree(subdivitions.nw, this.capacity, this.depth + 1)
    this.northeast = new QuadTree(subdivitions.ne, this.capacity, this.depth + 1);
    this.southwest = new QuadTree(subdivitions.sw, this.capacity, this.depth + 1);
    this.southeast = new QuadTree(subdivitions.se, this.capacity, this.depth + 1);

    this.isDivided = true

    for (const p of this.points!) {
      const inserted =
        this.northwest.insert(p) ||
        this.northeast.insert(p) ||
        this.southwest.insert(p) ||
        this.southeast.insert(p)

      if (!inserted) {
        throw RangeError('capacity must be greater than 0')
      }
    }

    this.points = null
  }

  insert = (point: Point<T>): boolean => {
    if (!this.boundary.contains(point)) {
      return false
    }

    if (!this.isDivided) {
      if (this.points!.length < this.capacity || this.depth === QuadTree.MAX_DEPTH) {
        this.points!.push(point)
        return true
      }

      this.subdivide()
    }

    return (
      this.northwest!.insert(point) ||
      this.northeast!.insert(point) ||
      this.southwest!.insert(point) ||
      this.southeast!.insert(point)
    )
  }

  query = (range: Boundary<T>, result: Point<T>[] = []): Point<T>[] => {
    if (!range.intersects(this.boundary)) {
      console.log('1', this.depth, result)
      return result
    }

    if (!this.isDivided) {
      for (const p of this.points!) {
        if (range.contains(p)) {
          result.push(p)
        }
      }
      console.log('2', this.depth, result)
      return result
    }

    this.northwest!.query(range, result)
    this.northeast!.query(range, result)
    this.southwest!.query(range, result)
    this.southeast!.query(range, result)
    console.log('3', this.depth, result)

    return result
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
