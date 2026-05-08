const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const testimonials = db.prepare('SELECT * FROM testimonials').all();
console.log('Testimonials:', JSON.stringify(testimonials, null, 2));
