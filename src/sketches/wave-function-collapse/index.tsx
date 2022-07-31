import { Image } from 'p5'
import { useEffect, useState } from 'react'
import { ReactP5Wrapper, Sketch } from 'react-p5-wrapper'
import { useTitle } from '../../ducks/page'
import { getSetupV0, getSetupV1, getSetupV2, ConfigResponse } from './config'
import { Tile, Grid, Framerate } from './models'
import { printTiles, withRotatedTilesFromP5 } from './utilities'

const setups = [() => getSetupV0(), () => getSetupV1(), () => getSetupV2()]

const sketch =
  (isOptimized: boolean): Sketch =>
  (p5) => {
    const DIMENSION = 32
    const SIZE = 800

    const tileImgs: Image[] = []
    let tiles: Tile[] = []
    let grid: Grid | null = null
    const config: ConfigResponse = setups[2]()

    Grid.DEBUG = false
    Grid.TEST = false
    // Logs framerate
    Framerate.enable(false)

    p5.preload = () => {
      const [imageCount, getPath] = config
      for (let i = 0; i < imageCount; i++) {
        const url = new URL(`assets/${getPath(i)}`, import.meta.url).href
        tileImgs.push(p5.loadImage(url))
      }
    }

    p5.setup = () => {
      const canvas = p5.createCanvas(SIZE, SIZE)
      canvas.mousePressed(() => {
        if (grid) grid.reset()
        // p5.redraw();
      })

      const getInitialTiles = config[2]
      const initialTiles = getInitialTiles(tileImgs)
      const withRotatedTiles = withRotatedTilesFromP5(p5)
      tiles = withRotatedTiles(initialTiles)

      for (const tile of tiles) {
        tile.analyze(tiles)
      }
      console.log(printTiles(tiles))

      grid = new Grid(DIMENSION, tiles)

      // p5.noLoop();
    }

    p5.draw = () => {
      p5.background('#d6d6d6')

      if (!grid) return

      grid.draw(p5)
      if (isOptimized) {
        grid.updateOptimized()
      } else {
        grid.update()
      }
    }
  }

const WaveFunctionCollapse = () => {
  useTitle('Wave Function Collapse')

  const [isOptimized, setOptimized] = useState(false)

  useEffect(() => {
    return () => Framerate.clear()
  }, [])

  return (
    <>
      <div className='grid grid-flow-col'>
        <button
          className='justify-self-start px-2 py-1 mb-2 text-xs bg-slate-600 rounded hover:bg-slate-700'
          onClick={() => setOptimized(!isOptimized)}
        >
          {!isOptimized ? 'Normal' : 'Optimized'}
        </button>
        <div className='justify-self-end self-end p-1 mr-2'>
          Click for refresh...
        </div>
      </div>
      <div>
        <ReactP5Wrapper sketch={sketch(isOptimized)} />
      </div>
    </>
  )
}

export default WaveFunctionCollapse
