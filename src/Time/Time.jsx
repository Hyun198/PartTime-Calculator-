import React from 'react'
import { useState } from 'react';
import moment from 'moment';
import './time.css'

function Time() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [inputTime4, setInputTime4] = useState({ hour: "", minute: "" });
    const [resultTime4, setResultTime4] = useState("");

    const [inputTime2, setInputTime2] = useState({ hour: "", minute: "" });
    const [resultTime2, setResultTime2] = useState("");

    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
    }

    const handleTimeChange4 = (event) => {
        const { id, value } = event.target;
        setInputTime4((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleTimeChange2 = (event) => {
        const { id, value } = event.target;
        setInputTime2((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const calculateTimeWeek4End = () => {
        const { hour, minute } = inputTime4;
        if (!hour || !minute) return;
        let inputMoment = moment({ hour, minute });
        inputMoment.add(10, 'minutes');
        const result = inputMoment.subtract({ hours: 8, minutes: 0 });
        const formattedResult = result.format("HH:mm");
        setResultTime4(formattedResult);
    };

    const calculateTimeWeek4End2 = () => {
        const { hour, minute } = inputTime4;
        if (!hour || !minute) return;

        const inputMoment = moment({ hour, minute });
        const result = inputMoment.subtract({ hours: 7, minutes: 30 });
        const formattedResult = result.format("HH:mm");
        setResultTime4(formattedResult);
    };

    const calculateTimeWeek2End = () => {
        const { hour, minute } = inputTime2;
        if (!hour || !minute) return;

        let inputMoment = moment({ hour, minute });
        inputMoment.add(10, 'minutes');
        const result = inputMoment.subtract({ hours: 7, minutes: 30 });
        const formattedResult = result.format("HH:mm");
        setResultTime2(formattedResult);
    };

    const calculateTimeWeek2End2 = () => {
        const { hour, minute } = inputTime2;
        if (!hour || !minute) return;

        const inputMoment = moment({ hour, minute });
        const result = inputMoment.subtract({ hours: 7, minutes: 0 });
        const formattedResult = result.format("HH:mm");
        setResultTime2(formattedResult);
    };

    const handleGoBack = () => {
        setSelectedWeek(null);
        setInputTime2({ hour: "", minute: "" }); // 주 선택이 변경되면 입력도 초기화합니다.
        setInputTime4({ hour: "", minute: "" });
        setResultTime2(""); // 결과도 초기화합니다.
        setResultTime4("");
    }



    return (
        <>
            <div className="time-container">
                <div className="time-card">
                    <div className="time-card-content-header">
                        {!selectedWeek && (
                            <>
                                <button onClick={() => handleWeekSelect('week2')}>주2</button>
                                <button onClick={() => handleWeekSelect('week4')}>주4</button>
                            </>
                        )}
                    </div>
                    {selectedWeek === "week4" && (
                        <>
                            <div className='time-card-content-input'>
                                <input type="text" className='Timeinput' placeholder='hour' id="hour" value={inputTime4.hour} onChange={handleTimeChange4} required />
                                <input type="text" className='Timeinput' placeholder='minute' id="minute" value={inputTime4.minute} onChange={handleTimeChange4} required />
                            </div>
                            <div className='time-card-content-select'>
                                <button onClick={calculateTimeWeek4End}>마감</button>
                                <button onClick={calculateTimeWeek4End2}>마감2</button>
                            </div>
                            <div className="time-card-content-result">
                                <p>
                                    입력 시간
                                </p>
                                <p className="time">{inputTime4.hour}:{inputTime4.minute}</p>
                                <p>
                                    출근 시간
                                </p>
                                <p className="time">{resultTime4}</p>
                            </div>
                            {selectedWeek && (
                                <button onClick={handleGoBack}>뒤로 가기</button>
                            )}
                        </>
                    )}
                    {selectedWeek === "week2" && (
                        <>
                            <div className='time-card-content-input'>
                                <input type="text" className='Timeinput' placeholder='hour' id="hour" value={inputTime2.hour} onChange={handleTimeChange2} required />
                                <input type="text" className='Timeinput' placeholder='minute' id="minute" value={inputTime2.minute} onChange={handleTimeChange2} required />
                            </div>
                            <div className='time-card-content-select'>
                                <button onClick={calculateTimeWeek2End}>마감</button>
                                <button onClick={calculateTimeWeek2End2}>마감2</button>
                            </div>
                            <div className="time-card-content-result">
                                <p>
                                    입력 시간
                                </p>
                                <p className="time">{inputTime2.hour}:{inputTime2.minute}</p>
                                <p>
                                    출근 시간
                                </p>
                                <p className="time">{resultTime2}</p>
                            </div>
                            {selectedWeek && (
                                <button onClick={handleGoBack}>뒤로 가기</button>
                            )}
                        </>
                    )}
                </div>
            </div>


        </>
    )
}

export default Time