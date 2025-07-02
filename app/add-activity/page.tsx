'use client'
import './track.css';
import { useState } from "react";
import { saveActivity } from "../utils/data-utils/data-utils";

export default function TrackActivity() {
    const [formState, setFormState] = useState({ name: '' });
    return <div style={{ display: 'flex', justifyContent: 'center'}}><form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '10vw' }} onSubmit={(e) => {
        e.preventDefault();
        saveActivity(formState.name);
    }}>
        <div id="input-wrapper" style={{ height: '20vh', width: '16vw', alignItems: 'center', justifyContent: 'center', display: 'grid' }}>
            <div className="input-field"><label>name</label>
                <input type="text" onChange={(e) => setFormState(prevState => ({ ...prevState, name: e.target.value }))}>
                </input>
            </div>
            <button type="submit">Add activity</button>
        </div>
    </form >
    </div>
};