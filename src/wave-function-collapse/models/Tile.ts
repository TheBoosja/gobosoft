import {Graphics, Image} from "p5";
import {P5CanvasInstance} from "react-p5-wrapper";

export type Edges = [string, string, string, string];

export default class Tile {
  index: number;
  skipSelf: boolean = false;
  image: Image | Graphics;
  edges: Edges;
  validUps: number[];
  validRights: number[];
  validDowns: number[];
  validLefts: number[];

  constructor(index: number, image: Image | Graphics, edges: Edges, skipSelf?: boolean) {
    this.index = index;
    this.skipSelf = !!skipSelf;
    this.image = image;
    this.edges = edges;
    this.validUps = [];
    this.validRights = [];
    this.validDowns = [];
    this.validLefts = [];
  }

  get up() {
    return this.edges[0];
  }
  get right() {
    return this.edges[1];
  }
  get down() {
    return this.edges[2];
  }
  get left() {
    return this.edges[3];
  }

  analyze = (tiles: Tile[]) => {
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];

      if (this.skipSelf === true && this.index === tile.index) {
        continue;
      }

      if (this.compareEdges(this.up, tile.down)) {
        this.validUps.push(i);
      }

      if (this.compareEdges(this.right, tile.left)) {
        this.validRights.push(i);
      }

      if (this.compareEdges(this.down, tile.up)) {
        this.validDowns.push(i);
      }

      if (this.compareEdges(this.left, tile.right)) {
        this.validLefts.push(i);
      }
    }
  };

  private reverseString = (str: string) => {
    return str.split('').reverse().join('');
  };
  private compareEdges = (a: string, b: string) => {
    return a === this.reverseString(b);
  };

  rotate = (p5: P5CanvasInstance, num: number) => {
    const w = this.image.width;
    const h = this.image.height;
    const newImg = p5.createGraphics(w, h);
    newImg.imageMode(p5.CENTER);
    newImg.translate(w / 2, h / 2);
    newImg.rotate(p5.HALF_PI * num);
    newImg.image(this.image, 0, 0);

    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      let edge = this.edges[(i - num + len) % len]

      //if (this.shouldReverse(num, i)) {
      //  edge = this.reverseString(edge)
      //}

      newEdges[i] = edge;
    }

    return new Tile(this.index, newImg, newEdges as Edges, this.skipSelf);
  };

  shouldReverse = (num: number, i: number) => {
    const val = `${num}${i}`
    switch (val) {
      case '10':
      case '12':

      case '20':
      case '21':
      case '22':
      case '23':

      case '31':
      case '33':
        return true
      default:
        return false
    }
  }

  toString(tiles: Tile[]) {
    return {
      edges: this.edges.join(','),
      up: this.validUps.map((idx) => tiles[idx].edges.join(',')),
      right: this.validRights.map((idx) => tiles[idx].edges.join(',')),
      down: this.validDowns.map((idx) => tiles[idx].edges.join(',')),
      left: this.validLefts.map((idx) => tiles[idx].edges.join(',')),
    };
  }
}
