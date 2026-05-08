const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

const updates = [
  {
    id: 4,
    description_ar: 'في برق تك، نقوم بتصميم وتطوير تطبيقات ويب عالية الأداء تجمع بين الكفاءة التشغيلية، الأمان المطلق، والتصميم الذي يركز على تجربة المستخدم. بدءً من البوابات الرقمية ومنصات التجارة الإلكترونية وصولاً إلى الحلول البرمجية الضخمة للمؤسسات، نبتكر تطبيقاتٍ صُممت لتقدم أداءً قابلاً للتوسع وتجارب تفاعلية ملهمة عبر مختلف القطاعات. ومن خلال دمج أحدث أطر العمل والتصاميم المتجاوبة، والبنى التحتية القوية، نضمن أن يكون كل حل تقني نقدمه موثوقاً، سهل الوصول، ومتناغماً تماماً مع أهداف أعمالكم.',
    description_en: 'At Barq Tech, we design and develop high-performance web applications that combine operational efficiency, absolute security, and user-centric design. From digital portals and e-commerce platforms to large-scale enterprise software solutions, we create applications designed to deliver scalable performance and inspiring interactive experiences across various sectors.'
  },
  {
    id: 5,
    description_ar: 'في "برق تك"، لا نقدم مجرد "بوتات" للدردشة، بل نصمم وكلاء ذكاء اصطناعي مستقلين AI Agents يمتلكون القدرة على التفكير، التحليل، واتخاذ الإجراءات. هؤلاء الوكلاء هم أنظمة برمجية متطورة تعمل كقوة عاملة رقمية، قادرة على تنفيذ مهام معقدة من البداية إلى النهاية دون تدخل بشري دائم، مما يمنح منشأتك "سرعة البرق" في الأداء.',
    description_en: 'At Barq Tech, we don\'t just provide "chatbots," but we design independent AI Agents that have the ability to think, analyze, and take action. These agents are sophisticated software systems that act as a digital workforce, capable of executing complex tasks from start to finish without permanent human intervention, giving your organization "lightning speed" in performance.'
  },
  {
    id: 6,
    description_ar: 'في برق تك، نقوم بتحويل العمليات التشغيلية اليدوية والورقية إلى مسارات رقمية ذكية تعمل ذاتياً. ندمج تقنيات الـ AI مع أنظمة شركتك لتمكينها من "إدراك" المهام وتنفيذها دون تدخل بشري. من معالجة الفواتير آلياً، إلى إدارة سلاسل الإمداد وتوظيف البيانات، نحن نصمم حلولاً تجعل شركتك تعمل "بأقل جهد بشري وأعلى دقة رقمية".',
    description_en: 'At Barq Tech, we transform manual and paper-based operational processes into smart, autonomous digital paths. We integrate AI technologies with your company\'s systems to enable them to "recognize" and execute tasks without human intervention. From automated invoice processing to supply chain management and data employment, we design solutions that make your company work with "minimum human effort and maximum digital precision."'
  }
];

const updateStmt = db.prepare('UPDATE services SET description_ar = ?, description_en = ? WHERE id = ?');

db.transaction(() => {
  for (const s of updates) {
    updateStmt.run(s.description_ar, s.description_en, s.id);
  }
})();

console.log('Cleaned up service descriptions.');
