import React from "react";
import { useState } from "react";
import moment from "moment";
import "./time.css";
function Time() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [input, setInput] = useState({ hour: "", minute: "" });
    const [result, setResult] = useState("");

    const [isOpen, setIsOpen] = useState(false);


    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
        setInput({ hour: "", minute: "" });
        setResult("");
    };

    const handleTimeChange = (event) => {
        const { id, value } = event.target;
        if (!isNaN(value) && value.length <= 2) {
            if (id === "hour" && value <= 23) {  // hour는 00~23 사이만 입력
                setInput((prev) => ({ ...prev, [id]: value }));
            } else if (id === "minute" && value <= 59) {  // minute는 00~59 사이만 입력
                setInput((prev) => ({ ...prev, [id]: value }));
            }
        }
    };

    const Calculate_END_Time = (hour, minute, hourDiff, minuteDiff) => {
        if (!hour || !minute) return "";
        const inputMoment = moment({ hour, minute });
        const result = inputMoment.subtract({
            hours: hourDiff,
            minutes: minuteDiff,
        });
        return result.format("HH시 mm분");
    };

    const handle_Calculate = (hourDiff, minuteDiff) => {
        if (!input.hour || !input.minute) {
            alert("24시간 형태로 HH:mm 형태로 입력해주세요");
            return;
        }
        setResult(Calculate_END_Time(input.hour, input.minute, hourDiff, minuteDiff));
    }


    const handleGoBack = () => {
        setSelectedWeek(null);
    };

    const timeSettings = {
        week5: [
            { label: "마감", hourDiff: 6, minuteDiff: 50 },
            { label: "마감2", hourDiff: 6, minuteDiff: 30 },
        ],
        week2: [
            { label: "마감", hourDiff: 5, minuteDiff: 50 },
            { label: "마감2", hourDiff: 5, minuteDiff: 30 },
        ],

    };

    return (
        <>
            <div className="time-header">
                📌 출근 시간 계산 방법
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="more-btn"
                >
                    {isOpen ? "접기" : "자세히 보기"}
                </button>

                {isOpen && (
                    <p className="mt-2 text-gray-700">
                        마지막 영화 시간을 입력하고 <br></br>원하는 <strong>마감 버튼</strong>을 누르면 출근 시간이 계산됩니다.
                        <p>영화시간 확인은 CGV로고 클릭해서 홈페이지에서 확인</p>
                    </p>
                )}
            </div>
            {!selectedWeek && (
                <div className="time-card-content-header">

                    <button onClick={() => handleWeekSelect("week2")}>주/2</button>
                    <button onClick={() => handleWeekSelect("week5")}>주/5</button>
                </div>
            )}
            {selectedWeek && (
                <div className="time-card">
                    {selectedWeek === "week5" && (
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
                                        <p>출근 시간</p>
                                        <span className="time">{result}</span>
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
                                <span className="time">{result}</span>
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
