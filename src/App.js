import React, { useState, useEffect } from "react";
import { getLunar, isSameDate, dateformat } from "./Util";
import Calendar from "./compoent/Calendar";
import "./styles.scss";

export default function App() {
    const [now, setNow] = useState(() => new Date());
    const [activeDate, setActiveDate] = useState(() => new Date());

    const [todo, setTodo] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setNow(new Date());
        }, 1000);
    }, [now]);
    return (
        <>
            <div className="container">
                <div className="Time">
                    <div className="nowClock">{dateformat(now, "t hh:MM:ss")}</div>
                    <div className="nowDate">
                        {dateformat(now, "yyyy年mm月dd日")}{" "}
                        {getLunar(now).monthCn + getLunar(now).dayCn}
                    </div>
                </div>
                <Calendar
                    now={now}
                    activeDate={activeDate}
                    setActiveDate={setActiveDate}
                />
                <div className="todoList" style={{ display: todo ? "block" : "none" }}>
                    <div className="activeDate">
                        {dateformat(
                            activeDate,
                            `${isSameDate(now, activeDate) ? "今天" : "ddd d"}`
                        )}{" "}
                        {getLunar(activeDate).monthCn + getLunar(activeDate).dayCn}
                    </div>
                    <div className="createEvent">
                        <input type="text" placeholder="新增事件或提醒" />
                    </div>
                    <div className="events">沒有事件</div>
                </div>
                <div className="todoSwich">
                    <div
                        className="todoSwichBt"
                        onClick={() => {
                            setTodo(!todo);
                        }}
                    >
                        {todo ? "隱藏行程摘要∨" : "顯示行程摘要∧"}
                    </div>
                </div>
            </div>
        </>
    );
}
