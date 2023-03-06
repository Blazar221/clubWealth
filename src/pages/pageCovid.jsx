import React, { useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PositiveCasesTilemap from '../components/covid/positiveCasesTilemap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDate } from '../redux/feature/covidSlice';

const PageCovid = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid.status);
    const error = useSelector((state) => state.covid.error);
    const data = useSelector((state) => state.covid.data);
    const date = useSelector((state) => state.covid.date);

    const PST_OFFSET = 'T00:00:00-08:00'
    const startDate = new Date("2020-01-13" + PST_OFFSET);
    const endDate = new Date("2021-03-07" + PST_OFFSET);
    const chosenDate = new Date((date + "").slice(0, 4) + "-" + (date + "").slice(4, 6) + "-" + (date + "").slice(6) + PST_OFFSET)

    const handleSelect = (val) => {
        const newDate = val.getFullYear() * 10000 + (val.getMonth() + 1) * 100 + val.getDate()
        dispatch(setDate(newDate))
    }

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
                <DatePicker
                    selected={chosenDate}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    onSelect={handleSelect}
                />
                <PositiveCasesTilemap data={data} date={date} />
            </div>
        </div>
    </div>

}

export default PageCovid;
