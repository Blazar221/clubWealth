import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';

const Sidebar = () => {

    const menuItem = [
        {
            title: "Cat",
            link: "/cat",
            icon: "mdi:cat"
        },
        {
            title: "Covid",
            link: "/covid",
            icon: "mdi:virus"
        },
        {
            title: "Starwars",
            link: "/",
            icon: "game-icons:spaceship"
        },
    ]

    const [isExpand, setIsExpand] = useState(true);

    const toggle = () => {
        setIsExpand(!isExpand)
    }

    return (
        <div className='cw-sidebar d-inline-flex flex-column bg-info vh-100 pt-2'
            style={{ width: isExpand ? "13.75rem" : "3.5rem", cursor: "pointer" }}
        >
            <div className='text-light text-decoration-none p-2 d-flex gap-2 fs-3 align-items-center position-relative'
                onClick={toggle}>
                <p className={`m-0 cw-sidebar-logo-link cw-sidebar-logo-link-${isExpand ? "expand" : "collapse"}`}>Club Wealth</p>
                <Icon className={`cw-sidebar-logo-icon cw-sidebar-logo-icon-${isExpand ? "expand" : "collapse"}`} icon="material-symbols:menu-rounded"></Icon>
            </div>
            {
                menuItem.map(data => {
                    return <NavLink to={data.link} className="cw-sidebar-nav text-decoration-none p-2 d-flex gap-2 align-items-center">
                        <Icon className="fs-4" style={{ minWidth: "2.5rem", zIndex: 3 }} icon={data.icon}></Icon>
                        <p className={`m-0 cw-sidebar-nav-link cw-sidebar-nav-link-${isExpand ? "expand" : "collapse"}`}>{data.title}</p>
                    </NavLink>
                })
            }
        </div>
    );
}

export default Sidebar;
