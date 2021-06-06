import React from "react";
import { dateformat, dateAdd } from "../Util";
import Pagetion from "./Pagetion";

const MonthPick = ({
    monthArray,
    activeYear,
    setActiveMonth,
    setActiveYear,
    setMode
}) => {
    return (
        <>
            <Pagetion
                current={dateformat(activeYear, "yyyy年")}
                onPre={() => {
                    setActiveYear((preYear) => dateAdd("y", -1, preYear));
                }}
                onNext={() => {
                    setActiveYear((preYear) => dateAdd("y", +1, preYear));
                }}
                changeMode={() => {
                    setMode("year");
                }}
            />
            <div className="monthsBox">
                {monthArray.map(({ dateTime, currentYear, text, currentMonth }, i) => {
                    return (
                        <div
                            key={i}
                            className={`monthCell ${currentYear ? "" : "otherYear"} ${currentMonth ? "currentMonth" : ""
                                }`}
                            onClick={() => {
                                setActiveMonth(dateTime);
                                setMode("date");
                            }}
                        >
                            {text}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MonthPick;
