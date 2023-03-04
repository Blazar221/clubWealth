import React from 'react';
import { Icon } from '@iconify/react';

const CatCard = ({ url, catId }) => {
    return (
        <div className="card cw-card p-0 m-1" style={{ width: "320px" }}>
            <div className='cw-card-dislike'>
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
