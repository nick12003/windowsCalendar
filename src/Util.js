import dateformat from "dateformat";
import solarLunar from "solarlunar";
import React, { createContext, useContext } from "react";

dateformat.i18n.timeNames[0] = "上午";
dateformat.i18n.timeNames[1] = "下午";
dateformat.i18n.dayNames = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const CalendarContext = createContext();

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error(
            `Calendar compound components cannot be rendered outside the Calendar component`
        );
    }
    return context;
};

export { dateformat };

export const ch_week = ["日", "一", "二", "三", "四", "五", "六"];

export const dateAdd = (datepart, number, date) => {
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    switch (datepart) {
        case "y":
            return new Date(y + number, m, d);
        case "m":
            return new Date(y, m + number, d);
        case "d":
            return new Date(y, m, d + number);
        default:
            return new Date(y, m, d);
    }
};

export const isSameDate = (d1, d2) => {
    return dateformat(d1, "yyyymmdd") === dateformat(d2, "yyyymmdd");
};

export const isSameDateTime = (d1, d2, format) => {
    return dateformat(d1, format) === dateformat(d2, format);
};

export const getDaysOfMonth = (year, mon) => {
    return new Date(year, mon + 1, 0).getDate();
};

export const getLunar = (date) => {
    return solarLunar.solar2lunar(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
};

export const chkYear = (nowYear, nextRange, preRange) => {
    if (nextRange < nowYear - 100) {
        return nowYear - 100;
    }
    if (nextRange + 9 > nowYear + 100) {
        return nextRange - 10;
    }
    if (preRange === nowYear - 100) {
        return preRange + (10 - (preRange % 10) || 10);
    }
    return nextRange;
};

export const getYearArray = (now, activeRange) => {
    let maxNum = now.getFullYear() + 100;
    let minNum = now.getFullYear() - 100;
    let headRange = (10 - (minNum % 10)) % 10;
    let tailRange = ((maxNum % 10) + 1) % 10;
    let First = headRange + minNum;
    let last = maxNum - tailRange;
    let count = 10;
    let year = Math.floor(activeRange / 10) * 10;
    let head = (year - headRange) % 4;
    let tail = 16 - head - count;
    let range = 10;
    const getYearObj = (year, currentRnage) => {
        return {
            year,
            currentRnage,
            currentYear: year === now.getFullYear()
        };
    };

    if (activeRange < First) {
        head = 0;
        count = headRange;
        tail = 16 - count;
        year = minNum;
        range = headRange;
    }
    if (activeRange + 9 === last) {
        tail = tailRange;
    }

    return [
        ...Array(head)
            .fill()
            .map((a, i) => getYearObj(year + i - head, false)),
        ...Array(count)
            .fill()
            .map((a, i) => getYearObj(year + i, true)),
        ...Array(tail)
            .fill()
            .map((a, i) => getYearObj(year + range + i), false)
    ];
};

export const getMonthArray = (now, activeYear) => {
    const getMonthObj = (dateTime, i) => {
        return {
            dateTime: dateTime,
            currentYear: isSameDateTime(activeYear, dateTime, "yyyy"),
            text: i + 1 + "月",
            currentMonth: isSameDateTime(now, dateTime, "yyyymm")
        };
    };
    return [
        ...Array(12)
            .fill()
            .map((a, i) => getMonthObj(new Date(activeYear.getFullYear(), i, 1), i)),
        ...Array(4)
            .fill()
            .map((a, i) =>
                getMonthObj(new Date(activeYear.getFullYear() + 1, i, 1), i)
            )
    ];
};

export const getDateArray = (now, active, activeMonth) => {
    let activeYear = activeMonth.getFullYear();
    let activeMon = activeMonth.getMonth();
    let prev = new Date(activeYear, activeMon, 1).getDay() % 7;
    let curent = getDaysOfMonth(activeYear, activeMon);
    let next = 42 - (prev + curent);
    const getDateObj = (dateTime, i) => {
        return {
            dateTime: dateTime,
            active: isSameDateTime(active, dateTime, "yyyymmdd"),
            today: isSameDateTime(now, dateTime, "yyyymmdd"),
            curentMon: i !== undefined ? true : false,
            text: dateTime.getDate() + <br /> + getLunar(dateTime).dayCn
        };
    };
    return [
        ...ch_week.map((item) => {
            return { type: "title", text: item };
        }),
        ...Array(prev)
            .fill()
            .map((u, i) => getDateObj(new Date(activeYear, activeMon, i + 1 - prev))),
        ...Array(curent)
            .fill()
            .map((u, i) => getDateObj(new Date(activeYear, activeMon, i + 1), i)),
        ...Array(next)
            .fill()
            .map((u, i) => getDateObj(new Date(activeYear, activeMon + 1, i + 1)))
    ];
};
