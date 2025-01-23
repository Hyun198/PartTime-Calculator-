import React, { useState } from 'react'
import axios from 'axios'

const serviceKey = process.env.REACT_APP_BUS_API_KEY;
const format = 'json';
const useStationArrive = () => {

    const [arrivals, setArrivals] = useState([]);
    const [hasArrivals, setHasArrivals] = useState(true);

    const fetchArrive = async (stationId) => {
        try {
            const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${encodeURIComponent(serviceKey)}&stationId=${stationId}&format=${format}`;
            const response = await axios.get(url, {
                headers: {
                    'accept': 'application/json', // 응답 형식 지정
                }
            });
            const busArrivalLists = response.data.response.msgBody.busArrivalList;
            if (busArrivalLists.length === 0) {
                setHasArrivals(false);
                setArrivals([]);
                return;
            }
            if (!busArrivalLists || busArrivalLists.length === 0) {
                setHasArrivals(false);
                setArrivals([]);
                return;
            }

            // predictTime1이 빈 문자열이 아닌 데이터만 필터링
            const filteredArrivalLists = busArrivalLists.filter(
                (busArrival) => busArrival.predictTime1 && busArrival.predictTime1 !== ""
            );

            // 필터링 후 데이터가 없는 경우 처리
            if (filteredArrivalLists.length === 0) {
                setHasArrivals(false);
                setArrivals([]);
                return;
            }

            const arrivalData = filteredArrivalLists.map((busArrival) => ({
                routeId: busArrival.routeId || 'Unknown',
                routeName: busArrival.routeName || 'Unknown',
                predictTime1: busArrival.predictTime1 || 'Unknown',
                remainSeatCnt1: busArrival.remainSeatCnt1 || 'Unknown',
            }));
            setHasArrivals(true);
            setArrivals(arrivalData);
        } catch (error) {
            console.error("버스 도착정보 에러", error);
            setHasArrivals(false);
            setArrivals([]);
        }
    }


    return { arrivals, fetchArrive };
}

export default useStationArrive