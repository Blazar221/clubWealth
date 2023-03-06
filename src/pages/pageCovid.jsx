import React, { useEffect } from 'react';
import PositiveCasesTilemap from '../components/covid/positiveCasesTilemap';
import TopProbChart from '../components/covid/topProbChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/feature/covidSlice';

const PageCovid = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid.status);
    const error = useSelector((state) => state.covid.error);
    const data = useSelector((state) => state.covid.data);
    const date = useSelector((state) => state.covid.date);

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
            <div className="col-12 col-md-8">
                <div className="card cw-card m-2">
                    <PositiveCasesTilemap data={data} date={date} />
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="card cw-card m-2">
                    <TopProbChart data={data} date={date} />
                </div>
            </div>
        </div>
    </div>

}

export default PageCovid;
