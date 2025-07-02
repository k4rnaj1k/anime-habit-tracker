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

    const mappedData = useMemo(() => mapToCalendar(data, currentActivity), [data, currentActivity]);

    return <>
        <div id="calendar-wrapper">
            <div>{activities.map(activity => <h3 key={activity.name} onClick={() => setCurrentActivity(activity.name)}>{activity.name}</h3>)}</div>
            <ActivityCalendar
                data={mappedData}
                showWeekdayLabels
                blockSize={14}
                blockRadius={3}
                blockMargin={2}
                fontSize={12}
                weekStart={1}
                theme={{
                    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
                    dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
                }}
                eventHandlers={{
                    onClick: () => activity => {
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
