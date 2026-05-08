const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const articles = [
  {
    title_ar: 'مستقبل الذكاء الاصطناعي في الشركات السعودية: رؤية 2030',
    title_en: 'The Future of AI in Saudi Companies: Vision 2030',
    slug: 'future-ai-saudi-vision-2030',
    excerpt_ar: 'كيف يساهم الذكاء الاصطناعي في تحقيق أهداف رؤية المملكة العربية السعودية 2030 وكيف تستفيد الشركات من هذا التحول.',
    excerpt_en: 'How AI contributes to achieving the goals of Saudi Vision 2030 and how companies benefit from this transformation.',
    content_ar: '<h2>الذكاء الاصطناعي كمحرك للنمو</h2><p>تعد رؤية المملكة 2030 خارطة طريق لمستقبل مزدهر، والذكاء الاصطناعي يقع في قلب هذا التحول الرقمي. في برق تك، نساعد الشركات على تبني هذه التقنيات لزيادة التنافسية والابتكار...</p>',
    content_en: '<h2>AI as an Engine for Growth</h2><p>Saudi Vision 2030 is a roadmap for a prosperous future, and AI is at the heart of this digital transformation. At Barq Tech, we help companies adopt these technologies...</p>',
    image: '/img/blog-ai.png',
    category: 'الذكاء الاصطناعي',
    tags: 'AI, Vision 2030, Saudi Arabia',
    status: 'published'
  },
  {
    title_ar: 'كيف تساعد الأتمتة الشركات الصغيرة والمتوسطة في توفير الوقت',
    title_en: 'How Automation Helps SMEs Save Time',
    slug: 'automation-efficiency-smes',
    excerpt_ar: 'دليل شامل حول أهمية الأتمتة في تحسين الإنتاجية وتوفير التكاليف التشغيلية للشركات الصغيرة والمتوسطة.',
    excerpt_en: 'A comprehensive guide on the importance of automation in improving productivity and saving operational costs for SMEs.',
    content_ar: '<h2>الأتمتة ليست رفاهية</h2><p>في سوق العمل المتسارع، لم تعد الأتمتة مجرد خيار، بل هي ضرورة للبقاء. من خلال أتمتة المهام الرتيبة، يمكن للموظفين التركيز على الإبداع والتطوير...</p>',
    content_en: '<h2>Automation is Not a Luxury</h2><p>In a fast-paced market, automation is no longer an option, but a necessity for survival. By automating repetitive tasks, employees can focus on creativity...</p>',
    image: '/img/blog-automation.png',
    category: 'أتمتة العمليات',
    tags: 'Automation, Business, Efficiency',
    status: 'published'
  },
  {
    title_ar: 'أحدث اتجاهات تصميم المواقع لعام 2026',
    title_en: 'Latest Web Design Trends for 2026',
    slug: 'web-design-trends-2026',
    excerpt_ar: 'استعراض لأبرز تقنيات واتجاهات تصميم واجهات المستخدم وتجربة المستخدم التي ستشكل مستقبل الويب.',
    excerpt_en: 'Review of the most prominent UI/UX design technologies and trends that will shape the future of the web.',
    content_ar: '<h2>التصميم الذي يركز على المستخدم</h2><p>عالم الويب يتطور باستمرار. في عام 2026، سنرى تركيزاً أكبر على الانغماس البصري، السرعة الفائقة، والواجهات الذكية التي تتكيف مع احتياجات المستخدم...</p>',
    content_en: '<h2>User-Centric Design</h2><p>The web world is constantly evolving. In 2026, we will see a greater focus on visual immersion, hyper-speed, and smart interfaces...</p>',
    image: '/img/blog-web.png',
    category: 'تطوير الويب',
    tags: 'Web Design, UX, UI, Trends',
    status: 'published'
  }
];

const insert = db.prepare(`
  INSERT INTO articles (title_ar, title_en, slug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, status, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
`);

db.transaction(() => {
  for (const a of articles) {
    insert.run(a.title_ar, a.title_en, a.slug, a.content_ar, a.content_en, a.excerpt_ar, a.excerpt_en, a.image, a.category, a.tags, a.status);
  }
})();

console.log('Successfully seeded articles with images.');
