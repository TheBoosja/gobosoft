import { Image } from 'p5';
import { useEffect, useState } from 'react';
import { ReactP5Wrapper, Sketch } from 'react-p5-wrapper';
import { getSetupV0, getSetupV1, getSetupV2, ConfigResponse } from './config';
import { Tile, Grid, Framerate } from './models';
import { withRotatedTilesFromP5 } from './utilities';

const setups = [() => getSetupV0(), () => getSetupV1(), () => getSetupV2()];

const sketch =
	(isOptimized: boolean): Sketch =>
	(p5) => {
		const DIMENSION = 32;
		const SIZE = 800;

		const tileImgs: Image[] = [];
		let tiles: Tile[] = [];
		let grid: Grid | null = null;
		const config: ConfigResponse = setups[0]();

		Grid.DEBUG = false;
		Grid.TEST = false;
		// Logs framerate
		Framerate.enable(false);

		p5.preload = () => {
			const [imageCount, getPath] = config;
			for (let i = 0; i < imageCount; i++) {
				tileImgs.push(p5.loadImage(`assets/${getPath(i)}`));
			}
		};

		p5.setup = () => {
			p5.createCanvas(SIZE, SIZE);

			const getInitialTiles = config[2];
			const initialTiles = getInitialTiles(tileImgs);
			const withRotatedTiles = withRotatedTilesFromP5(p5);
			tiles = withRotatedTiles(initialTiles);

			for (const tile of tiles) {
				tile.analyze(tiles);
			}

			grid = new Grid(DIMENSION, tiles);

			// p5.noLoop();
		};

		p5.mousePressed = () => {
			grid!.reset();
			// p5.redraw();
		};

		p5.draw = () => {
			p5.background('#d6d6d6');

			grid!.draw(p5);
			if (isOptimized) {
				grid!.updateOptimized();
			} else {
				grid!.update();
			}
		};
	};

const WaveFunctionCollapse = () => {
	const [isOptimized, setOptimized] = useState(true);

	useEffect(() => {
		return () => Framerate.clear();
	}, []);

	return (
		<div>
			<button onClick={() => setOptimized(!isOptimized)}>
				{isOptimized ? 'Normal' : 'Optimized'}
			</button>
			<div>
				<div>{isOptimized ? 'Optimized' : 'Normal'}</div>
				<ReactP5Wrapper sketch={sketch(isOptimized)} />
			</div>
		</div>
	);
};

export default WaveFunctionCollapse;
