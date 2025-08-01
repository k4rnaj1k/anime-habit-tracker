const cron = require("node-cron");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

let db;
async function getDb() {
  if (db) return db;
  db = await sqlite.open({
    filename: process.env.SQLITE_PATH ?? "./app.db",
    driver: sqlite3.Database,
  });
  return db;
}

(async () => console.log((await (await getDb()).all(`select a.name from activity a left join activities_days a_d
   on a.name = a_d.activity_name where (a_d.done != 1 or a_d.done is null) AND (a_d.day = ? OR a_d.day is null)`,
  [formatDate(new Date())]))
  .map(activity => activity.name || 'test').join(', ')))();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const fcm = admin.messaging();

// // ----------  Build one message  ----------
function buildMessage(token, activities) {
  return {
    token,
    notification: {
      title: 'Forgetting something?',
      body: 'Activities not done yet: ' + activities,
    },         // custom key-value pairs
    android: {
      priority: 'high',
      ttl: 3600 * 1000,                     // 1 h
      notification: { channelId: 'reminders' },
    },
  };
}

async function pushNow(token, activities) {
  try {
    const id = await fcm.send(buildMessage(token, activities));      // admin.messaging().send()
    console.log('Sent as', id);
  } catch (e) {
    const db = await getDb();
    db.run(`delete from fcm_token where token = ?`, [token]);
  }
}

const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

cron.schedule('*/5 * * * *', async () => {
  // (async () => {
  const db = await getDb();

  const tokens = await db.all(`select * from fcm_token`);
  if (!tokens.length) {
    console.log(new Date().toISOString() + ' - no tokens');
    return;
  }
  tokens.forEach(async ({ token }) => {
    const activities = await db.all(`select a.name from activity a left join activities_days a_d on a.name = a_d.activity_name where (a_d.done != 1 or a_d.done is null) AND (a_d.day = ? OR a_d.day is null)`, [formatDate(new Date())]);
    console.log(activities);
    console.log(token)
    pushNow(token, activities.map(activity => activity.name || 'undefined').join(', '));
  });
},
  {
    timezone: 'Europe/Kyiv',
  });
