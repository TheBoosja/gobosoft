import { useState } from 'react';
import QuadTreeSketch from './quad-tree';
import WaveFunctionCollapse from './wave-function-collapse';

const App = () => {
	const [sketch, setSketch] = useState('wave');
	return (
		<div>
			{sketch === 'wave' && <WaveFunctionCollapse />}
			{sketch === 'quad' && <QuadTreeSketch />}
		</div>
	);
};

export default App;
