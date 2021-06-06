import React from "react";
import { chkYear } from "../Util";
import Pagetion from "./Pagetion";

const YearPick = ({
    now,
    yearArray,
    activeRange,
    setActiveYearRange,
    setActiveYear,
    setMode
}) => {
    return (
        <>
            <Pagetion
                current={`${activeRange} - ${activeRange + 9}`}
                onPre={() => {
                    setActiveYearRange((preRange) =>
                        chkYear(now.getFullYear(), preRange - 10, preRange)
                    );
                }}
                onNext={() => {
                    setActiveYearRange((preRange) =>
                        chkYear(now.getFullYear(), preRange + 10, preRange)
                    );
                }}
            />
            <div className="yearBox">
                {yearArray.map(({ year, currentRnage, currentYear }, i) => {
                    return (
                        <div
                            key={i}
                            className={`yearCell ${!currentRnage ? "otherRange" : ""} ${currentYear ? "currentYear" : ""
                                }`}
                            onClick={() => {
                                setActiveYear(new Date(year, 1, 1));
                                setMode("month");
                            }}
                        >
                            {year}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default YearPick;
