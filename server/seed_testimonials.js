const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const testimonials = [
  {
    name_ar: 'عبدالعزيز القحطاني',
    name_en: 'Abdulaziz Al-Qahtani',
    role_ar: 'مدير التنفيذي لشركة التقنيات الحديثة',
    role_en: 'CEO of Modern Tech Co.',
    text_ar: 'ساعدتنا برق تك في أتمتة عملياتنا بالكامل، مما وفر لنا أكثر من 30% من الوقت التشغيلي. فريق محترف وحلول ذكية فعلاً.',
    text_en: 'Barq Tech helped us automate our operations completely, saving us more than 30% of operational time. A professional team and truly smart solutions.',
    is_active: 1
  },
  {
    name_ar: 'سارة الأحمد',
    name_en: 'Sara Al-Ahmad',
    role_ar: 'مؤسسة متجر إشراق',
    role_en: 'Founder of Ishraq Store',
    text_ar: 'تجربتنا مع برق تك في تطوير متجرنا الإلكتروني كانت استثنائية. الدقة في المواعيد والابتكار في التصميم هما ما يميزهم.',
    text_en: 'Our experience with Barq Tech in developing our e-store was exceptional. Punctuality and innovation in design are what distinguish them.',
    is_active: 1
  },
  {
    name_ar: 'محمد الشمري',
    name_en: 'Mohammed Al-Shammari',
    role_ar: 'مدير العمليات في مؤسسة البناء الرقمي',
    role_en: 'Operations Manager at Digital Construction',
    text_ar: 'وكلاء الذكاء الاصطناعي الذين طورتهم برق تك غيروا طريقة تعاملنا مع العملاء. الاستجابة أصبحت فورية والرضا زاد بشكل ملحوظ.',
    text_en: 'The AI agents developed by Barq Tech changed how we deal with customers. Response became instant and satisfaction increased significantly.',
    is_active: 1
  }
];

const insert = db.prepare(`
  INSERT INTO testimonials (name_ar, name_en, role_ar, role_en, text_ar, text_en, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const t of testimonials) {
    insert.run(t.name_ar, t.name_en, t.role_ar, t.role_en, t.text_ar, t.text_en, t.is_active);
  }
})();

console.log('Successfully seeded testimonials.');
