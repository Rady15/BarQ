const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'barqtech.db'));

// Clean old testimonials first to ensure exactly these 5 reviews are in place
db.exec('DELETE FROM testimonials');

const testimonials = [
  {
    name_ar: 'د. هبة إبراهيم',
    name_en: 'Dr. Heba Ibrahim',
    role_ar: 'المدير العام لشركة Ibss Innovation',
    role_en: 'General Manager of Ibss Innovation',
    text_ar: 'تجربتنا مع شركة برق تكنولوجي كانت رائعة جدًا، ومن أفضل القرارات اللي أخذناها في تطوير أعمالنا. الفريق كان متعاون واحترافي من أول يوم، وفهم احتياجاتنا بشكل سريع، واشتغل معنا على تنفيذ نظام Odoo كامل ومتكامل بالإضافة إلى نظام CRM مخصص ساعدنا بشكل كبير في تنظيم جميع عملياتنا الداخلية بطريقة أكثر كفاءة ووضوح. بفضل الحلول اللي قدموها لنا، قدرنا نحسن إدارة العملاء، تنظيم المبيعات، متابعة العمليات اليومية، وربط أقسام الشركة بشكل أفضل داخل نظام واحد سهل وعملي. أكثر شيء أعجبنا هو اهتمامهم بالتفاصيل، سرعة التنفيذ، والدعم المستمر اللي خلانا نحس أننا نتعامل مع شريك نجاح حقيقي.',
    text_en: 'Our experience with Barq Tech was truly wonderful, and one of the best decisions we made for our business development. The team was collaborative and professional from day one, quickly understanding our needs and working with us to implement a fully integrated Odoo system along with a custom CRM. This significantly helped organize all our internal operations efficiently and clearly. Thanks to their solutions, we improved client management, sales organization, and department integration within a simple, practical system. Their attention to detail, speed of execution, and continuous support made us feel like we had a true partner in success.',
    is_active: 1
  },
  {
    name_ar: 'سامر عيسى',
    name_en: 'Samer Issa',
    role_ar: 'المدير العام لشركة أفاتار',
    role_en: 'General Manager of Avatar',
    text_ar: 'تعاملنا مع برق تك كان تجربة مميزة فعلًا. كنا بحاجة إلى موقع إلكتروني يعكس شخصية أفاتار كشركة متخصصة في الدعاية والإعلان بطريقة احترافية وجذابة، وفريق برق تك قدر يقدم لنا حل متكامل تجاوز توقعاتنا. اشتغلوا على بناء موقع عصري يعبر عن هويتنا بشكل واضح، مع تصميم بصري مميز، عرض منظم لخدماتنا، وتجربة استخدام سهلة وسلسة على مختلف الأجهزة. كذلك اهتموا بجوانب مهمة مثل سرعة الأداء، وضوح المحتوى، وإظهار أعمالنا بطريقة تساعد العملاء على فهم خدماتنا والتواصل معنا بسهولة أكبر. أكثر شيء قدّرناه هو اهتمامهم الحقيقي بالتفاصيل، وحرصهم على أن يكون الموقع أداة فعالة لدعم أعمالنا وليس مجرد واجهة فقط. الفريق كان متجاوب، محترف، وسريع في التنفيذ، وهذا صنع فرق كبير معنا. نشكر برق تك على هذا العمل الرائع، وسعداء جدًا بهذا التعاون اللي ساعدنا في تعزيز حضورنا الرقمي بشكل أقوى وأكثر احترافية',
    text_en: 'Working with Barq Tech was a truly remarkable experience. We needed a professional, engaging website that reflects Avatar\'s identity as an advertising agency. The Barq Tech team delivered an integrated solution that exceeded our expectations, building a modern site with outstanding visual design and a seamless user experience across devices. The team was highly responsive, professional, and quick in execution, which made a huge difference for us. We thank Barq Tech for this wonderful work!',
    is_active: 1
  },
  {
    name_ar: 'يوسف جان',
    name_en: 'Yousef Jan',
    role_ar: 'المدير العام لشركة OSB',
    role_en: 'General Manager of OSB',
    text_ar: 'بصفتي المدير العام لشركة OSB، كنت أبحث عن جهة تقنية تستطيع تقديم موقع إلكتروني يعكس احترافية خدماتنا في مجال تأسيس الشركات ويعبر عن ثقة عملائنا بنا، والحقيقة أن برق تك قدمت لنا تجربة ممتازة من البداية حتى الإطلاق. الفريق استطاع بناء موقع متكامل يوضح خدماتنا بشكل منظم وواضح، وساعدنا في تقديم معلوماتنا بطريقة أكثر احترافية وسهولة للعملاء، سواء من ناحية التصميم، ترتيب المحتوى، أو سهولة الوصول للخدمات. ما أعجبني فعلًا هو قدرتهم على فهم طبيعة نشاطنا وتحويله إلى حضور رقمي يعكس هوية OSB بالشكل الصحيح. برق تك لم تقدم لنا مجرد موقع إلكتروني، بل ساعدتنا في بناء واجهة قوية تمثل شركتنا وتدعم نمو أعمالنا. التزامهم، سرعة استجابتهم، واهتمامهم بجودة العمل جعل التجربة ناجحة بكل المقاييس. أشكر فريق برق تك على هذا المستوى المميز، وأوصى بهم بكل ثقة لأي شركة تبحث عن شريك تقني يفهم احتياجها ويقدم نتائج حقيقية.',
    text_en: 'As the General Manager of OSB, I was looking for a technical partner capable of delivering a website that reflects the professionalism of our corporate setup services. Barq Tech provided us with an outstanding experience from inception to launch. The team built an integrated platform that showcases our services clearly and professionally. Their commitment, swift response, and attention to quality made this experience successful by all metrics.',
    is_active: 1
  },
  {
    name_ar: 'محمد برمدا',
    name_en: 'Mohamed Barmada',
    role_ar: 'المدير العام لمجمع أزهار السكني',
    role_en: 'General Manager of Azhar Compound',
    text_ar: 'بصفتي المدير العام لمجمع أزهار السكني، أود أن أعبر عن تقديري الكبير لفريق برق تك على العمل الاحترافي الذي قدموه لنا في تطوير تطبيق متكامل يخدم سكان المجمع ويرتقي بتجربة الحياة اليومية داخل المشروع. من البداية، أظهر فريق برق تك فهمًا واضحًا لاحتياجاتنا، ونجحوا في تصميم وتنفيذ تطبيق عملي وسهل الاستخدام ساعد السكان على الوصول للخدمات والمعلومات المهمة بكل سهولة، وساهم بشكل كبير في تحسين التواصل وتنظيم العديد من الجوانب التشغيلية داخل المجمع. ما يميز برق تك هو قدرتهم على تحويل الفكرة إلى حل رقمي فعّال يجمع بين الجودة، سهولة الاستخدام، والاهتمام بالتفاصيل، إلى جانب التزامهم العالي وسرعة استجابتهم طوال مراحل المشروع. نفخر بهذا التعاون، ونعتبر برق تك شريكًا تقنيًا موثوقًا ساعدنا في تقديم قيمة حقيقية لسكان مجمع أزهار، ونتطلع لمزيد من النجاحات معهم مستقبلًا.',
    text_en: 'As the General Manager of Azhar Compound, I want to express my gratitude to the Barq Tech team for their professional work in developing an integrated application serving compound residents and elevating their daily living experience. From the start, they demonstrated a clear understanding of our needs, designing and executing a highly practical, user-friendly app that facilitated resident communications and operations. We are proud of this partnership.',
    is_active: 1
  },
  {
    name_ar: 'المدير العام لشركة Coffee Selection',
    name_en: 'General Manager of Coffee Selection',
    role_ar: 'المدير العام لشركة Coffee Selection ومحمصة ريفيكس',
    role_en: 'General Manager of Coffee Selection & Refix Roastery',
    text_ar: 'بصفتي المدير العام لشركة Coffee Selection، يسعدني أن أشارك تجربتنا مع شركة برق تك التي كانت تجربة مميزة بكل المقاييس. عملنا معهم على مشروع متكامل شمل تطوير نظام رقمي كامل للمحمصة، بالإضافة إلى موقع إلكتروني احترافي وتطبيق موبايل باسم Refix، وكان الهدف هو ربط جميع عملياتنا في منصة واحدة ذكية وسهلة الاستخدام. برق تك نجحوا في تنفيذ نظام متكامل يربط عملياتنا التشغيلية من الإنتاج داخل المحمصة، إلى إدارة الطلبات، والتكامل مع شركات الشحن الخارجية، بالإضافة إلى ربط النظام مع Meta لإدارة الحملات والتسويق بشكل أكثر احترافية. كذلك تم تطوير حلول تدعم التوصيل وإدارة الطلبات بشكل سلس وسريع، مما ساعدنا على تحسين تجربة العملاء بشكل كبير. ما يميز فريق برق تك هو فهمهم العميق لطبيعة العمل، وقدرتهم على بناء حلول تقنية قابلة للتوسع وتخدم النمو المستقبلي للشركة، إلى جانب احترافيتهم العالية وسرعة تنفيذهم وحرصهم على التفاصيل. نحن في Coffee Selection نعتبر برق تك شريكًا تقنيًا حقيقيًا ساهم في تطوير أعمالنا بشكل واضح، ونشكرهم على هذا المستوى المتميز من الجودة والالتزام.',
    text_en: 'As the GM of Coffee Selection, I am delighted to share our outstanding experience with Barq Tech. We worked with them on an integrated system for our roastery, including a professional website and a mobile app called Refix. The goal was to unify all operations in one smart platform. Barq Tech successfully delivered a comprehensive ecosystem linking our production, order dispatching, shipping integration, and Meta marketing campaigns.',
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

console.log('Successfully seeded 5 custom testimonials.');
