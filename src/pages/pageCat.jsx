import React, { useState, useEffect } from 'react';
import cats from '../APIs/cats';

const PageCat = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        cats.get100Cats().then((response) => {
            console.log("response", response);
            setData(response);
        });
    }, []);

    return (
        <div>
            <div className='container d-flex flex-wrap align-items-center justify-content-around'>
                <div className='row w-100 d-flex justify-content-evenly'>
                    {data.map((item) => {
                        return <div className='col-12 col-lg-4 d-flex justify-content-center'>
                            <div className="card cw-card p-0 m-1" style={{ width: "320px" }}>
                                <img src={item.url} className="card-img-top" alt={item.id}
                                    style={{ minWidth: "100%", maxWidth: "100%", minHeight: "20rem", maxHeight: "20rem" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.id}</h5>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <nav className='w-25 mx-auto my-3'>
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default PageCat;
