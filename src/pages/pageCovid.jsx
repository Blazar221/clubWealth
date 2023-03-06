import React, { useEffect } from 'react';
import PositiveCasesTilemap from '../components/covid/positiveCasesTilemap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/feature/covidSlice';

const PageCovid = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid.status);
    const error = useSelector((state) => state.covid.error);
    const data = useSelector((state) => state.covid.data);
    const date = useSelector((state) => state.covid.date);
    debugger
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchData());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>loading</div>
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }


    return <div className="container">
        <div className="row">
            <div className="col-6">
                <PositiveCasesTilemap data={data} date={date} />
            </div>
        </div>
    </div>

}

export default PageCovid;
