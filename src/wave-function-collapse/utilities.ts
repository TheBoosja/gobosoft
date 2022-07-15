import { P5CanvasInstance } from 'react-p5-wrapper';
import Tile from './models/Tile';

export const removeDuplicateTiles = (tiles: Tile[]) => {
	const tileSet: { [key: string]: Tile } = {};

	let i = 0;
	for (const tile of tiles) {
		const key = tile.index + tile.edges.join(',');
		if (tileSet[key] === undefined) {
			tileSet[key] = tile;
		}
	}

	return Object.values(tileSet);
};

export const printTiles = (tiles: Tile[], isSimple = false) => {
	let print: any[] = tiles.map((t) => t.toString(tiles));

	if (isSimple) {
		print = print.map((p) => p.edges);
	}

	return print;
};

export const withRotatedTilesFromP5 =
	(p5: P5CanvasInstance) => (tiles: Tile[]) => {
		const initialTileCount = tiles.length;
		for (let i = 0; i < initialTileCount; i++) {
			for (let j = 0; j < 4; j++) {
				tiles.push(tiles[i].rotate(p5, j));
			}
		}

		return removeDuplicateTiles(tiles);
	};

export const random = <T>(items: T[]): T => {
	return items[Math.floor(Math.random() * items.length)];
};

export type XY = [x: number, y: number];
export const getCoordFromIndex = (index: number, dimension: number): XY => {
	const x = index % dimension;
	const y = Math.floor(index / dimension);
	return [x, y];
};
