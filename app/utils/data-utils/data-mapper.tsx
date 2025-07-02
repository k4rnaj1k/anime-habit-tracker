'use client'

import { Activity } from "react-activity-calendar";
import { Data } from "./data-utils";
import { getISODate } from "./date-utils";

const getMaxActivities = (data: Data[]) => {
    let maxActivities = 0;
    console.log(data);
    data.forEach(day => { maxActivities = Math.max(day.activities.length) });
    return maxActivities;
};

const level = (todayValue: number, maxValue: number) => {
    const ratio = todayValue / maxValue;

    if (ratio <= 0 || Number.isNaN(ratio)) return 0;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
}


export const mapToCalendar = (data: Data[], date?: string, activityName?: string): Array<Activity> => {
    const maxActivities = getMaxActivities(data);
    if (date) {
        data = data.filter(day => day.date == date);
    }
    if (activityName) {
        data = data.filter(day => day.activities.map(({ name }) => name).includes(activityName));
    }
    if (data.length === 0) {
        data.push({ date: getISODate(), activities: [] })
    }
    return data.map(day => ({
        date: day.date,
        count: day.activities.length,
        level: level(day.activities.length, maxActivities)
    }));
}