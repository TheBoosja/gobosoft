import {Image} from "p5"
import Tile, {Edges} from "./models/Tile"

export type SetupResponse = [
  imageCount: number,
  getPath: (idx: number) => string,
  getInitialTiles: (images: Image[]) => Tile[]
]

type Config = {
  skipSelf?: boolean,
  edges: Edges
}

const getTiles = (configs: Config[], images: Image[]) => {
  return configs.map((config, i) => new Tile(i, images[i], config.edges, config.skipSelf))
}

export const getSetupBg = (): SetupResponse => {
  return [
    2,
    (idx) => `b${idx}.png`,
    (images) => {
      const configs: Config[] = [
        {edges: ['AABB', 'BBCC', 'CCDD', 'DDAA']},
        {edges: ['BBAA', 'AADD', 'DDCC', 'CCBB']},
      ]

      return getTiles(configs, images)
    }
  ]
}

export const getSetupV0 = (): SetupResponse => {
  return [
    13,
    (idx) => `circuit/${idx}.png`,
    (images) => {
      const configs: Config[] = [
        {edges: ['AAAAA', 'AAAAA', 'AAAAA', 'AAAAA']},
        {edges: ['BBBBB', 'BBBBB', 'BBBBB', 'BBBBB']},
        {edges: ['BBBBB', 'BCCCB', 'BBBBB', 'BBBBB']},
        {edges: ['BBBBB', 'BDDDB', 'BBBBB', 'BDDDB']},
        {edges: ['ABBBB', 'BCCCB', 'BBBBA', 'AAAAA']},
        {edges: ['ABBBB', 'BBBBB', 'BBBBB', 'BBBBA'], skipSelf: true},
        {edges: ['BBBBB', 'BCCCB', 'BBBBB', 'BCCCB']},
        {edges: ['BDDDB', 'BCCCB', 'BDDDB', 'BCCCB']},
        {edges: ['BDDDB', 'BBBBB', 'BCCCB', 'BBBBB']},
        {edges: ['BCCCB', 'BCCCB', 'BBBBB', 'BCCCB']},
        {edges: ['BCCCB', 'BCCCB', 'BCCCB', 'BCCCB']},
        {edges: ['BCCCB', 'BCCCB', 'BBBBB', 'BBBBB']},
        {edges: ['BBBBB', 'BCCCB', 'BBBBB', 'BCCCB']},
      ]

      return getTiles(configs, images)
    }
  ]
}

export const getSetupV1 = (): SetupResponse => {
  return [
    7,
    (idx) => `tile-${idx}.png`,
    (images) => {
      const configs: Config[] = [
        {edges: ['AAAAA', 'AAAAA', 'AAAAA', 'AAAAA']},
        {edges: ['AABAA', 'AABAA', 'AABAA', 'AABAA']},
        {edges: ['AABAA', 'AAAAA', 'AABAA', 'AAAAA']},
        {edges: ['AABAA', 'AABAA', 'AAAAA', 'AAAAA']},
        {edges: ['AABAA', 'AAAAA', 'ABCBA', 'AAAAA']},
        {edges: ['ABCBA', 'AABAA', 'ABCBA', 'AABAA']},
        {edges: ['ABCBA', 'ABCBA', 'ABCBA', 'AAAAA']},
      ]

      return getTiles(configs, images)
    }
  ]
}

export const getSetupV2 = (): SetupResponse => {
  return [
    7,
    (idx: number) => `t${idx + 1}.png`,
    (images: Image[]) => {
      const configs: Config[] = [
        {edges: ['AABAA', 'AABAA', 'AABAA', 'AABAA'], skipSelf: true},
        {edges: ['ABCBA', 'AABAA', 'ABCBA', 'AABAA']},
        {edges: ['ABCBA', 'AABAA', 'ABCBA', 'AABAA']},
        {edges: ['AAAAA', 'AAAAA', 'ABCBA', 'AAAAA'], skipSelf: true},
        {edges: ['AABAA', 'AAAAA', 'ABCBA', 'AAAAA']},
        {edges: ['ABCBA', 'ABCBA', 'AAAAA', 'AAAAA']},
        {edges: ['AABAA', 'AABAA', 'AABAA', 'AAAAA']},
      ]

      return getTiles(configs, images)
    }
  ]
}

