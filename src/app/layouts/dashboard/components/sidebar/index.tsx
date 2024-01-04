import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarProps } from './types'
import logo from './../../../../assets/images/logo.png'

const Sidebar = memo((props: SidebarProps) => {
    return (
        <aside
            className={`${
                props.sidebarStatus === 'expanded'
                    ? 'translate-x-[0]'
                    : props.sidebarStatus === 'collapsed'
                    ? '-translate-x-[280px]'
                    : ''
            } w-sidebar h-full fixed bg-blue-800 flex flex-col justify-between items-center border-r border-gray-100 shadow-sidebarShadow transition-transform duration-300`}
        >
            <div className="flex flex-col w-full">
                {/* logo */}
                <div className="mt-4 mb-6 px-8 h-20 flex justify-center w-full">
                    <img
                        src={logo}
                        alt="logo"
                        className="inline-block w-48 h-full pb-4 object-contain brightness-0 invert"
                    />
                </div>

                {/* menu */}
                <div>
                    <nav className="flex flex-col">
                        {props.navItems.map((item) => {
                            return (
                                <NavLink
                                    key={item.route}
                                    to={item.route}
                                    end={item.end}
                                    className={({ isActive }) => {
                                        return `flex items-center py-2 px-8 text-white transition-all duration-300 hover:bg-blue-900 ${
                                            isActive ? '!bg-blue-950 opacity-100' : 'opacity-80'
                                        }`
                                    }}
                                >
                                    <span
                                        className="material-symbols-rounded text-2xl text-inherit"
                                        dangerouslySetInnerHTML={{ __html: item.iconCode }}
                                    ></span>
                                    <span
                                        className={`block w-[calc(100%-32px)] pt-0.5 pl-3 text-sm capitalize leading-9 font-bold truncate transition-opacity text-inherit`}
                                    >
                                        {item.label}
                                    </span>
                                </NavLink>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    )
})

export default Sidebar
