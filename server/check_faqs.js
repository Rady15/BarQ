const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const faqs = db.prepare('SELECT * FROM faqs').all();
console.log('FAQs:', JSON.stringify(faqs, null, 2));
