import { P5CanvasInstance } from 'react-p5-wrapper'
import { getCoordFromIndex, printTiles, random } from '../utilities'
import Cell from './Cell'
import Framerate from './Framerate'
import Tile from './Tile'

export default class Grid {
  private grid: Cell[] = []
  private dimension: number
  private tiles: Tile[]
  private _availableOptions: number[]

  static DEBUG = false
  static TEST = false

  constructor(dimension: number, tiles: Tile[]) {
    this.dimension = dimension
    this.tiles = tiles
    this._availableOptions = new Array(tiles.length).fill(0).map((_, i) => i)

    this.reset()
  }

  private get availableOptions() {
    return [...this._availableOptions]
  }

  reset() {
    Framerate.resetInterval()
    this.debug('[Tiles]', printTiles(this.tiles))

    this.grid = []

    if (Grid.TEST) {
      const options = this.availableOptions
      for (let i = 0; i < this.dimension * this.dimension; i++) {
        if (i < this.tiles.length) {
          this.grid[i] = new Cell(i, [options[i]])
          continue
        }

        this.grid[i] = new Cell(i, [])
      }
      return
    }

    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.grid[i] = new Cell(i, this.availableOptions)
    }

    this.debug(
      '[Grid]',
      this.availableOptions,
      this.grid.map((c) => c.toString())
    )
  }

  draw(p5: P5CanvasInstance) {
    Framerate.increment()
    const w = p5.width / this.dimension
    const h = p5.height / this.dimension

    for (let y = 0; y < this.dimension; y++) {
      for (let x = 0; x < this.dimension; x++) {
        const cell = this.grid[x + y * this.dimension]

        if (cell.collapsed) {
          const tileIndex = cell.options[0]
          p5.image(this.tiles[tileIndex].image, x * w, y * h, w, h)
        } else if (cell.options.length < this._availableOptions.length) {
          p5.fill(175)
          p5.stroke(175)
          p5.rect(x * w, y * h, w, h)
        } else {
          // p5.noFill();
          // p5.stroke(255);
          // p5.rect(x * w, y * h, w, h);
          // p5.text(cell.index, x * w, y * h, w, h);
          // p5.push();
          // p5.translate(w / 2, h / 2);
          // p5.stroke(0);
          // p5.text(cell.options.length, x * w, y * h, w, h);
          // p5.pop();
        }
      }
    }
  }

  updateOptimized() {
    const minEntropy = this.grid.reduce<number>((minEntropy, cell) => {
      const optionLength = cell.options.length
      if (!cell.collapsed && optionLength < minEntropy) {
        return optionLength
      }

      return minEntropy
    }, this._availableOptions.length)

    const nextCollapsable = this.grid.filter(
      (cell) => !cell.collapsed && cell.options.length === minEntropy
    )
    this.debug('[nextCollapsable]', nextCollapsable)

    if (nextCollapsable.length === 0) {
      // Finished
      Framerate.clear()
      return
    }

    const cell = random(nextCollapsable)
    const pick = random(cell.options)

    cell.options = [pick]

    const collapsed = this.grid.filter((c) => c.collapsed)
    const proliferable: { [key: number]: Cell } = {}
    for (let i = 0; i < collapsed.length; i++) {
      const c = collapsed[i]
      const [x, y] = getCoordFromIndex(c.index, this.dimension)

      if (y > 0) {
        const idx = x + (y - 1) * this.dimension
        this.addProliferable(idx, proliferable)
      }

      if (x < this.dimension - 1) {
        const idx = x + 1 + y * this.dimension
        this.addProliferable(idx, proliferable)
      }

      if (y < this.dimension - 1) {
        const idx = x + (y + 1) * this.dimension
        this.addProliferable(idx, proliferable)
      }

      if (x > 0) {
        const idx = x - 1 + y * this.dimension
        this.addProliferable(idx, proliferable)
      }
    }

    const prolifArr = Object.values(proliferable)
    const newGrid = [...this.grid]
    for (let i = 0; i < prolifArr.length; i++) {
      const pCell = prolifArr[i]
      const newOptions = this.getValidOptions(
        ...getCoordFromIndex(pCell.index, this.dimension)
      )

      if (newOptions.length === 0) {
        // Stalemate
        this.reset()
        return
      }

      newGrid[pCell.index] = new Cell(pCell.index, newOptions)
    }

    this.grid = newGrid
  }

  private addProliferable(idx: number, proliferable: { [key: number]: Cell }) {
    const adjacentCell = this.grid[idx]
    if (!adjacentCell.collapsed && proliferable[idx] === undefined) {
      proliferable[idx] = adjacentCell
    }
  }

  update() {
    const uncollapsed = this.grid.filter((x) => !x.collapsed)
    this.debug('[Uncollapsed]', uncollapsed)

    if (uncollapsed.length === 0) {
      // Finished
      Framerate.clear()
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
    let stopIndex = 0
    for (let i = 1; i < uncollapsed.length; i++) {
      if (uncollapsed[i].options.length > mostCollapsedLength) {
        stopIndex = i
        break
      }
    }

    const nextCollapsable =
      stopIndex > 0 ? uncollapsed.slice(0, stopIndex) : uncollapsed
    const cell = random(nextCollapsable)
    const pick = random(cell.options)

    if (pick === undefined) {
      return false
    }

    cell.options = [pick]
    return cell
  }

  private getNewGrid() {
    const newGrid: Cell[] = []
    for (let y = 0; y < this.dimension; y++) {
      for (let x = 0; x < this.dimension; x++) {
        const i = x + y * this.dimension
        // this.debug(`[(${x},${y})-${i}]`, this.grid[i].options.join(','))

        if (this.grid[i].collapsed) {
          newGrid[i] = this.grid[i]
        } else {
          const newOptions = this.getValidOptions(x, y)
          newGrid[i] = new Cell(i, newOptions)
        }
      }
    }

    this.debug('[Grid]', newGrid)
    return newGrid
  }

  private getValidOptions(x: number, y: number) {
    let newOptions = this.availableOptions

    const upIndex = x + (y - 1) * this.dimension
    const rightIndex = x + 1 + y * this.dimension
    const downIndex = x + (y + 1) * this.dimension
    const leftIndex = x - 1 + y * this.dimension

    // Look up
    if (y > 0) {
      newOptions = this.filterValidOptions(
        newOptions,
        upIndex,
        (o) => this.tiles[o].validDowns
      )
    }

    // Look right
    if (x < this.dimension - 1) {
      newOptions = this.filterValidOptions(
        newOptions,
        rightIndex,
        (o) => this.tiles[o].validLefts
      )
    }

    // Look down
    if (y < this.dimension - 1) {
      newOptions = this.filterValidOptions(
        newOptions,
        downIndex,
        (o) => this.tiles[o].validUps
      )
    }

    // Look left
    if (x > 0) {
      newOptions = this.filterValidOptions(
        newOptions,
        leftIndex,
        (o) => this.tiles[o].validRights
      )
    }

    return newOptions
  }

  private filterValidOptions(
    options: number[],
    adjacentIndex: number,
    map: (opt: number) => number[]
  ) {
    const adjacentCell = this.grid[adjacentIndex]
    const validOptions = adjacentCell.options.flatMap(map)
    return options.filter((o) => validOptions.includes(o))
  }

  private debug(...args: unknown[]) {
    if (Grid.DEBUG) {
      console.log(...args)
    }
  }
}
