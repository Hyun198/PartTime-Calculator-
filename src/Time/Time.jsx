import React from "react";
import { useState } from "react";
import moment from "moment";
import "./time.css";
function Time() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [input, setInput] = useState({ hour: "", minute: "" });
    const [result, setResult] = useState("");

    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
        setInput({ hour: "", minute: "" });
        setResult("");
    };

    const handleTimeChange = (event) => {
        const { id, value } = event.target;
        if (!isNaN(value)) {  //입력된 값이 숫자로만 이루어져 있는지 확인 
            setInput((prev) => ({ ...prev, [id]: value }));
        }
    };

    const Calculate_END_Time = (hour, minute, hourDiff, minuteDiff) => {
        if (!hour || !minute) return "";
        const inputMoment = moment({ hour, minute });
        const result = inputMoment.subtract({
            hours: hourDiff,
            minutes: minuteDiff,
        });
        return result.format("HH:mm");
    };

    const handle_Calculate = (hourDiff, minuteDiff) => {
        setResult(Calculate_END_Time(input.hour, input.minute, hourDiff, minuteDiff));
    }


    const handleGoBack = () => {
        setSelectedWeek(null);
    };

    const timeSettings = {
        week4: [
            { label: "마감", hourDiff: 7, minuteDiff: 50 },
            { label: "마감2", hourDiff: 7, minuteDiff: 20 },
        ],
        week2: [
            { label: "마감", hourDiff: 7, minuteDiff: 20 },
            { label: "마감2", hourDiff: 6, minuteDiff: 50 },
        ]
    };

    return (
        <>
            {!selectedWeek && (
                <div className="time-card-content-header">
                    <p>내가 해당하는 스케줄 선택한뒤 시간 입력하기</p>
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
                                    value={input.hour}
                                    onChange={handleTimeChange}
                                    required
                                />
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='minute'
                                    id="minute"
                                    value={input.minute}
                                    onChange={handleTimeChange}
                                    required
                                />
                            </div>
                            <div className="time-card-content-select">
                                {timeSettings[selectedWeek].map(({ label, hourDiff, minuteDiff }, index) => (
                                    <button key={index} onClick={() => handle_Calculate(hourDiff, minuteDiff)}>
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="time-card-content-result">
                                {result && (
                                    <div>
                                        <p style={{ color: "black" }}>출근 시간</p>
                                        <p style={{ color: "black" }}>{result}</p>
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
                                    value={input.hour}
                                    onChange={handleTimeChange}
                                    required
                                />
                                <input
                                    type="text"
                                    className='Timeinput'
                                    placeholder='minute'
                                    id="minute"
                                    value={input.minute}
                                    onChange={handleTimeChange}
                                    required
                                />
                            </div>
                            <div className="time-card-content-select">
                                {timeSettings[selectedWeek].map(({ label, hourDiff, minuteDiff }, index) => (
                                    <button key={index} onClick={() => handle_Calculate(hourDiff, minuteDiff)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div className="time-card-content-result">
                                <p>출근 시간</p>
                                <p className="time">{result}</p>
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
