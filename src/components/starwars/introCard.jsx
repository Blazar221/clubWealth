import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/feature/starwarsSlice';

const IntroCard = ({ picUrl, introText, name }) => {

    const dispatch = useDispatch()

    const changePage = () => {
        switch (name) {
            case "Characters":
                dispatch(setPage("People"))
                break;
            case "Planets":
                dispatch(setPage("Planets"))
                break;
            case "Starships":
                dispatch(setPage("Starships"))
                break;
            default:
                break;
        }
    }

    return (
        <div className="col-12 col-md-4 mt-2">
            <div class="card cw-card cw-starwars-card">
                <img src={picUrl} class="card-img-top" style={{ height: "11.5rem" }} alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{introText}</p>
                    <a href="#" class="btn btn-primary cw-starwars-card-btn"
                        onClick={changePage}
                    >Let's Go!</a>
                </div>
            </div>
        </div>
    );
}

export default IntroCard;
