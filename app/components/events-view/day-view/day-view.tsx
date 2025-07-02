'use client'

import { Data, removeActivity } from "@/app/utils/data-utils/data-utils"

export const DayView = ({ data, currentDate }: { data?: Data, currentDate: string }) => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}><h2>{data?.date || currentDate}</h2>
        {data && data.activities.map((activity) => <>
        <h2 key={activity.name}>{activity.name}</h2>
        <button onClick={() => removeActivity(activity.name, data.date)}>❌</button>
        </>)}</div>;
}