import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCat, sortCat } from '../redux/feature/catSlice';
import { Icon } from '@iconify/react';

const Header = ({ name }) => {

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState("");

    // 0: unsorted, 1: ascending, 2: descending
    const [sortState, setSortState] = useState(0);

    const search = (event) => {
        event.preventDefault()
        switch (name) {
            case "Cat":
                dispatch(searchCat(keyword))
                break
            default:
                break
        }
    }

    const changeSort = () => {
        const newState = sortState == 0 ? 1 : 3 - sortState
        setSortState(newState)
        switch (name) {
            case "Cat":
                dispatch(sortCat(sortState))
                break
            default:
                break
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
            <div class="container-fluid">
                <div style={{ height: "2rem" }} className='d-flex align-content-center justify-content-center'>
                    <p className='m-0 fs-2' style={{ lineHeight: "2rem", textAlign: "center" }}>{name}</p>
                    <Icon onClick={changeSort}
                        style={{ display: name == "Covid" ? "none" : "block" }}
                        icon={`${sortState == 0 ? "carbon:caret-sort" : sortState == 1 ? "carbon:caret-sort-down" : "carbon:caret-sort-up"}`} className='fs-2 ms-2' />
                </div>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        onChange={(event) => { setKeyword(event.target.value) }}
                    />
                    <button class="btn btn-outline-success" onClick={search}>Search</button>
                </form>
            </div>
        </nav >
    );
}

export default Header;
