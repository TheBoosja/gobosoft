import { Image } from 'p5'
import Tile, { Edges } from './models/Tile'

export type ConfigResponse = [
  imageCount: number,
  getPath: (idx: number) => string,
  getInitialTiles: (images: Image[]) => Tile[]
]

type Config = {
  skipSelf?: boolean
  edges: Edges
}

const getTiles = (configs: Config[], images: Image[]) => {
  return configs.map(
    (config, i) => new Tile(i, images[i], config.edges, config.skipSelf)
  )
}

export const getSetupBg = (): ConfigResponse => {
  return [
    2,
    (idx) => `b${idx}.png`,
    (images) => {
      const configs: Config[] = [
        { edges: ['AABB', 'BBCC', 'CCDD', 'DDAA'] },
        { edges: ['BBAA', 'AADD', 'DDCC', 'CCBB'] },
      ]

      return getTiles(configs, images)
    },
  ]
}

export const getSetupV0 = (): ConfigResponse => {
  // Coding train
  return [
    13,
    (idx) => `circuit/${idx}.png`,
    (images) => {
      const configs: Config[] = [
        { edges: ['AAA', 'AAA', 'AAA', 'AAA'] },
        { edges: ['BBB', 'BBB', 'BBB', 'BBB'] },
        { edges: ['BBB', 'BCB', 'BBB', 'BBB'] },
        { edges: ['BBB', 'BDB', 'BBB', 'BDB'] },
        { edges: ['ABB', 'BCB', 'BBA', 'AAA'] },
        { edges: ['ABB', 'BBB', 'BBB', 'BBA'], skipSelf: true },
        { edges: ['BBB', 'BCB', 'BBB', 'BCB'] },
        { edges: ['BDB', 'BCB', 'BDB', 'BCB'] },
        { edges: ['BDB', 'BBB', 'BCB', 'BBB'] },
        { edges: ['BCB', 'BCB', 'BBB', 'BCB'] },
        { edges: ['BCB', 'BCB', 'BCB', 'BCB'] },
        { edges: ['BCB', 'BCB', 'BBB', 'BBB'] },
        { edges: ['BBB', 'BCB', 'BBB', 'BCB'] },
      ]

      return getTiles(configs, images)
    },
  ]
}

export const getSetupV1 = (): ConfigResponse => {
  return [
    7,
    (idx) => `tile-${idx}.png`,
    (images) => {
      const configs: Config[] = [
        { edges: ['AAAAA', 'AAAAA', 'AAAAA', 'AAAAA'] },
        { edges: ['AABAA', 'AABAA', 'AABAA', 'AABAA'] },
        { edges: ['AABAA', 'AAAAA', 'AABAA', 'AAAAA'] },
        { edges: ['AABAA', 'AABAA', 'AAAAA', 'AAAAA'] },
        { edges: ['AABAA', 'AAAAA', 'ABCBA', 'AAAAA'] },
        { edges: ['ABCBA', 'AABAA', 'ABCBA', 'AABAA'] },
        { edges: ['ABCBA', 'ABCBA', 'ABCBA', 'AAAAA'] },
      ]

      return getTiles(configs, images)
    },
  ]
}

export const getSetupV2 = (): ConfigResponse => {
  return [
    7,
    (idx: number) => `t${idx + 1}.png`,
    (images: Image[]) => {
      const configs: Config[] = [
        { edges: ['ABA', 'ABA', 'ABA', 'ABA'], skipSelf: true },
        { edges: ['ACA', 'ABA', 'ACA', 'ABA'] },
        { edges: ['ACA', 'ABA', 'ACA', 'ABA'] },
        { edges: ['AAA', 'AAA', 'ACA', 'AAA'], skipSelf: true },
        { edges: ['ABA', 'AAA', 'ACA', 'AAA'] },
        { edges: ['ACA', 'ACA', 'AAA', 'AAA'] },
        { edges: ['ABA', 'ABA', 'ABA', 'AAA'] },
      ]

      return getTiles(configs, images)
    },
  ]
}
