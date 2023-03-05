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
    let pagesArray;
    debugger

    switch (pages) {
        case 1:
            pagesArray = [0]
            break
        case 2:
            pagesArray = [0, 1]
            break
        case 3:
            pagesArray = [0, 1, 2]
            break
        default:
            pagesArray = curPage == 0 ? [0, 1, 2] : curPage == pages - 1 ? [curPage - 2, curPage - 1, curPage] : [curPage - 1, curPage, curPage + 1]
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchData());
        }
    }, [dispatch, status]);

    const changePage = (p) => {
        dispatch(setPage(p))
    }

    if (status === 'loading') {
        return <div>
            <div className='container d-flex flex-wrap align-items-center justify-content-around'>
                <div className='row w-100 d-flex justify-content-evenly'>
                    <div className='col-12 col-lg-4 d-flex justify-content-center'>
                        <CatCard />
                    </div>
                    <div className='col-12 col-lg-4 d-flex justify-content-center'>
                        <CatCard />
                    </div>
                    <div className='col-12 col-lg-4 d-flex justify-content-center'>
                        <CatCard />
                    </div>
                </div>
            </div>
            <nav className='w-25 mx-auto my-3'>
                <ul class="pagination">
                    <li class="page-item" ><p style={{ cursor: "pointer" }} class="page-link m-0">First</p></li>
                    <li class="page-item" >
                        <p style={{ cursor: "pointer" }} class="page-link m-0">1</p>
                    </li>
                    <li class="page-item" ><p style={{ cursor: "pointer" }} class="page-link m-0">Last</p></li>
                </ul >
            </nav >
        </div >;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <div>
            {curPageData?.length > 0 ? <div>
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
                        <li class="page-item" onClick={() => changePage(0)}><p style={{ cursor: "pointer" }} class="page-link m-0">First</p></li>
                        {
                            pagesArray.map(pageIdx => {
                                return <li class="page-item" onClick={() => changePage(pageIdx)}>
                                    <p style={{ cursor: "pointer" }} class={`page-link m-0 ${pageIdx == curPage ? "text-light" : ""}`}>{pageIdx + 1}</p>
                                </li>
                            })
                        }
                        <li class="page-item" onClick={() => changePage(pages - 1)}><p style={{ cursor: "pointer" }} class="page-link m-0">Last</p></li>
                    </ul>
                </nav>
            </div > : <h1>Oops, there is no data</h1>}
        </div >
    );
}

export default PageCat;
