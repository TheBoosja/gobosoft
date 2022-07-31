import { ReactElement, useRef, useState } from 'react'
import { useOnClickOutside } from '../../common/hooks'
import NavItem, { INavItem } from './NavItem'

export interface INavDropdown {
  to: string
  label: string
  children: ReactElement<INavItem>[]
}

const NavDropdown = ({ to, label, children }: INavDropdown) => {
  const ref = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const classNames = 'absolute min-w-max right-0 bg-zinc-900'
  const isOpenClassNames = isOpen ? ' block' : ' hidden'

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
    return false
  }
  useOnClickOutside(ref, () => setIsOpen(!isOpen), isOpen)

  const configureChildren = (child: ReactElement<INavItem>) => ({
    ...child,
    props: {
      ...child.props,
      to: `${to}/${child.props.to}`,
      onClick: () => {
        setIsOpen(false)
        return true
      },
    },
  })

  return (
    <div ref={ref} className='relative'>
      <NavItem to={to} label={label} onClick={onDropdownClick} />
      <div className={classNames + isOpenClassNames}>
        {children.map(configureChildren)}
      </div>
    </div>
  )
}

export default NavDropdown
