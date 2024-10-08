import React from "react";
import { useState } from "react";
import moment from "moment";

import "./time.css";
function Time() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    //주4
    const [inputTime4, setInputTime4] = useState({ hour: "", minute: "" });
    const [resultTime4, setResultTime4] = useState("");
    //주2
    const [inputTime2, setInputTime2] = useState({ hour: "", minute: "" });
    const [resultTime2, setResultTime2] = useState("");

    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
    };

    const handleTimeChange = (event, week) => {
        const { id, value } = event.target;
        if (!isNaN(value)) {  //입력된 값이 숫자로만 이루어져 있는지 확인 
            if (week === "week4") {
                setInputTime4((prev) => ({
                    ...prev,
                    [id]: value,
                }));

            } else {
                setInputTime2((prev) => ({
                    ...prev,
                    [id]: value,
                }));
            }
        }
    };

    const calculateEndTime = (hour, minute, hourDiff, minuteDiff) => {
        if (!hour || !minute) return "";
        const inputMoment = moment({ hour, minute });
        const result = inputMoment.subtract({
            hours: hourDiff,
            minutes: minuteDiff,
        });
        return result.format("HH:mm");
    };

    const calculateTimeWeek4End = () => { //주 4마감
        setResultTime4(calculateEndTime(inputTime4.hour, inputTime4.minute, 7, 50)); //영화시작 시간 +10 - 8시간
    };

    const calculateTimeWeek4End2 = () => { //주 4 마감2
        setResultTime4(calculateEndTime(inputTime4.hour, inputTime4.minute, 7, 20)); //영화시간 + 40 - 8시간
    };

    const calculateTimeWeek2End = () => { //주 2 마감
        setResultTime2(calculateEndTime(inputTime2.hour, inputTime2.minute, 7, 20)); //영화시작 시간+10 -7시간30분
    };

    const calculateTimeWeek2End2 = () => { //주 2 마감2
        setResultTime2(calculateEndTime(inputTime2.hour, inputTime2.minute, 6, 50)); //영화시간 + 40 - 7시간 30분
    };

    const handleGoBack = () => {
        setSelectedWeek(null);
        setInputTime2({ hour: "", minute: "" }); // 주 선택이 변경되면 입력도 초기화합니다.
        setInputTime4({ hour: "", minute: "" });
        setResultTime2(""); // 결과도 초기화합니다.
        setResultTime4("");
    };

    return (
        <>
            {!selectedWeek && (
                <div className="time-card-content-header">
                    <button onClick={() => handleWeekSelect("week2")}>주/2</button>
                    <button onClick={() => handleWeekSelect("week4")}>주/4</button>
                </div>
            )}
            {selectedWeek && (
                <div className="time-card">
                    {selectedWeek === "week4" && (
                        <>
                            <div className='time-card-content-input'>
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='hour'
                                    id="hour"
                                    value={inputTime4.hour}
                                    onChange={(e) => handleTimeChange(e, 'week4')}
                                    required
                                />
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='minute'
                                    id="minute"
                                    value={inputTime4.minute}
                                    onChange={(e) => handleTimeChange(e, 'week4')}
                                    required
                                />
                            </div>
                            <div className='time-card-content-select'>
                                <button onClick={calculateTimeWeek4End}>마감</button>
                                <button onClick={calculateTimeWeek4End2}>마감2</button>
                            </div>
                            <div className="time-card-content-result">
                                {resultTime4 && (
                                    <div>
                                        <p style={{ color: "black" }}>출근 시간</p>
                                        <p style={{ color: "black" }}>{resultTime4}</p>
                                    </div>
                                )}

                            </div>
                            <div className="goback-btn" onClick={handleGoBack}>뒤로 가기</div>
                        </>
                    )}
                    {selectedWeek === "week2" && (
                        <>
                            <div className='time-card-content-input'>
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='hour'
                                    id="hour"
                                    value={inputTime2.hour}
                                    onChange={(e) => handleTimeChange(e, 'week2')}
                                    required
                                />
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='minute'
                                    id="minute"
                                    value={inputTime2.minute}
                                    onChange={(e) => handleTimeChange(e, 'week2')}
                                    required
                                />
                            </div>
                            <div className='time-card-content-select'>
                                <button onClick={calculateTimeWeek2End}>마감</button>
                                <button onClick={calculateTimeWeek2End2}>마감2</button>
                            </div>
                            <div className="time-card-content-result">
                                <p>출근 시간</p>
                                <p className="time">{resultTime2}</p>
                            </div>
                            <div className="goback-btn" onClick={handleGoBack}>뒤로 가기</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Time;
