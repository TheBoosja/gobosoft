import {P5CanvasInstance} from "react-p5-wrapper";
import {printTiles, random} from "../utilities";
import Cell from "./Cell";
import Tile from "./Tile";

let KEY = 0
export default class Grid {
  key = KEY++
  private grid: Cell[] = []
  private dimension: number;
  private tiles: Tile[];
  private _availableOptions: number[];

  static DEBUG = false;
  static TEST = false;

  constructor(dimension: number, tiles: Tile[]) {
    this.dimension = dimension;
    this.tiles = tiles;
    this._availableOptions = new Array(tiles.length).fill(0).map((_, i) => i);

    this.reset()
  }

  reset() {
    this.debug('[Tiles]', printTiles(this.tiles))

    this.grid = [];

    if (Grid.TEST) {
      const options = this.availableOptions;
      for (let i = 0; i < this.dimension * this.dimension; i++) {
        if (i < this.tiles.length) {
          this.grid[i] = new Cell([options[i]])
          continue
        }

        this.grid[i] = new Cell([])
      }
      return
    }

    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.grid[i] = new Cell(this.availableOptions)
    }

    this.debug('[Grid]', this.availableOptions, this.grid.map(c => c.toString()))
  }

  update() {
    const uncollapsed = this.grid.filter(x => !x.collapsed)
    this.debug('[Uncollapsed]', uncollapsed)

    if (uncollapsed.length === 0) {
      // Finished
      return
    }

    const hasPick = this.collapseRandomCell(uncollapsed)

    this.debug('[HasPick]', hasPick)
    if (!hasPick) {
      // No picks
      this.reset()
    }

    this.grid = this.getNewGrid()
  }

  private collapseRandomCell(uncollapsed: Cell[]) {
    uncollapsed.sort((a, b) => a.options.length - b.options.length)

    const mostCollapsedLength = uncollapsed[0].options.length
    let stopIndex = 0;
    for (let i = 1; i < uncollapsed.length; i++) {
      if (uncollapsed[i].options.length > mostCollapsedLength) {
        stopIndex = i;
        break;
      }
    }

    const nextCollapsable = stopIndex > 0 ? uncollapsed.slice(0, stopIndex) : uncollapsed
    const cell = random(nextCollapsable);
    const pick = random(cell.options)

    if (pick === undefined) {
      return false
    }

    cell.options = [pick]
    return true
  }

  private getNewGrid() {
    const newGrid: Cell[] = [];
    for (let y = 0; y < this.dimension; y++) {
      for (let x = 0; x < this.dimension; x++) {
        const i = x + y * this.dimension;
        // this.debug(`[(${x},${y})-${i}]`, this.grid[i].options.join(','))

        if (this.grid[i].collapsed) {
          newGrid[i] = this.grid[i]
        } else {
          let newOptions = this.availableOptions;

          const upIndex = x + (y - 1) * this.dimension;
          const rightIndex = x + 1 + y * this.dimension;
          const downIndex = x + (y + 1) * this.dimension;
          const leftIndex = x - 1 + y * this.dimension;

          // Look up
          if (y > 0) {
            newOptions = this.filterValidOptions(newOptions, upIndex, o => this.tiles[o].validDowns)
          }

          // Look right
          if (x < this.dimension - 1) {
            newOptions = this.filterValidOptions(newOptions, rightIndex, o => this.tiles[o].validLefts)
          }

          // Look down
          if (y < this.dimension - 1) {
            newOptions = this.filterValidOptions(newOptions, downIndex, o => this.tiles[o].validUps)
          }

          // Look left
          if (x > 0) {
            newOptions = this.filterValidOptions(newOptions, leftIndex, o => this.tiles[o].validRights)
          }

          newGrid[i] = new Cell(newOptions)
        }
      }
    }

    this.debug('[Grid]', newGrid)
    return newGrid;
  }

  private filterValidOptions(options: number[], adjacentIndex: number, map: (opt: number) => number[]) {
    const adjacentCell = this.grid[adjacentIndex];
    const validOptions = adjacentCell.options.flatMap(map)
    return options.filter(o => validOptions.includes(o))
  }

  draw(p5: P5CanvasInstance) {
    const w = p5.width / this.dimension
    const h = p5.height / this.dimension

    for (let y = 0; y < this.dimension; y++) {
      for (let x = 0; x < this.dimension; x++) {
        const cell = this.grid[x + y * this.dimension]

        if (cell.collapsed) {
          const tileIndex = cell.options[0]
          p5.image(this.tiles[tileIndex].image, x * w, y * h, w, h)
        }
      }
    }
  }

  private get availableOptions() {
    return [...this._availableOptions]
  }

  private debug(...args: unknown[]) {
    if (Grid.DEBUG) {
      console.log(`${this.key} |`, ...args)
    }
  }
}
