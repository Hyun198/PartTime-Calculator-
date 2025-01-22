import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './Bus.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import useBusRouteList from "./hooks/useBusRouteList";
import useStationArrive from "./hooks/useStationArrive";

//내가 알고싶은 도착정보의 버스 번호를 검색
//검색한 버스의 routeId를 반환 받음. routeId를 통해 정류장 목록을 얻기 위해서
//routeId로 해당 노선의 모든 정류장들의 목록을 얻음.
//정류장 목록에서 원하는 정류장을 선택하면 해당 정류장에 도착하는 버스들의 목록을 얻을 수 있음.

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function Bus() {
    const serviceKey = process.env.REACT_APP_BUS_API_KEY;
    const format = 'json';

    const [keyword, setKeyword] = useState("");
    const [routeId, setRouteId] = useState(null);

    const [selectedStation, setSelectedStation] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const keywordInput = useRef(null);


    const [recent_numbers, setRecent_numbers] = useState([]);

    useEffect(() => {
        const stored_numbers = JSON.parse(localStorage.getItem("recent_numbers")) || [];
        setRecent_numbers(stored_numbers);
    }, [])


    const { stations, fetchBusRoute } = useBusRouteList(); // 해당 버스의 노선에 있는 모든 정류장들
    const { arrivals, fetchArrive } = useStationArrive(); // 선택한 정류장의 도착 예정 버스들

    const handleSearch = () => {
        const searchValue = keywordInput.current.value;
        if (searchValue === "") {
            setHasSearched(false);
            return;
        }
        setKeyword(searchValue);
        setHasSearched(true);
        save_recentNumber(searchValue);

    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }

    }


    //버스 노선정보 조회  (검색한 버스 번호의)
    const SearchBusCode = async (keyword) => {
        // URL을 작성할 때 인증키와 쿼리 매개변수 포함
        const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteListv2?serviceKey=${encodeURIComponent(serviceKey)}&keyword=${keyword}&format=${format}`;

        try {
            // API 요청 보내기
            const response = await axios.get(url, {
                headers: {
                    'accept': 'application/json', // 응답 형식 지정
                }
            });

            // 응답 데이터 출력
            console.log("Bus Route Response", response.data.response.msgBody);
            const routeIds = response.data.response.msgBody.busRouteList.filter(route => route.adminName === "경기도 김포시");
            return routeIds[0].routeId;


        } catch (error) {
            // 오류 발생 시 에러 메시지 출력
            console.error("Error fetching bus code:", error);
        }
    };

    const handleStationClick = async (stationId, stationName) => {
        setSelectedStation({ stationId, stationName });
        await fetchArrive(stationId);
    };

    const recent_search_number = (number) => {
        setKeyword(number);
        keywordInput.current.value = number;
        handleSearch();
    }

    const save_recentNumber = (number) => {
        const updatedSearches = [number, ...recent_numbers.filter(recent_number => recent_number !== number)].slice(0, 5);
        setRecent_numbers(updatedSearches);
        localStorage.setItem("recent_numbers", JSON.stringify(updatedSearches));
    }

    const delete_recent_number = (event, number) => {
        event.stopPropagation();
        const updatedNumbers = recent_numbers.filter((item) => item !== number);
        setRecent_numbers(updatedNumbers);
        localStorage.setItem('recent_numbers', JSON.stringify(updatedNumbers));

    };

    const sortedArrivals = [...arrivals].sort((a, b) => a.predictTime1 - b.predictTime1);

    useEffect(() => {
        const getBusCode = async () => {
            if (keyword) {
                const routeId = await SearchBusCode(keyword);
                if (routeId) {
                    setRouteId(routeId);
                }
            }
        };
        getBusCode();
    }, [keyword]);

    useEffect(() => {
        if (routeId) {
            fetchBusRoute(routeId); // 검색한 버스 노선의 경유 정류장들
        }
    }, [routeId]);

    useEffect(() => {
        if (recent_numbers.length > 0) {
            localStorage.setItem("recent_numbers", JSON.stringify(recent_numbers));
        }
    }, [recent_numbers]);



    return (
        <Container className="bus-container">
            <h2><span className="gimposi">김포시</span><br></br>실시간 버스 조회</h2>
            <div className="search-form">
                <input
                    type="text"
                    className="search-box"
                    ref={keywordInput}
                    placeholder="버스 번호 입력"
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /></button>

                <div className="recent_busNumbers_list">
                    {recent_numbers.map((number, index) =>
                        <div key={index} className="recent-search-item">
                            <div className="recent-search-btn" onClick={() => recent_search_number(number)}>
                                {number}
                                <div className="delete-btn" onClick={(e) => delete_recent_number(e, number)}>
                                    X
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>


            <Container>
                <Row>
                    <MapContainer center={[37.632174, 126.707150]} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[37.632174, 126.707150]} icon={redIcon}>
                            <Popup>cgv 김포한강</Popup>
                        </Marker>

                        {/* 검색 후 정류장들 마커 표시 */}
                        {stations.map(station => (
                            <Marker key={station.id} position={station.position}>
                                <Popup>
                                    <h5>{station.stationName}</h5>
                                    <Button variant="primary" onClick={() => handleStationClick(station.stationId, station.stationName)}>도착 정보 보기</Button>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Row>
            </Container>


            {hasSearched && (
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="bus-arrive">
                                <h2>{selectedStation?.stationName} <br></br>정류장 도착 도착 정보</h2>
                                {arrivals.length > 0 ? (
                                    <div className="bus-arrivals-carousel">
                                        {sortedArrivals?.map((arrival, index) => (
                                            <Card className="arrival-card" key={index}>
                                                <Card.Body>
                                                    <Card.Title style={{ color: arrival.predictTime1 <= 5 ? "red" : "black" }}>{arrival.routeNumber} 번</Card.Title>
                                                    <Card.Text>
                                                        <strong>버스 위치:</strong> {arrival.locationNo1} 정거장 전
                                                    </Card.Text>
                                                    <Card.Text style={{ color: arrival.predictTime1 <= 5 ? "red" : "black" }}>
                                                        <strong>도착 예정시간:</strong> {arrival.predictTime1}분 후
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>남은 좌석 수:</strong>{" "}
                                                        {arrival.remainSeatCnt1 === "-1" ? "없음" : arrival.remainSeatCnt1}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ fontSize: "30px", textAlign: "center" }}>도착 정보를 알고 싶은 정류장 먼저 선택 😢</p>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    );
}

export default Bus;