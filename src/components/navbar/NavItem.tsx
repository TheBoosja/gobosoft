import { useLocation, useNavigate } from 'react-router-dom'

export interface INavItem {
  to: string
  label: string
  /**
   * @Return Should navigate to {to}
   */
  onClick?: () => boolean
  end?: boolean
}

const NavItem = ({ to, label, onClick, end }: INavItem) => {
  const navigate = useNavigate()
  const location = useLocation()

  const itemClassNames = 'p-2 hover:text-zinc-600 cursor-pointer'
  const activeClassNames = itemClassNames + ' text-zinc-600'

  const isActive = end
    ? location.pathname === to
    : location.pathname.startsWith(to)

  const onItemClick = () => {
    console.log('safs', onClick)
    if (!onClick || onClick()) {
      navigate(to)
    }
  }

  return (
    <div
      className={isActive ? activeClassNames : itemClassNames}
      onClick={onItemClick}
    >
      {label}
    </div>
  )
}

export default NavItem
