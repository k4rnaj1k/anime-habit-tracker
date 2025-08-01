'use server'

import { getDb } from "@/app/db";
import { Activity } from "./data-utils";

export async function getActivitiesList() {
    const db = await getDb();
    return db.all('SELECT * FROM activity');
};

export async function createActivity(activity: Activity) {
    const db = await getDb();
    console.log(activity.name);
    await db.run({ sql: `INSERT INTO activity (name) values (?)`, values: [activity.name] });
}

export async function updateDay({ day, activityData }: { day: string, activityData: Activity & { done: boolean } }) {
    const db = await getDb();
    await db.run({
        sql: `INSERT OR REPLACE INTO activities_days (day, activity_name, done) VALUES (?, ?, ?)`,
        values: [day, activityData.name, activityData.done ? 1 : 0]
    });
}

export async function getDayData(day: string) {
    const db = await getDb();
    const data = await db.all<{ day: string, activity_name: string, done: boolean }[]>(`select activity_name, done from activities_days where day=?`, [day]);

    return data;
}