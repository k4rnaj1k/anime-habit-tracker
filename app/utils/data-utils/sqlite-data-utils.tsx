'use server'

import { getDb } from "@/app/db";
import { Activity } from "./data-utils";

export async function getUndoneDailyActivitiesList(day: string) {
    const db = await getDb();
    return await db.all(`select a.name from activity a left join activities_days a_d 
        on a.name = a_d.activity_name where (a_d.done = 0 or a_d.done is null) AND (a_d.day = ? OR a_d.day is null)`, [day]);
};

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

export async function saveToken(token: string) {
    const db = await getDb();
    await db.run(`INSERT INTO fcm_token values(?)`, [token]);
}