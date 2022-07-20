import { useState } from 'react';
import GameOfLife from './sketches/game-of-life';
import QuadTreeSketch from './sketches/quad-tree';
import WaveFunctionCollapse from './sketches/wave-function-collapse';

type Sketches = 'wave' | 'quad' | 'life';

const App = () => {
	const [sketch, setSketch] = useState<Sketches>('life');

	const switchSketch = () => {
		let newSketch: Sketches;
		switch (sketch) {
			case 'wave':
				newSketch = 'quad';
				break;
			case 'quad':
				newSketch = 'life';
				break;
			case 'life':
				newSketch = 'wave';
				break;
		}

		setSketch(newSketch);
	};

	return (
		<div>
			{sketch === 'wave' && <WaveFunctionCollapse />}
			{sketch === 'quad' && <QuadTreeSketch />}
			{sketch === 'life' && <GameOfLife />}

			<button onClick={switchSketch}>Switch</button>
		</div>
	);
};

export default App;
