const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const services = db.prepare('SELECT id, title_en, route FROM services').all();
console.log(JSON.stringify(services, null, 2));
