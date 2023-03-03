import React from 'react';
import { Link } from "react-router-dom";
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

    return (
        <div className='d-flex flex-column bg-info vh-100'>
            here
            {
                menuItem.map(data => {
                    return <Link to={data.link} className="text-light text-decoration-none p-2 fs-5 d-inline-flex gap-2 align-items-center">
                        <Icon icon={data.icon}></Icon>
                        <p className='m-0'>{data.title}</p>
                    </Link>
                })
            }
        </div>
    );
}

export default Sidebar;
