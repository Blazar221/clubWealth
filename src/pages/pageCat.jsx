import React, { useState, useEffect } from 'react';
import CatCard from '../components/catCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/feature/catSlice';

const PageCat = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cat.data);
    const status = useSelector((state) => state.cat.status);
    const error = useSelector((state) => state.cat.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchData());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div>
            {data ? <div>
                <div className='container d-flex flex-wrap align-items-center justify-content-around'>
                    <div className='row w-100 d-flex justify-content-evenly'>
                        {data.map((item) => {
                            return <div className='col-12 col-lg-4 d-flex justify-content-center'>
                                <CatCard url={item.url} catId={item.id} />
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
            </div> : <p>no data</p>}
        </div>
    );
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     cats.get100Cats().then((response) => {
    //         console.log("response", response);
    //         setData(response);
    //     });
    // }, []);

    // return (
    //     <div>
    //         <div className='container d-flex flex-wrap align-items-center justify-content-around'>
    //             <div className='row w-100 d-flex justify-content-evenly'>
    //                 {data.map((item) => {
    //                     return <div className='col-12 col-lg-4 d-flex justify-content-center'>
    //                         <CatCard url={item.url} catId={item.id} />
    //                     </div>
    //                 })}
    //             </div>
    //         </div>
    //         <nav className='w-25 mx-auto my-3'>
    //             <ul class="pagination">
    //                 <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //                 <li class="page-item"><a class="page-link" href="#">1</a></li>
    //                 <li class="page-item"><a class="page-link" href="#">2</a></li>
    //                 <li class="page-item"><a class="page-link" href="#">3</a></li>
    //                 <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //             </ul>
    //         </nav>
    //     </div>
    // );
}

export default PageCat;
