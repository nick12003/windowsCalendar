import React from "react";
import { getLunar, dateformat, dateAdd } from "../Util";
import Pagetion from "./Pagetion";

const DatePick = ({
    dateArray,
    activeMonth,
    setActiveDate,
    setActiveMonth,
    setMode
}) => {
    return (
        <>
            <Pagetion
                current={dateformat(activeMonth, "yyyy年mm月")}
                onPre={() => {
                    setActiveMonth((preMon) => dateAdd("m", -1, preMon));
                }}
                onNext={() => {
                    setActiveMonth((preMon) => dateAdd("m", +1, preMon));
                }}
                changeMode={() => {
                    setMode("month");
                }}
            />
            <div className="datesBox">
                {dateArray.map(
                    ({ type, text, dateTime, active, today, curentMon }, i) => {
                        if (type === "title") {
                            return (
                                <div key={i} className="dateCell title">
                                    {text}
                                </div>
                            );
                        }
                        return (
                            <div
                                key={i}
                                className={`dateCell ${!curentMon ? "otherMonth" : ""} ${today ? "today" : ""
                                    } ${active ? "dateActive" : ""}`}
                                onClick={() => {
                                    setActiveDate(dateTime);
                                }}
                            >
                                <div className="dateBox">
                                    <div>{dateTime.getDate()}</div>
                                    <div>{getLunar(dateTime).dayCn}</div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </>
    );
};

export default DatePick;
