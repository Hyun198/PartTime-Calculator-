import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './Bus.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import useBusInfo from "./hooks/useBusInfo"
import useBusRouteList from "./hooks/useBusRouteList";
import useStationArrive from "./hooks/useStationArrive";
function Bus() {
    const serviceKey = process.env.REACT_APP_BUS_API_KEY;

    const [keyword, setKeyword] = useState("");
    const [routeId, setRouteId] = useState(null);

    const [selectedStation, setSelectedStation] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const keywordInput = useRef(null);

    const { busInfo, fetchBusCodeInfo } = useBusInfo();
    const { stations, fetchBusRoute } = useBusRouteList();
    const { arrivals, fetchArrive } = useStationArrive();

    const handleSearch = () => {
        setKeyword(keywordInput.current.value);
        setHasSearched(true);
        if (keywordInput.current.value === "") {
            setHasSearched(false);
            return;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }

    }


    //버스 노선정보 조회
    const fetchBusCode = async (keyword) => {
        let url = `http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey=${serviceKey}&keyword=${keyword}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                },
                responseType: "text",
            });

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");
            const busRouteLists = xmlDoc.getElementsByTagName("busRouteList");

            for (let i = 0; i < busRouteLists.length; i++) {
                const regionName =
                    busRouteLists[i].getElementsByTagName("regionName")[0].textContent;
                if (regionName.includes("김포")) {
                    const routeId =
                        busRouteLists[i].getElementsByTagName("routeId")[0].textContent;
                    return routeId;
                }
            }
        } catch (error) {
            console.error("Error fetching bus code:", error);
        }
    };

    const handleStationClick = async (stationId, stationName) => {
        setSelectedStation({ stationId, stationName });
        await fetchArrive(stationId);
    };

    const sortedArrivals = [...arrivals].sort((a, b) => a.predictTime1 - b.predictTime1);

    useEffect(() => {
        const getBusCode = async () => {
            if (keyword) {
                const routeId = await fetchBusCode(keyword);
                if (routeId) {
                    setRouteId(routeId);
                }
            }
        };
        getBusCode();
    }, [keyword]);

    useEffect(() => {
        if (routeId) {
            fetchBusCodeInfo(routeId); //버스 노선 정보
            fetchBusRoute(routeId); // keyword 노선의 경유 정류장들
        }
    }, [routeId]);

    return (
        <Container className="bus-container">
            <h2><span className="gimposi">김포시</span> <br></br>버스 시간표 조회</h2>
            <div className="search-form">
                <input
                    type="text"
                    className="search-box"

                    ref={keywordInput}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /></button>
            </div>
            {hasSearched && (
                <Container>
                    <Row>
                        {busInfo ? (
                            <Col lg={6} className="bus-route-info">
                                <h2>{keyword} 버스 노선 정보</h2>
                                <Table className="route-table" striped bordered hover>
                                    <thead>
                                        <tr className="table-primary">
                                            <th colSpan="2">평일 기점</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >첫차</td>
                                            <td>{busInfo.upFirstTime}</td>
                                        </tr>
                                        <tr>
                                            <td>막차</td>
                                            <td>{busInfo.upLastTime}</td>
                                        </tr>
                                    </tbody>

                                    <thead>
                                        <tr className="table-primary">
                                            <th colSpan="2">종점 기점</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>첫차</td>
                                            <td>{busInfo.downFirstTime}</td>
                                        </tr>
                                        <tr>
                                            <td>막차</td>
                                            <td>{busInfo.downLastTime}</td>
                                        </tr>
                                    </tbody>

                                    <thead>
                                        <tr className="table-primary">
                                            <th colSpan="2">기타 정보</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>평일 최소 배차 간격</td>
                                            <td>{busInfo.peekAlloc} 분</td>
                                        </tr>
                                        <tr>
                                            <td>평일 최대 배차 간격</td>
                                            <td>{busInfo.nPeekAlloc} 분 </td>
                                        </tr>
                                    </tbody>

                                </Table>


                            </Col>
                        ) : (
                            <p>Loading...</p>
                        )}
                        {stations.length > 0 && (
                            <Col lg={6} className="bus-route-info">
                                <h2>Stations</h2>
                                <div className="station-list">
                                    <Row>
                                        {stations.map((station) => (
                                            <Col md={12} key={station.stationId}>
                                                <Card className="station-card">
                                                    <Card.Header as="h5">{station.stationName}</Card.Header>
                                                    <Card.Body>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() =>
                                                                handleStationClick(
                                                                    station.stationId,
                                                                    station.stationName
                                                                )
                                                            }
                                                        >
                                                            도착 정보 보기
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                        )}
                    </Row>
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
                                    <p style={{ fontSize: "30px", textAlign: "center" }}>도착 버스가 없음 😢</p>
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