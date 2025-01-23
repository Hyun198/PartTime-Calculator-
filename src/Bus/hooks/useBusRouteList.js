import axios from 'axios';
import { useState } from 'react';

const serviceKey = process.env.REACT_APP_BUS_API_KEY;
const format = 'json';
const useBusRouteList = () => {
    const [stations, setStations] = useState([]);
    const [error, setError] = useState(null);


    const fetchBusRoute = async (routeId) => {
        try {
            const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteStationListv2?serviceKey=${encodeURIComponent(serviceKey)}&routeId=${routeId}&format=${format}`;
            const response = await axios.get(url, {
                headers: {
                    'accept': 'application/json', // 응답 형식 지정
                }
            });

            const busRouteStationList = response.data.response.msgBody.busRouteStationList;
            if (!busRouteStationList || busRouteStationList.length === 0) {
                throw new Error('No bus route station data');
            }

            const stationData = busRouteStationList.map((station) => ({
                stationId: station.stationId || 'Unknown',
                stationName: station.stationName || 'Unknown',
                position: station.x && station.y ? [parseFloat(station.y), parseFloat(station.x)] : null, // [latitude, longitude] 형식
            }));

            setStations(stationData);


        } catch (error) {
            console.error('error busRouteList', error);
            setError(error.message);
        }

    };
    return { stations, error, fetchBusRoute }
}

export default useBusRouteList;