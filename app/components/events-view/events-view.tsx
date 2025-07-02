'use client'

import ActivityCalendar from "react-activity-calendar";
import './events-view.css'
import { Activity, Data, getActivities, getData } from "@/app/utils/data-utils/data-utils";
import { mapToCalendar } from "@/app/utils/data-utils/data-mapper";
import { useEffect, useMemo, useState } from "react";
import { DayView } from "./day-view/day-view";

export const EventsView = () => {
    const [data, setData] = useState<Data[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [currentDate, setCurrentDate] = useState<string>();
    const [currentActivity, setCurrentActivity] = useState<string>();
    useEffect(() => {
        const loadedData = getData();
        const loadedActivities = getActivities();
        setData(loadedData);
        setActivities(loadedActivities);
    }, []);

    const mappedData = useMemo(() => mapToCalendar(data), [data, currentActivity, currentDate]);

    return <>
        <div id="calendar-wrapper">
            <div>{activities.map(activity => <h1 key={activity.name} onClick={() => setCurrentActivity(activity.name)}>{activity.name}</h1>)}</div>
            <ActivityCalendar
                data={mappedData}
                showWeekdayLabels
                blockSize={20}
                blockRadius={7}
                blockMargin={5}
                fontSize={24}
                weekStart={1}
                theme={{
                    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
                    dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
                }}
                eventHandlers={{
                    onClick: _ => activity => {
                        setCurrentDate(activity.date);
                    }
                }}
            />
        </div>
                    { currentDate && <div style={{ display: 'flex', justifyContent: 'end'}}>
                    <DayView currentDate={currentDate} data={data.filter(day => day.date === currentDate)[0]} />
                    </div>}
    </>
};
