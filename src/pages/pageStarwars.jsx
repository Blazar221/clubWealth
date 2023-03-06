import React from 'react';
import Intro from '../components/starwars/intro';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeopleData } from '../redux/feature/peopleSlice';
import { setPage } from '../redux/feature/starwarsSlice';
import PeoplePage from '../components/starwars/peoplePage';
import ContentPage from '../components/starwars/contentPage';

const PageStarwars = () => {

    const dispatch = useDispatch();
    const peopleData = useSelector((state) => state.people.data);
    const page = useSelector((state) => state.starwars.page);

    const levels = ["Home"]
    if (page !== "Home") {
        levels.push(page)
    }

    const changePage = (p) => {
        if (p !== page) {
            dispatch(setPage(p))
        }
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb p-1">
                    {
                        levels.map((item, index) => {
                            return <li
                                onClick={() => changePage(item)}
                                class={`breadcrumb-item ${index == levels.length - 1 ? 'active' : ""}`}>
                                <a style={{ cursor: "pointer" }}>{item}</a>
                            </li>
                        })
                    }
                </ol>
            </nav>
            {
                page == "Home" ? <Intro /> : <ContentPage />
            }
        </div>
    );
}

export default PageStarwars;
