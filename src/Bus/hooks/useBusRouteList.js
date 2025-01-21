import axios from 'axios';
import { useState } from 'react';

const serviceKey = process.env.REACT_APP_BUS_API_KEY;

const useBusRouteList = () => {
    const [stations, setStations] = useState([]);
    const [error, setError] = useState(null);


    const fetchBusRoute = async (routeId) => {
        try {
            const url = `/6410000/busstationservice/v2/getBusStationList?serviceKey=${serviceKey}&routeId=${routeId}`;
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            });
            console.log("fetch bus route", response);


        } catch (error) {
            console.error('error busRouteList', error);
            setError(error.message);
        }

    };
    return { stations, error, fetchBusRoute }
}

export default useBusRouteList;