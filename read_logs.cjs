const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'server', 'barqtech.db'));
const logs = db.prepare('SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 5').all();
console.log(JSON.stringify(logs, null, 2));
