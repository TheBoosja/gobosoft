export interface IGrid<T> {
  grid: T[][]
}

export class Grid {
  constructor(public dx: number, public dy: number) {}
}
