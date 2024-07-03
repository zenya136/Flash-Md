const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0liYk9YOU1rb0dJQTFVL1lObWhFbVZVc3NxeDVMd3N1QmtBZ2dRWTFWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibS9BOVJrdEJEaUJFcyttOE1NMTNvK2JuU3NKTDVVeEZlcnNKMUk4eElBdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRE94Q3pTTE1GSnRoRmluZzBJQURrWFhzZmdFaXdZUHF4ZDB6dkM0QW1JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QW1idEVBZ0VqZDVLd2UvdGxlb1FPZUpTRWQrR3lNdldTSVVkd2EyUzFVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJBZzFEZ3hQZ21maWt3aEkvYjJvMm1VUEIzMHRqcHVFN1gwT1VnZ2pjWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh1SzRoa3g2RHNyY1l3MllPY3NtWUdJd0gzR0tEdzJET09Zd2QxU1A1MkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktYT1JGNVk1QzNReTBWT2JkV2kwYzNtdG51QjZwem5JZUp0NVVIWkJtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05INVhTTGJTUHU0b0RwUzdnem42OHFaTStkWXZWdmt3VnZRbExxbVFrTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpJb2Y2WWliMjg0WjhnVVhIZnA0SUNBTVZJeDRQT1E1bVdKMGt0Q2FoK29YR3ZXdU5vR0h2N3hMUWl6eVpuSkFiUVM4UW9LM2ZoV0c3WWxVY0lOZERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE1LCJhZHZTZWNyZXRLZXkiOiJObGZZaXFtV1p3eDR6TDhGcHZ5TFp5UE42anhnbTV1QUN3Tk94MnVBdmpvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrZnRSYWVhZlRydWhBaTc3alNvX2xBIiwicGhvbmVJZCI6IjJlZmFlZjdlLTA4ZGMtNDU3OS1iN2E5LTJmYzdjMDY4OTViMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTEl1ZnU3dzh3QTA0OEpZYWlMY1c4N3dweUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWJrYkt0cFR0dGJma0IzWisvSjcrMU0yK2M4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZKN0ZYWDcyIiwibWUiOnsiaWQiOiIyNjA5NzE4MTY5NTY6NjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWFrbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3VwbHNrRUVOS21sYlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOXd0Z0F5aEV2N2xFZEFBSmwxQU5kTzZLNDN5U08zelAzRGdKY0tTT2ltdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicGVvK2VrTTRCMER4N3MrZnEzVFRJb3luUmpxeWpJYXNrZm5WZ1dRWW94QWpvZGFFTjJZS2NkNTF3Tk1HZTBTOGVuc2VidTRQWk9ISWNFZ1k5TFFrQXc9PSIsImRldmljZVNpZ25hdHVyZSI6InNJcmdvY2ovN09xcG01c3Q1eW5BUnljTFJJYlJCTUkra2tvZGVDcGhkVTdJQ2dqaWE4VWNwYmxZbmpFcUQ1ZU1FNW1ZdzUwY0hIVEZ2UkxVM2I4aEJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYwOTcxODE2OTU2OjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZjTFlBTW9STCs1UkhRQUNaZFFEWFR1aXVOOGtqdDh6OXc0Q1hDa2pvcHMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAwMTM2NjJ9',
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
