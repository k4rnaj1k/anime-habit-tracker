'use server'

import { getDb } from "@/app/db";
import { Activity } from "./data-utils";

const getActivitiesList = async () => {
    const db = await getDb();
    return db.all('SELECT * FROM activities');
};

const updateDay = async ({ day, activityData }: { day: string, activityData: Activity & { done: boolean } }) => {
    const db = await getDb();
    db.exec(`insert into activity_days values(${day}, ${activityData.name}, ${activityData.done})`);
}

const getDayData = async(day: string) => {
    const db = await getDb();
    db.all(`select * from activity_days where day=${day}`);
}

const SqliteDataService = {
    getActivitiesList,
    updateDay,
    getDayData
};

export default SqliteDataService;