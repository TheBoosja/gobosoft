export default class Cell {
  /**
   * Tile indecies
   */
  options: number[]

  constructor(public index: number, options: number[]) {
    this.options = options
  }

  get collapsed() {
    return this.options.length === 1
  }

  toString() {
    return `${this.collapsed} - [${this.options.join(',')}]`
  }
}
