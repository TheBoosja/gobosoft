import { ReactElement, ReactNode, StrictMode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './routes/Home'
import Sketches from './routes/Sketches'
import QuadTreeSketch from './sketches/quad-tree'
import WaveFunctionCollapse from './sketches/wave-function-collapse'
import GameOfLife from './sketches/game-of-life'
import Calendar from './sketches/calendar'

const SM = ({ el }: { el: ReactNode }) => <StrictMode>{el}</StrictMode>

const ConditionalStrictModeRoutes = ({
  children,
}: {
  children: ReactElement<typeof Route>[]
}) => {
  // TODO
  return <Routes>{children}</Routes>
}

function App() {
  return (
    <div className='dark:bg-zinc-800 dark:text-slate-200 h-screen overflow-auto'>
      <StrictMode>
        <Navbar />
      </StrictMode>

      <ConditionalStrictModeRoutes>
        <Route path='*' element={<SM el={<h1>404 Not Found</h1>} />} />

        <Route path='/' element={<SM el={<Home />} />} />
        <Route path='/blog' element={<SM el={<div>Coming...</div>} />} />
        <Route path='/about' element={<SM el={<div>Coming...</div>} />} />

        <Route path='/sketches/*' element={<Sketches />}>
          <Route index element={<Navigate to='game-of-life' replace />} />
          <Route
            path='wave-function-collapse'
            element={<WaveFunctionCollapse />}
          />
          <Route path='quad-tree' element={<QuadTreeSketch />} />
          <Route path='game-of-life' element={<GameOfLife />} />
          <Route path='calendar' element={<Calendar />} />
        </Route>
      </ConditionalStrictModeRoutes>
    </div>
  )
}

export default App
