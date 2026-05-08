const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

// Clear existing features to avoid duplicates
db.prepare('DELETE FROM service_features').run();

const features = [
  // Web Applications (ID 4)
  { service_id: 4, section: 'why', title_ar: 'تعزيز تفاعلك مع العملاء', title_en: 'Enhance Customer Engagement', description_ar: 'رفع مستوى الرضا والولاء عبر تجارب رقمية سلسة.', description_en: 'Increase satisfaction and loyalty through seamless digital experiences.', icon: 'fa-users' },
  { service_id: 4, section: 'why', title_ar: 'كفاءة تقديم الخدمات', title_en: 'Service Efficiency', description_ar: 'تقديم الخدمات بفعالية قصوى عبر القنوات الرقمية المبتكرة.', description_en: 'Deliver services with maximum effectiveness through innovative digital channels.', icon: 'fa-cogs' },
  { service_id: 4, section: 'why', title_ar: 'ترسيخ سمعة العلامة التجارية', title_en: 'Brand Reputation', description_ar: 'بناء صورة ذهنية قوية من خلال حلول عصرية ومتجاوبة.', description_en: 'Build a strong brand image through modern and responsive solutions.', icon: 'fa-award' },
  { service_id: 4, section: 'why', title_ar: 'النمو المرن', title_en: 'Scalable Growth', description_ar: 'القدرة على توسيع المنصات بما يواكب نمو أعمالكم وتطور احتياجاتكم.', description_en: 'The ability to scale platforms to keep pace with your business growth and evolving needs.', icon: 'fa-chart-line' },

  { service_id: 4, section: 'how', title_ar: 'ربط وتكامل الأنظمة', title_en: 'System Integration', description_ar: 'دمج التطبيقات والمنصات وقواعد البيانات في بيئة عمل موحدة ومتماسكة.', description_en: 'Integrating applications, platforms, and databases into a unified and cohesive work environment.', icon: 'fa-link' },
  { service_id: 4, section: 'how', title_ar: 'تطوير وإدارة واجهات البرمجة', title_en: 'API Development', description_ar: 'بناء وإدارة واجهات برمجة التطبيقات لضمان اتصال آمن وقابل للتوسع.', description_en: 'Building and managing APIs to ensure secure and scalable connectivity.', icon: 'fa-code' },
  { service_id: 4, section: 'how', title_ar: 'أتمتة سير العمل', title_en: 'Workflow Automation', description_ar: 'تبسيط العمليات عبر ربط الأنظمة وأتمتة المهام المتكررة لرفع الكفاءة.', description_en: 'Simplifying processes by linking systems and automating repetitive tasks to increase efficiency.', icon: 'fa-sync' },
  { service_id: 4, section: 'how', title_ar: 'التكامل السحابي والمحلي', title_en: 'Cloud & On-prem Integration', description_ar: 'ضمان العمل المشترك والسلس بين البيئات السحابية والأنظمة الداخلية.', description_en: 'Ensuring smooth interoperability between cloud environments and internal systems.', icon: 'fa-cloud' },
  { service_id: 4, section: 'how', title_ar: 'تبادل البيانات الفوري', title_en: 'Real-time Data Exchange', description_ar: 'تمكين تدفق البيانات اللحظي والدقيق لتعزيز وضوح الرؤية وسرعة اتخاذ القرار.', description_en: 'Enabling real-time, accurate data flow to enhance visibility and speed up decision-making.', icon: 'fa-bolt' },

  // AI Agent (ID 5)
  { service_id: 5, section: 'how', title_ar: 'تحرير الطاقة البشرية', title_en: 'Freeing Human Potential', description_ar: 'إيقاف استنزاف موظفيك في المهام الرتيبة وتوفير وقتهم للإبداع.', description_en: 'Stop draining your employees on repetitive tasks and free their time for creativity.', icon: 'fa-brain' },
  { service_id: 5, section: 'how', title_ar: 'الاستجابة بسرعة الضوء', title_en: 'Light-speed Response', description_ar: 'القدرة على التوسع اللحظي لخدمة آلاف العملاء في وقت واحد وباهتمام كامل.', description_en: 'The ability to scale instantly to serve thousands of customers simultaneously with full attention.', icon: 'fa-bolt' },
  { service_id: 5, section: 'how', title_ar: 'تحويل البيانات إلى قرارات', title_en: 'Data-driven Decisions', description_ar: 'جعل الوكيل الذكي عقلاً تحليلياً يحول البيانات الصامتة إلى فرص ربحية.', description_en: 'Making the smart agent an analytical mind that turns silent data into profitable opportunities.', icon: 'fa-chart-pie' },
  { service_id: 5, section: 'how', title_ar: 'تجربة عملاء شخصية', title_en: 'Personalized Experience', description_ar: 'الوكيل يعرف سياق العميل وتفضيلاته ويتحدث معه بلهجة ودودة وذكية.', description_en: 'The agent knows the customer\'s context and preferences and speaks with a friendly, smart tone.', icon: 'fa-user-check' },

  // AI Automation (ID 6)
  { service_id: 6, section: 'why', title_ar: 'خفض التكاليف التشغيلية', title_en: 'Reduce Operating Costs', description_ar: 'تقليل الهدر التشغيلي بنسب قد تصل إلى 60%.', description_en: 'Reduce operational waste by up to 60%.', icon: 'fa-money-bill-wave' },
  { service_id: 6, section: 'why', title_ar: 'القضاء على الخطأ البشري', title_en: 'Eliminate Human Error', description_ar: 'دقة متناهية في البيانات والعمليات الحساسة (مثل الحسابات والتدقيق).', description_en: 'Extreme precision in data and sensitive processes (such as accounting and auditing).', icon: 'fa-check-double' },
  { service_id: 6, section: 'why', title_ar: 'السرعة الفائقة', title_en: 'Super Speed', description_ar: 'إنجاز المهام في أجزاء من الثانية، مما يحسن من زمن الاستجابة للسوق.', description_en: 'Complete tasks in fractions of a second, improving market response time.', icon: 'fa-tachometer-alt' },
  { service_id: 6, section: 'why', title_ar: 'التفرغ للاستراتيجية', title_en: 'Focus on Strategy', description_ar: 'تحرير الموظفين للقيام بمهام تتطلب التفكير الإبداعي وبناء الصفقات.', description_en: 'Freeing employees to perform tasks that require creative thinking and deal building.', icon: 'fa-lightbulb' },

  { service_id: 6, section: 'how', title_ar: 'الأتمتة المدركة', title_en: 'Cognitive Automation', description_ar: 'فهم المحتوى وقراءة العقود واستخراج البيانات من الصور وسياق الإيميلات.', description_en: 'Understand content, read contracts, and extract data from images and email context.', icon: 'fa-eye' },
  { service_id: 6, section: 'how', title_ar: 'الربط الشامل', title_en: 'Total Connectivity', description_ar: 'جعل جميع الأنظمة (موقع، تطبيق، ERP، مخازن) تتحدث لغة واحدة.', description_en: 'Make all systems (website, app, ERP, warehouses) speak one language.', icon: 'fa-network-wired' },
  { service_id: 6, section: 'how', title_ar: 'حلول مفصلة للسوق السعودي', title_en: 'Tailored Saudi Solutions', description_ar: 'مراعاة القوانين المحلية (زكاة وضريبة) واللغة العربية.', description_en: 'Observing local laws (Zakat and Tax) and the Arabic language.', icon: 'fa-mosque' },
  { service_id: 6, section: 'how', title_ar: 'التحسين الذاتي', title_en: 'Self-Improvement', description_ar: 'مراقبة المسارات واقتراح طرق لتسريع العمل وتجاوز عقبات دورة العمل.', description_en: 'Monitor paths and suggest ways to speed up work and overcome workflow bottlenecks.', icon: 'fa-arrow-trend-up' },
];

const insert = db.prepare(`
  INSERT INTO service_features (service_id, section, title_ar, title_en, description_ar, description_en, icon)
  VALUES (@service_id, @section, @title_ar, @title_en, @description_ar, @description_en, @icon)
`);

const insertMany = db.transaction((items) => {
  for (const item of items) insert.run(item);
});

insertMany(features);
console.log('Successfully inserted features for all services.');
