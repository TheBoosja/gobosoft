import React from 'react'
import {Image} from 'p5';
import {ReactP5Wrapper, Sketch} from 'react-p5-wrapper'
import {getSetupBg, getSetupV0, getSetupV1, getSetupV2, SetupResponse} from './config';
import {Tile, Grid} from './models';
import {withRotatedTilesFromP5} from './utilities';

const setups = [
  () => getSetupV0(),
  () => getSetupV1(),
  () => getSetupV2(),
]

interface sketch {
  tileImgs: Image[]
  tiles: Tile[]
  grid: Grid | null

  setup: SetupResponse
}

const sketch: Sketch = (p5) => {
  const DIMENSION = 32;
  const SIZE = 600;

  const sketches: sketch[] = [
    {
      tileImgs: [],
      tiles: [],
      grid: null,
      setup: setups[2]()
    },
  ]

  Grid.DEBUG = false
  Grid.TEST = false

  p5.preload = () => {
    for (const s of sketches) {
      const [imageCount, getPath] = s.setup
      for (let i = 0; i < imageCount; i++) {
        s.tileImgs.push(p5.loadImage(`assets/${getPath(i)}`))
      }
    }
  }

  p5.setup = () => {
    p5.createCanvas(SIZE, SIZE)

    for (const s of sketches) {
      const getInitialTiles = s.setup[2]
      const initialTiles = getInitialTiles(s.tileImgs)
      const withRotatedTiles = withRotatedTilesFromP5(p5)
      s.tiles = withRotatedTiles(initialTiles)

      for (const tile of s.tiles) {
        tile.analyze(s.tiles)
      }

      s.grid = new Grid(DIMENSION, s.tiles)
    }

    //p5.noLoop()
  }

  p5.mousePressed = () => {
    for (const s of sketches) {
      s.grid!.reset()
    }
  }

  p5.draw = () => {
    p5.background('#d6d6d6')

    for (const s of sketches) {
      s.grid!.draw(p5)
      s.grid!.update()
    }
  }
}

const WaveFunctionCollapse = () => {
  return <ReactP5Wrapper sketch={sketch} />
}

export default WaveFunctionCollapse

