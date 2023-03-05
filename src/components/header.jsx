import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCat } from '../redux/feature/catSlice';

const Header = ({ name }) => {

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState("");

    const search = (event) => {
        event.preventDefault()
        console.log("search")
        switch (name) {
            case "Cat":
                dispatch(searchCat(keyword))
                break
            default:
                break
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
            <div class="container-fluid">
                <h2>{name}</h2>
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
