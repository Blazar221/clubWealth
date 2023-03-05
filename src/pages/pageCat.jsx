import React, { useState, useEffect } from 'react';
import CatCard from '../components/catCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setPage } from '../redux/feature/catSlice';

const PageCat = () => {
    const dispatch = useDispatch();
    const curPageData = useSelector((state) => state.cat.curPageData);
    const curPage = useSelector((state) => state.cat.curPage);
    const status = useSelector((state) => state.cat.status);
    const error = useSelector((state) => state.cat.error);
    const pages = useSelector((state) => state.cat.pages);
    const pagesArray = Array.from({ length: pages }, (_, index) => index);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchData());
        }
    }, [dispatch, status]);

    const changePage = (p) => {
        dispatch(setPage(p))
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div>
            {curPageData ? <div>
                <div className='container d-flex flex-wrap align-items-center justify-content-around'>
                    <div className='row w-100 d-flex justify-content-evenly'>
                        {curPageData.map((item) => {
                            return <div className='col-12 col-lg-4 d-flex justify-content-center'>
                                <CatCard url={item.url} catId={item.id} />
                            </div>
                        })}
                    </div>
                </div>
                <nav className='w-25 mx-auto my-3'>
                    <ul class="pagination">
                        <li class="page-item" onClick={() => changePage(Math.max(0, curPage - 1))}><p class="page-link m-0">Previous</p></li>
                        {
                            pagesArray.map(pageIdx => {
                                return <li class="page-item" onClick={() => changePage(pageIdx)}>
                                    <p class={`page-link m-0 ${pageIdx == curPage ? "text-light" : ""}`}>{pageIdx + 1}</p>
                                </li>
                            })
                        }
                        <li class="page-item" onClick={() => changePage(Math.min(pages - 1, curPage + 1))}><p class="page-link m-0">Next</p></li>
                    </ul>
                </nav>
            </div> : <p>no data</p>}
        </div>
    );
}

export default PageCat;
