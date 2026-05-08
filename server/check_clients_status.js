const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const clients = db.prepare('SELECT * FROM clients').all();
console.log('Clients:', JSON.stringify(clients, null, 2));
