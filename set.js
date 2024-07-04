const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUZ6em1oc0EvZzNiZzlUOWVGemo2cXM2OGYrRDltMjhwUzVIc3dnSEIwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWJQVlprMDN6U3RFdE5tcncwMjJUaGZsSUY1NlNMQzBML0YxMStmYk1tUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtR0RhOFAvU1dJTGpjUzF4VTczbjFidDlYUWNXV0J2R1ptclFLVlZMYlZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmTjlOZittMVBlU252VlpHQVJjd290ZUQ1YU9JQ1VzRVluYVNMdVFKdmdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklGZmVGcTQvakllT3FPSHg1QWJJOXQ0VHZFYTlldkRZVDNHa3VISE95R2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU5aG8vb1M0aU5LdnhlVnJjRDVXbFlQczlrajhVMzNGbEJUbm9ZeEVveGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FyQjA2OTFMM2UvMG14TGpIbHU4V0tIbUhwakNwVkZJNk9EQzBvcnMzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGRCdU4xR0VtbHI3WnJXUFpsTW1YNEpiRkZSRVNnanRKWnZSbGpxS3ZYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUyZmUzUHErN213NDJoR3ZIKzEzTDZMUWdNaUtHZEUvRkVTT1gyWllLUjlyZzd5ZFFsbkpHeUk4L1ZCQldRaXVkZXgyWkNweGtwZmg4ZGd2UkxncER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6IldSWDh5TlUxL3pUdWFZRmJOampKUzA5aXpxeE9FbHlFbnZWaW5RNXBudFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlmMFZZeWxPUmhPS0duZllNaVAwOXciLCJwaG9uZUlkIjoiZTIwNmUyNjEtM2RhMi00ZGU4LTg3ZTMtODZkZDI3NTc5ZmQ2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMNlZraEgvR1IzRzBVNzc0VXJJT2xvTVMzVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRzVOS0FSUWVVbHhmeDJxMzAvTEhCMlFkZ2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSEpaRTRUOVMiLCJtZSI6eyJpZCI6IjI2MDk3MTgxNjk1Njo2OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYWtvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLNnBsc2tFRUtqb21yUUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5d3RnQXloRXY3bEVkQUFKbDFBTmRPNks0M3lTTzN6UDNEZ0pjS1NPaW13PSIsImFjY291bnRTaWduYXR1cmUiOiJyekxBS05YbFJRWkpRa1NSS1JEK1hLb3c5R3RPakgwbVBCb2p6ai9zRHlnYVMycGNzWHhQdTRqVnNjSVQ2OXI5cUpWT2MyN3JtdlRKaElDVEwzbjZCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSlIrTTV4UHpxbENwanZ3UWY5MDd0VG9ubHhBQ0R6cllqaTgrcnRFRlZmRHlJMTVpekdwYW1LZUtUdTJpcGcyOVpjRi9Na0NEb0htdjVZSW0xb1pnQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjA5NzE4MTY5NTY6NjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmNMWUFNb1JMKzVSSFFBQ1pkUURYVHVpdU44a2p0OHo5dzRDWENram9wcyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDEwMzk4OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCYVcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KING MAKO",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "260971816956", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'MAKO',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
