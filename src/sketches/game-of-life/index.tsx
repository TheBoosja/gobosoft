import {ReactP5Wrapper, Sketch} from 'react-p5-wrapper';
import {useTitle} from '../../ducks/page';

const make2DArray = (dimension: number): number[] => {
  return new Array(dimension * dimension).fill(0);
};

const sketch: Sketch = (p5) => {
  const dimension = 150;
  let grid: number[];
  //let gridOld: number[];

  const getCell = (grd: number[], x: number, y: number) => {
    return grd[x + y * dimension];
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800);
    canvas.mousePressed(() => {
      grid = make2DArray(dimension).map(() => Math.floor(p5.random(2)));
    })

    //gridOld = make2DArray(dimension);
    grid = make2DArray(dimension).map(() => Math.floor(p5.random(2)));

    // p5.noLoop();
  };

  p5.draw = () => {
    p5.background(0);

    const w = p5.width / dimension;
    const h = p5.height / dimension;

    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        const cell = getCell(grid, x, y);
        //const cellOld = getCell(gridOld, x, y);
        if (cell === 1) {
          p5.fill('green');
          p5.noStroke();
          p5.rect(x * w, y * h, w - 1, h - 1);
        }
        // if (cellOld === 1) {
        // 	p5.fill('white');
        // 	p5.circle(x * w + w / 2, y * h + h / 2, 10);
        // }

        // console.log(`(${x},${y}): ${cellOld} -> ${cell}`);
      }
    }

    const nextGen = make2DArray(dimension);

    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const nx = x + j;
            const ny = y + i;

            if (nx < 0 || ny < 0 || nx >= dimension || ny >= dimension) {
              continue;
            }
            if (nx === x && ny === y) {
              continue;
            }

            const neighbor = getCell(grid, nx, ny);
            if (neighbor === 1) {
              count++;
            }
          }
        }

        const cell = getCell(grid, x, y);
        if (cell === 1 && (count === 2 || count === 3)) {
          nextGen[x + y * dimension] = 1;
          continue;
        }

        if (cell === 0 && count === 3) {
          nextGen[x + y * dimension] = 1;
          continue;
        }

        nextGen[x + y * dimension] = 0;
      }
    }

    //gridOld = grid;
    grid = nextGen;
  };
};

const GameOfLife = () => {
  useTitle('Game of Life')

  return (
    <>
      <div className='grid grid-flow-col'>
        <div className='justify-self-end self-end p-1 mr-2'>Click for refresh...</div>
      </div>
      <ReactP5Wrapper sketch={sketch} />;
    </>
  )
};

export default GameOfLife;
