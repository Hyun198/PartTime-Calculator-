import axios from 'axios';
import { useState } from 'react';


const serviceKey = process.env.REACT_APP_BUS_API_KEY;
const format = "json";

const useBusInfo = () => {
    const fetchBusInfo = async (keyword) => {
        const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteListv2?serviceKey=${encodeURIComponent(serviceKey)}&keyword=${keyword}&format=${format}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    accept: "application/json",
                },
            });
            console.log(response);
            const routeIds = response.data.response.msgBody.busRouteList.filter(
                (route) => route.adminName === "경기도 김포시"
            );
            return routeIds[0].routeId;
        } catch (error) {
            console.error("Error fetching bus code:", error);
            return null;
        }
    }
    return { fetchBusInfo };
}




export default useBusInfo;

