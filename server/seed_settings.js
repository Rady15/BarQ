const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const settings = [
  { key: 'about_text_ar', value: 'نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو. انطلقنا لنطوع أحدث تقنيات الـ AI لخدمة الشركات الطموحة، محولين الأفكار المعقدة إلى تطبيقات واقعية ووكلاء ذكيين يعملون بدقة البرق.\n\nبصفتنا شركاء معتمدين لعمالقة التقنية مثل Microsoft، Oracle، وOdoo، نضمن لك حلولاً برمجية تتوافق مع أعلى المعايير العالمية وبلمسة إبداعية محلية.' },
  { key: 'about_text_en', value: 'We at Barq Tech, a Saudi-born technology company, believe that AI is not just a tool, but the new engine for growth. We set out to adapt the latest AI technologies to serve ambitious companies, transforming complex ideas into realistic applications and intelligent agents that work with the precision of lightning.\n\nAs certified partners of tech giants like Microsoft, Oracle, and Odoo, we guarantee you software solutions that comply with the highest international standards with a local creative touch.' },
  { key: 'vision_text_ar', value: 'التزاماً منا بدعم رؤية المملكة 2030، نضع نصب أعيننا تسخير نقاط القوة الفريدة لوطننا لتلبية المتطلبات التقنية المحلية بكفاءة عالية. ومن خلال حصيلة خبراتنا العميقة وتخصصنا الدقيق، نقود الابتكارات الرقمية ونقدم خدمات ذكية مدعومة تكنولوجياً لتمكين عملائنا من تحقيق التفوق والريادة.' },
  { key: 'vision_text_en', value: 'In commitment to supporting the Kingdom\'s Vision 2030, we set our sights on harnessing our country\'s unique strengths to meet local technical requirements with high efficiency. Through our deep experience and precise specialization, we lead digital innovations and provide technology-backed smart services to enable our clients to achieve excellence and leadership.' }
];

const upsert = db.prepare(`
  INSERT INTO settings (setting_key, setting_value, setting_group) 
  VALUES (?, ?, 'general')
  ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value, updated_at = CURRENT_TIMESTAMP
`);

db.transaction(() => {
  for (const s of settings) {
    upsert.run(s.key, s.value);
  }
})();

console.log('Successfully updated site settings.');
