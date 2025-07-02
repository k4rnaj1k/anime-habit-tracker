'use client'
import { useState } from "react";
import { getActivities, saveDailyActivity } from "../utils/data-utils/data-utils";
import { getISODate } from '../utils/data-utils/date-utils';

export default function TrackActivity() {
    const [formState, setFormState] = useState({ activityName: '', date: '' });
    const activities = getActivities();
    return <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}> <form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '20vw' }} onSubmit={(e) => {
        e.preventDefault();
        saveDailyActivity(getISODate(formState.date), formState.activityName || activities[0].name);
        alert('Successfully logged ' + (formState.activityName || activities[0].name))
    }}>
        <div id="input-wrapper"style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="input-field"><label>Date</label>
                <input type="date" required defaultValue={getISODate()} onChange={(e) => setFormState(prevState => ({ ...prevState, date: e.target.value }))}>
                </input>
            </div>
            <div className="input-field"><label>Activity</label>
                <select onChange={(e) => setFormState(prevState => ({ ...prevState, activityName: e.target.value }))}>
                    {activities.map(activity => activity.name).map(activityName => 
                        <option key={activityName} value={activityName}>{activityName}</option>
                    )}
                </select>
            </div>
            
            <button type="submit">Log activity</button>
        </div>
    </form >
    </div>
};