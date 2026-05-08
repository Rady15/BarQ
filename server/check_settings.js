const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const settings = db.prepare('SELECT * FROM settings').all();
console.log('Settings:', JSON.stringify(settings, null, 2));
