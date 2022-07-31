import {useState} from 'react'
import {Provider} from 'react-redux'
import {HistoryRouter as Router} from 'redux-first-history/rr6'
import {Navigate, Route, Routes} from 'react-router-dom'

import {store, history} from './store'

import Navbar from './components/navbar'
import Home from './routes/Home'
import Sketches from './routes/Sketches'
import QuadTreeSketch from './sketches/quad-tree'
import WaveFunctionCollapse from './sketches/wave-function-collapse'
import GameOfLife from './sketches/game-of-life'
import Calendar from './sketches/calendar'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className='dark:bg-zinc-800 dark:text-slate-200 h-screen overflow-auto'>
          <Navbar />

          <Routes>
            <Route path='*' element={<h1>404 Not Found</h1>} />

            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<div>Coming...</div>} />
            <Route path='/about' element={<div>Coming...</div>} />

            <Route path='/sketches/*' element={<Sketches />}>
              <Route index element={<Navigate to='game-of-life' replace />} />
              <Route path='wave-function-collapse' element={<WaveFunctionCollapse />} />
              <Route path='quad-tree' element={<QuadTreeSketch />} />
              <Route path='game-of-life' element={<GameOfLife />} />
              <Route path='calendar' element={<Calendar />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
