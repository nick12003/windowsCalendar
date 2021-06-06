import React, { useState } from "react";
import DatePick from "./DatePick";
import MonthPick from "./MonthPick";
import YearPick from "./YearPick";
import { getDateArray, getMonthArray, getYearArray } from "../Util";

const Calendar = ({ now, activeDate, setActiveDate }) => {
    const [mode, setMode] = useState("date");

    const [activeMonth, setActiveMonth] = useState(() => new Date());
    const [activeYear, setActiveYear] = useState(() => new Date());
    const [activeRange, setActiveYearRange] = useState(
        () => Math.floor(new Date().getFullYear() / 10) * 10
    );

    return (
        <div className="calendar">
            <div className="calendarWrap">
                {mode === "date" && (
                    <DatePick
                        dateArray={getDateArray(now, activeDate, activeMonth)}
                        activeMonth={activeMonth}
                        setActiveDate={setActiveDate}
                        setActiveMonth={setActiveMonth}
                        setMode={setMode}
                    />
                )}
                {mode === "month" && (
                    <MonthPick
                        monthArray={getMonthArray(now, activeYear)}
                        activeYear={activeYear}
                        setActiveMonth={setActiveMonth}
                        setActiveYear={setActiveYear}
                        setMode={setMode}
                    />
                )}
                {mode === "year" && (
                    <YearPick
                        now={now}
                        yearArray={getYearArray(now, activeRange)}
                        activeRange={activeRange}
                        setActiveYearRange={setActiveYearRange}
                        setActiveYear={setActiveYear}
                        setMode={setMode}
                    />
                )}
            </div>
        </div>
    );
};

export default Calendar;
