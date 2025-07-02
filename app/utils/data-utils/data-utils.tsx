'use client'

import { getISODate } from "./date-utils";

export type Activity = {
    name: string,
};

export type Data = {
    date: string,
    activities: Activity[]
};

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const initData = () => {
    localStorage.setItem('initDate', JSON.stringify(new Date()));
    const data = [];
    const day = new Date().getTime();
    data.push({ date: getISODate(new Date(day)), activities: [] });
    data.push({ date: getISODate(new Date(day + (TWENTY_FOUR_HOURS * 300))), activities: [] });
    return data;
};

const addDay = () => {
    const data = getData();
    const day = new Date().getTime();
    data.push({ date: getISODate(new Date(day + (TWENTY_FOUR_HOURS * 300))), activities: [] });
    saveData(data);
}

const saveData = (data: Data[]) => {
    data = data.sort((day1, day2) => new Date(day1.date).getTime() - new Date(day2.date).getTime());
    localStorage.setItem('data', JSON.stringify(data));
    return data;
}


export const getData = (): Data[] => {
    const initDate = localStorage.getItem('initDate');
    if (!initDate) {
        const initialData = initData();
        saveData(initialData);
        return initialData;
    }
    if (getISODate(JSON.parse(initDate)) !== getISODate()) {
        addDay();
    }
    const dataString = localStorage.getItem('data');
    return JSON.parse(dataString as string);
};

export const removeActivity = (activityName: string, date: string) => {
    const data = getData();
    const result = data.filter(data => data.date !== date);
    const neededDay = data.find(data => data.date === date);
    if (!neededDay) {
        throw Error('Couldn`t find needed activity in that date.');
    }
    neededDay.activities = neededDay.activities.filter(activity => activity.name !== activityName);
    result.push(neededDay);
    saveData(result);
}

export const saveDailyActivity = (date: string, activityName: string) => {
    const data = getData();
    const result = data.filter(data => data.date !== date);
    const neededDay = data.find(data => data.date === date);
    if (!neededDay) {
        result.push({ date, activities: [{ name: activityName }] });
        saveData(result);
        return;
    }
    neededDay.activities.push({ name: activityName });
    result.push(neededDay);
    saveData(result);
}

export const getActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities');
    if (!activities) {
        localStorage.setItem('activities', JSON.stringify([]));
        return [];
    }
    return JSON.parse(activities);
}

export const saveActivity = (activityName: string) => {
    const activities = getActivities();
    activities.push({ name: activityName });
    localStorage.setItem('activities', JSON.stringify(activities));
};