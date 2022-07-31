import {useAppSelector} from '../../common/hooks'
import {selectTitle} from '../../ducks/page'
import NavDropdown from './NavDropdown'
import NavItem from './NavItem'

const Navbar = () => {
  const title = useAppSelector(selectTitle)

  return (
    <div className="flex justify-end pr-5 max-w-[50rem] mx-auto">
      <h2 className='mr-auto p-2 tracking-widest text-white'>{title}</h2>

      <NavItem to='/' label='Home' end />
      <NavItem to='/blog' label='Blog' />

      <NavDropdown to='/sketches' label='Sketches'>
        <NavItem to='calendar' label='Calendar' />
        <NavItem to='game-of-life' label='Game of Life' />
        <NavItem to='quad-tree' label='Quad Tree' />
        <NavItem to='wave-function-collapse' label='Wave Function Collapse' />
      </NavDropdown>

      <NavItem to='/about' label='About' />
    </div>
  )
}

export default Navbar

