import React, { useEffect } from 'react';
import Intro from '../components/starwars/intro';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchPeopleData, fetchPlanetsData, fetchStarshipsData } from '../redux/feature/starwarsSlice';
import ContentPage from '../components/starwars/contentPage';

const PageStarwars = () => {

    const dispatch = useDispatch();
    const page = useSelector((state) => state.starwars.page);
    const peopleStatus = useSelector((state) => state.starwars.peopleStatus);
    const planetsStatus = useSelector((state) => state.starwars.planetsStatus);
    const starshipsStatus = useSelector((state) => state.starwars.starshipsStatus);
    const data = useSelector((state) => state.starwars.data);


    useEffect(() => {
        if (peopleStatus === 'idle') {
            dispatch(fetchPeopleData());
        }
        if (planetsStatus === 'idle') {
            dispatch(fetchPlanetsData());
        }
        if (starshipsStatus === 'idle') {
            dispatch(fetchStarshipsData());
        }
    }, [dispatch, peopleStatus, planetsStatus, starshipsStatus]);

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
                page == "Home" ? <Intro /> : <ContentPage data={data} />
            }
        </div>
    );
}

export default PageStarwars;
