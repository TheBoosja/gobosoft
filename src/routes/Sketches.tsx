import {Outlet} from 'react-router-dom';

const Sketches = () => {
  return (
    <div className='w-[50rem] mx-auto'>
      <Outlet />
    </div>
  )
}

export default Sketches
