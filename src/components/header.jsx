import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCat, sortCat } from '../redux/feature/catSlice';
import { search, sortData } from '../redux/feature/starwarsSlice';
import { Icon } from '@iconify/react';
// Covid
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate } from '../redux/feature/covidSlice';

const Header = ({ name }) => {

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState("");

    // 0: unsorted, 1: ascending, 2: descending
    const [sortState, setSortState] = useState(0);

    const date = useSelector((state) => state.covid.date);

    const PST_OFFSET = 'T00:00:00-08:00'
    const startDate = new Date("2020-01-13" + PST_OFFSET);
    const endDate = new Date("2021-03-07" + PST_OFFSET);
    const chosenDate = new Date((date + "").slice(0, 4) + "-" + (date + "").slice(4, 6) + "-" + (date + "").slice(6) + PST_OFFSET)

    const handleSelect = (val) => {
        const newDate = val.getFullYear() * 10000 + (val.getMonth() + 1) * 100 + val.getDate()
        dispatch(setDate(newDate))
    }

    const handleSearch = (event) => {
        event.preventDefault()
        switch (name) {
            case "Cat":
                dispatch(searchCat(keyword))
                break
            case "Starwars":
                dispatch(search(keyword))
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
            case "Starwars":
                dispatch(sortData(sortState))
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
                {
                    name == "Covid" ?
                        <div className='m-2 d-flex align-items-center' style={{ height: "2.5rem" }}>
                            <p className="m-0 me-2 cw-search-btn" style={{ whiteSpace: "nowrap", lineHeight: "2.5rem", textAlign: "center" }}>Choose the date:</p>
                            <DatePicker
                                className='cw-search-bar'
                                selected={chosenDate}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                maxDate={endDate}
                                dateFormat="yyyy-MM-dd"
                                onSelect={handleSelect}
                            />
                        </div> : <form class="d-flex">
                            <input class="form-control me-2 cw-search-bar" type="search" placeholder="Search" aria-label="Search"
                                onChange={(event) => { setKeyword(event.target.value) }}
                            />
                            <button class="btn btn-outline-success cw-search-btn" onClick={handleSearch}>Search</button>
                        </form>
                }
            </div>
        </nav >
    );
}

export default Header;
