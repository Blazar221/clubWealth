import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from "react-redux";
import { removeCat } from "../redux/feature/catSlice"

const CatCard = ({ url, catId }) => {

    const dispatch = useDispatch()

    const dislike = (itemId) => {
        dispatch(removeCat(itemId))
    }

    return (
        <div className="card cw-card p-0 m-1" style={{ width: "320px" }}>
            <div className='cw-card-dislike' onClick={() => dislike(catId)}>
                <Icon icon="mdi:heart-off-outline" className='text-light fs-2' />
            </div>
            <img src={url} className="card-img-top" alt={catId}
                style={{ minWidth: "100%", maxWidth: "100%", minHeight: "20rem", maxHeight: "20rem" }}
            />
            <div className="card-body">
                <h5 className="card-title">{catId}</h5>
            </div>
        </div>
    );
}

export default CatCard;
