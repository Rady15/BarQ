/* =============================================
   BARQ TECH — DATABASE INITIALIZATION
   SQLite via better-sqlite3
   ============================================= */

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'barqtech.db');

function initDatabase() {
  const db = new Database(DB_PATH);

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // ─── USERS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin' CHECK(role IN ('admin', 'editor', 'viewer')),
      avatar TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── SERVICES TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ar TEXT NOT NULL,
      title_en TEXT,
      description_ar TEXT,
      description_en TEXT,
      excerpt_ar TEXT,
      excerpt_en TEXT,
      icon TEXT,
      icon_image TEXT,
      image TEXT,
      route TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── SERVICE FEATURES TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS service_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER NOT NULL,
      title_ar TEXT,
      title_en TEXT,
      description_ar TEXT,
      description_en TEXT,
      icon TEXT,
      section TEXT DEFAULT 'why' CHECK(section IN ('why', 'how')),
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
    )
  `);

  // ─── CLIENTS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_en TEXT,
      logo TEXT,
      website TEXT,
      type TEXT DEFAULT 'client' CHECK(type IN ('client', 'partner')),
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── PROJECTS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ar TEXT NOT NULL,
      title_en TEXT,
      description_ar TEXT,
      description_en TEXT,
      client_name TEXT,
      image TEXT,
      category TEXT,
      technologies TEXT,
      project_url TEXT,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── BLOG ARTICLES TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ar TEXT NOT NULL,
      title_en TEXT,
      slug TEXT UNIQUE,
      content_ar TEXT,
      content_en TEXT,
      excerpt_ar TEXT,
      excerpt_en TEXT,
      image TEXT,
      category TEXT,
      tags TEXT,
      author_id INTEGER,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
      views INTEGER DEFAULT 0,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `);

  // ─── FAQ TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_ar TEXT NOT NULL,
      question_en TEXT,
      answer_ar TEXT NOT NULL,
      answer_en TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── TEAM MEMBERS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ar TEXT NOT NULL,
      name_en TEXT,
      role_ar TEXT,
      role_en TEXT,
      bio_ar TEXT,
      bio_en TEXT,
      image TEXT,
      email TEXT,
      linkedin TEXT,
      twitter TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── TESTIMONIALS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ar TEXT NOT NULL,
      name_en TEXT,
      role_ar TEXT,
      role_en TEXT,
      company TEXT,
      text_ar TEXT NOT NULL,
      text_en TEXT,
      image TEXT,
      rating INTEGER DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── CONTACT MESSAGES TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      is_replied INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── SEO SETTINGS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS seo_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_name TEXT NOT NULL,
      page_path TEXT UNIQUE NOT NULL,
      title TEXT,
      description TEXT,
      keywords TEXT,
      og_image TEXT,
      canonical_url TEXT,
      score INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── AUDIT LOGS TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id INTEGER,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Migrate audit_logs if old admin_id column exists
  try {
    const info = db.pragma('table_info(audit_logs)');
    const hasAdminId = info.some(col => col.name === 'admin_id');
    if (hasAdminId) {
      db.exec('ALTER TABLE audit_logs RENAME COLUMN admin_id TO user_id');
    }
  } catch (e) {
    console.log('Migration Note:', e.message);
  }


  // ─── MEDIA TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT,
      mime_type TEXT,
      size INTEGER,
      path TEXT NOT NULL,
      alt_text TEXT,
      uploaded_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id)
    )
  `);

  // ─── ANALYTICS LOG TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS analytics_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path TEXT,
      visitor_ip TEXT,
      user_agent TEXT,
      referrer TEXT,
      country TEXT,
      device TEXT,
      browser TEXT,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── NEWSLETTER SUBSCRIPTIONS ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── SYSTEM ERROR LOGS ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS system_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT DEFAULT 'error', -- error, warning, info
      message TEXT,
      stack TEXT,
      path TEXT,
      method TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ─── INDEXES FOR PERFORMANCE ───
  db.exec('CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_log(visited_at)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_audit_date ON audit_logs(created_at)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_system_logs_date ON system_logs(created_at)');

  // ═══════════════════════════════════════
  //  SEED DEFAULT DATA
  // ═══════════════════════════════════════

  // Default admin user
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@barqtech.ai');
  if (!adminExists) {
    const hash = bcrypt.hashSync('barq2024', 10);
    db.prepare(`
      INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
    `).run('مدير النظام', 'admin@barqtech.ai', hash, 'admin');
  }

  // Default services
  const servicesCount = db.prepare('SELECT COUNT(*) as count FROM services').get();
  if (servicesCount.count === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (title_ar, title_en, description_ar, description_en, excerpt_ar, excerpt_en, icon, icon_image, image, route, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    // Service 1: Web Applications Development
    insertService.run(
      'تطوير تطبيقات الويب', 'Web Applications Development',
      `في برق تك، نقوم بتصميم وتطوير تطبيقات ويب عالية الأداء تجمع بين الكفاءة التشغيلية، الأمان المطلق، والتصميم الذي يركز على تجربة المستخدم. بدءً من البوابات الرقمية ومنصات التجارة الإلكترونية وصولاً إلى الحلول البرمجية الضخمة للمؤسسات، نبتكر تطبيقاتٍ صُممت لتقدم أداءً قابلاً للتوسع وتجارب تفاعلية ملهمة عبر مختلف القطاعات. 
      <br><br>
      <strong>كيف نصنع الفارق؟ How We Help:</strong>
      <ul>
        <li>ربط وتكامل الأنظمة: دمج التطبيقات والمنصات وقواعد البيانات في بيئة عمل موحدة ومتماسكة.</li>
        <li>تطوير وإدارة واجهات البرمجة: بناء وإدارة واجهات برمجة التطبيقات لضمان اتصال آمن وقابل للتوسع.</li>
        <li>أتمتة سير العمل: تبسيط العمليات عبر ربط الأنظمة وأتمتة المهام المتكررة لرفع الكفاءة.</li>
        <li>تبادل البيانات الفوري: تمكين تدفق البيانات اللحظي والدقيق لتعزيز وضوح الرؤية وسرعة اتخاذ القرار.</li>
      </ul>
      <strong>لماذا يمثل هذا أهمية لأعمالك؟</strong>
      <ul>
        <li>تعزيز تفاعلك مع العملاء: رفع مستوى الرضا والولاء عبر تجارب رقمية سلسة.</li>
        <li>كفاءة تقديم الخدمات: تقديم الخدمات بفعالية قصوى عبر القنوات الرقمية المبتكرة.</li>
        <li>النمو المرن: القدرة على توسيع المنصات بما يواكب نمو أعمالكم وتطور احتياجاتكم.</li>
      </ul>`,
      'At Barq Tech, we design and develop high-performance web applications that combine operational efficiency, absolute security, and user-centric design. From digital portals to large enterprise solutions, we create applications designed for scalability and inspiring interactive experiences.',
      'fa-laptop-code', '/img/services/web.png', '/service/web-applications', 1
    );

    // Service 2: AI Agents
    insertService.run(
      'وكلاء الذكاء الاصطناعي', 'AI Agent',
      `في "برق تك"، لا نقدم مجرد "بوتات" للدردشة، بل نصمم وكلاء ذكاء اصطناعي مستقلين AI Agents يمتلكون القدرة على التفكير، التحليل، واتخاذ الإجراءات. هؤلاء الوكلاء هم أنظمة برمجية متطورة تعمل كقوة عاملة رقمية، قادرة على تنفيذ مهام معقدة من البداية إلى النهاية دون تدخل بشري دائم، مما يمنح منشأتك "سرعة البرق" في الأداء.
      <br><br>
      <strong>كيف نصنع الفارق؟ How We Help:</strong>
      <ul>
        <li>1. تحرير الطاقة البشرية: إيقاف استنزاف موظفيك في المهام الرتيبة، مما يتيح لفريقك التركيز على الإبداع والتخطيط.</li>
        <li>2. الاستجابة بسرعة الضوء: القدرة على التوسع اللحظي لخدمة آلاف العملاء في وقت واحد بنفس الجودة.</li>
        <li>3. تحويل البيانات إلى قرارات: جعل الوكيل الذكي "عقلاً تحليلياً" يربط بين البيانات ليقترح أفضل الفرص الربحية.</li>
        <li>4. تجربة عملاء "شخصية": رفع ولاء العملاء من خلال ردود ذكية تفهم السياق والتفضيلات الشخصية.</li>
      </ul>`,
      'We design autonomous AI agents that possess the ability to think, analyze, and take actions, acting as a digital workforce for your business.',
      'fa-robot', '/img/services/ai.png', '/service/ai-agents', 2
    );

    // Service 3: AI Process Automation
    insertService.run(
      'أتمتة العمليات بالذكاء الاصطناعي', 'AI Process Automation',
      `في برق تك، نقوم بتحويل العمليات التشغيلية اليدوية والورقية إلى مسارات رقمية ذكية تعمل ذاتياً. ندمج تقنيات الـ AI مع أنظمة شركتك لتمكينها من "إدراك" المهام وتنفيذها دون تدخل بشري.
      <br><br>
      <strong>لماذا يمثل هذا أهمية لأعمالك؟</strong>
      <ul>
        <li>خفص التكاليف التشغيلية: تقليل الهدر التشغيلي بنسب قد تصل إلى 60%.</li>
        <li>القضاء على الخطأ البشري: ضمان دقة متناهية في البيانات والعمليات الحساسة.</li>
        <li>السرعة الفائقة: تحسين "زمن الاستجابة" للسوق بشكل مذهل.</li>
      </ul>
      <strong>كيف نصنع الفارق؟ How We Help:</strong>
      <ul>
        <li>الأتمتة "المدركة": أنظمتنا تفهم المحتوى، تقرأ العقود، وتفهم سياق الإيميلات.</li>
        <li>الربط الشامل: ربط موقعك وتطبيقك ونظام الـ ERP والمخازن ليتحدثوا لغة واحدة.</li>
        <li>حلول "مفصلة" للسوق السعودي: مراعاة القوانين المحلية (مثل فوترة هيئة الزكاة) واللغة العربية.</li>
      </ul>`,
      'We transform manual operational processes into intelligent self-operating digital pathways using AI and automation.',
      'fa-microchip', '/img/services/automation.png', '/service/ai-automation', 3
    );

    // --- SEED SERVICE FEATURES ---
    const insertFeature = db.prepare(`
      INSERT INTO service_features (service_id, title_ar, title_en, description_ar, description_en, icon, section, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Web Apps (Service 1)
    const webFeatures = [
      ['ربط وتكامل الأنظمة', 'Systems Integration', 'دمج التطبيقات والمنصات وقواعد البيانات في بيئة عمل موحدة ومتماسكة.', 'Merging applications, platforms and databases into a unified environment.', 'fa-link', 'how', 1],
      ['تطوير وإدارة واجهات البرمجة', 'API Management', 'بناء وإدارة واجهات برمجة التطبيقات لضمان اتصال آمن وقابل للتوسع.', 'Building and managing APIs for secure and scalable connectivity.', 'fa-shield-alt', 'how', 2],
      ['أتمتة سير العمل', 'Workflow Automation', 'تبسيط العمليات عبر ربط الأنظمة وأتمتة المهام المتكررة لرفع الكفاءة.', 'Streamlining processes by linking systems and automating tasks.', 'fa-sync', 'how', 3],
      ['تبادل البيانات الفوري', 'Real-time Data', 'تمكين تدفق البيانات اللحظي والدقيق لتعزيز وضوح الرؤية وسرعة اتخاذ القرار.', 'Enabling real-time data flow to enhance visibility and decision speed.', 'fa-bolt', 'how', 4],
      ['تعزيز تفاعلك مع العملاء', 'Customer Engagement', 'رفع مستوى الرضا والولاء عبر تجارب رقمية سلسة.', 'Raising satisfaction and loyalty through seamless digital experiences.', 'fa-users', 'why', 1],
      ['كفاءة تقديم الخدمات', 'Service Efficiency', 'تقديم الخدمات بفعالية قصوى عبر القنوات الرقمية المبتكرة.', 'Delivering services with maximum effectiveness via innovative digital channels.', 'fa-chart-line', 'why', 2],
      ['ترسيخ سمعة العلامة التجارية', 'Brand Reputation', 'بناء صورة ذهنية قوية من خلال حلول عصرية ومتجاوبة.', 'Building a strong image through modern and responsive solutions.', 'fa-award', 'why', 3],
      ['النمو المرن', 'Scalable Growth', 'القدرة على توسيع المنصات بما يواكب نمو أعمالكم وتطور احتياجاتكم.', 'Ability to expand platforms as your business grows and needs evolve.', 'fa-expand-arrows-alt', 'why', 4]
    ];
    webFeatures.forEach(f => insertFeature.run(1, ...f));

    // AI Agents (Service 2)
    const aiFeatures = [
      ['تحرير الطاقة البشرية', 'Freeing Human Energy', 'إيقاف استنزاف موظفيك في المهام الرتيبة، مما يتيح لفريقك التركيز على الإبداع.', 'Stopping employee drain in routine tasks, allowing your team to focus on creativity.', 'fa-user-check', 'how', 1],
      ['الاستجابة بسرعة الضوء', 'Light Speed Response', 'القدرة على التوسع اللحظي لخدمة آلاف العملاء في نفس اللحظة بتميز.', 'Capability for instant scalability to serve thousands of customers at the same moment.', 'fa-bolt', 'how', 2],
      ['تحويل البيانات إلى قرارات', 'Data to Decisions', 'جعل الوكيل الذكي "عقلاً تحليلياً" يخبرك بالفرص الربحية القادمة.', 'Making the smart agent an "analytical mind" that tells you about upcoming profit opportunities.', 'fa-brain', 'how', 3],
      ['تجربة عملاء "شخصية"', 'Personalized Experience', 'رفع ولاء العميل عبر ردود ذكية تفهم السياق والتفضيلات الشخصية.', 'Raising customer loyalty through smart responses that understand context and preferences.', 'fa-heart', 'how', 4]
    ];
    aiFeatures.forEach(f => insertFeature.run(2, ...f));

    // Automation (Service 3)
    const autoFeatures = [
      ['خفص التكاليف التشغيلية', 'Reduce Operational Costs', 'تقليل الهدر التشغيلي بنسب قد تصل إلى 60%.', 'Reducing operational waste by percentages up to 60%.', 'fa-money-bill-wave', 'why', 1],
      ['القضاء على الخطأ البشري', 'Eliminate Human Error', 'ضمان دقة متناهية في البيانات والعمليات الحساسة مثل الحسابات.', 'Ensuring extreme accuracy in sensitive data and operations like accounting.', 'fa-check-circle', 'why', 2],
      ['السرعة الفائقة', 'Ultra Speed', 'ما يستغرق ساعات لإنجازه، ينهيه نظام الأتمتة في أجزاء من الثانية.', 'What takes hours to complete, the automation system finishes in fractions of a second.', 'fa-running', 'why', 3],
      ['التفرغ للاستراتيجية', 'Focus on Strategy', 'يتحرر موظفوك للقيام بمهام تتطلب التفكير الإبداعي وبناء الصفقات.', 'Your employees are freed for tasks requiring creative thinking and deal-making.', 'fa-lightbulb', 'why', 4],
      ['الأتمتة "المدركة"', 'Perceptive Automation', 'أنظمة تفهم المحتوى، تقرأ العقود، وتفهم سياق الإيميلات.', 'Systems that understand content, read contracts, and understand email context.', 'fa-eye', 'how', 1],
      ['الربط الشامل', 'Universal Connectivity', 'ربط موقعك وتطبيقك ونظام الـ ERP والمخازن ليتحدثوا لغة واحدة.', 'Linking your site, app, ERP and warehouses to speak one language.', 'fa-network-wired', 'how', 2],
      ['حلول "مفصلة" للسوق السعودي', 'Saudi Market Solutions', 'مراعاة القوانين المحلية (مثل فوترة الزكاة) واللغة العربية.', 'Considering local laws (like Zakat billing) and the Arabic language.', 'fa-landmark', 'how', 3]
    ];
    autoFeatures.forEach(f => insertFeature.run(3, ...f));
  }

  // Default clients
  const clientsCount = db.prepare('SELECT COUNT(*) as count FROM clients').get();
  if (clientsCount.count === 0) {
    const insertClient = db.prepare('INSERT INTO clients (name, logo, type, sort_order) VALUES (?, ?, ?, ?)');
    const clientLogos = [
      'WhatsApp Image 2026-05-07 at 1.27.58 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 1.28.33 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 1.29.09 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 1.29.14 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 1.34.02 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 1.49.01 PM.jpeg',
      'v1.png'
    ];
    clientLogos.forEach((logo, i) => {
      insertClient.run(`Client ${i + 1}`, `/img/clients/${logo}`, 'client', i + 1);
    });
  }

  // Default FAQs
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faqs').get();
  if (faqCount.count === 0) {
    const insertFaq = db.prepare('INSERT INTO faqs (question_ar, question_en, answer_ar, answer_en, sort_order) VALUES (?, ?, ?, ?, ?)');
    const faqs = [
      ['ما هي خدمات برق تك؟', "What are Barq Tech's services?", 'نقدم حلولًا تقنية متكاملة تشمل تطوير المواقع والمتاجر الإلكترونية، الأنظمة الإدارية (ERP)، التحول الرقمي، حلول الذكاء الاصطناعي، الأتمتة، والاستشارات التقنية المصممة لدعم نمو الأعمال.', 'We provide integrated technical solutions including web development, e-commerce, ERP systems, digital transformation, AI solutions, automation, and technical consulting.'],
      ['من هم العملاء الذين تستهدفهم برق تك؟', "Who are Barq Tech's target clients?", 'نعمل مع الشركات الناشئة، المؤسسات الصغيرة والمتوسطة، والشركات الكبرى التي تبحث عن تطوير أعمالها رقميًا.', 'We work with startups, SMEs, and large corporations seeking digital business development.'],
      ['كيف تساعدنا برق تك في التحول الرقمي؟', 'How does Barq Tech help in digital transformation?', 'نقوم بتحليل احتياجات نشاطك التجاري، ثم نصمم حلولًا تقنية ذكية تساعدك على أتمتة العمليات وتحسين الأداء.', 'We analyze your business needs, then design smart technical solutions to automate processes and improve performance.'],
      ['هل تقدمون حلولًا مخصصة حسب نشاط الشركة؟', 'Do you provide custom solutions?', 'نعم، نؤمن أن كل نشاط تجاري له احتياجاته الخاصة، لذلك نقدم حلولًا مخصصة تناسب أهدافك.', 'Yes, we believe every business has unique needs, so we provide customized solutions.'],
      ['ما الفرق بين برق تك والشركات التقنية الأخرى؟', 'What differentiates Barq Tech?', 'نحن لا نقدم خدمات تقنية فقط، بل نركز على بناء حلول استراتيجية تعتمد على الابتكار والذكاء الاصطناعي.', 'We focus on building strategic solutions based on innovation and AI with measurable results.'],
      ['هل يمكنكم تطوير موقع إلكتروني احترافي؟', 'Can you develop a professional website?', 'بالتأكيد، نقوم بتصميم وتطوير مواقع ومتاجر إلكترونية حديثة وسريعة ومتوافقة مع محركات البحث.', 'Certainly, we design and develop modern, fast, and SEO-compatible websites and e-stores.'],
      ['هل توفرون دعمًا فنيًا بعد تنفيذ المشروع؟', 'Do you provide post-project support?', 'نعم، نقدم دعمًا فنيًا مستمرًا وخطط صيانة وتحديث لضمان استقرار الأنظمة.', 'Yes, we provide ongoing technical support and maintenance plans.'],
      ['كم تستغرق مدة تنفيذ المشروع؟', 'How long does project execution take?', 'تعتمد مدة التنفيذ على نوع المشروع وحجمه، لكننا نحرص على تقديم جدول زمني واضح.', 'It depends on project type and size, but we always provide a clear timeline.'],
      ['هل حلولكم مناسبة للشركات الناشئة؟', 'Are your solutions suitable for startups?', 'نعم، لدينا خدمات مرنة ومناسبة للشركات الناشئة تساعدها على بناء أساس تقني قوي.', 'Yes, we have flexible services suitable for startups to build a strong tech foundation.'],
      ['كيف يمكنني بدء العمل مع برق تك؟', 'How can I start working with Barq Tech?', 'يمكنك التواصل معنا عبر الموقع أو الواتساب لحجز استشارة أولية.', 'Contact us via the website or WhatsApp for an initial consultation.'],
      ['هل تقدمون خدمات SEO؟', 'Do you provide SEO services?', 'نعم، نساعد الشركات على تحسين ظهورها الرقمي عبر استراتيجيات SEO.', 'Yes, we help companies improve digital visibility through SEO strategies.'],
      ['لماذا أحتاج إلى الذكاء الاصطناعي في عملي؟', 'Why do I need AI in my business?', 'يساعد الذكاء الاصطناعي في تحسين الإنتاجية وتحليل البيانات وأتمتة المهام واتخاذ قرارات أذكى.', 'AI helps improve productivity, data analysis, task automation, and smarter decision-making.'],
    ];
    faqs.forEach((faq, i) => insertFaq.run(faq[0], faq[1], faq[2], faq[3], i + 1));
  }

  // Default projects
  const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  if (projectsCount.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (title_ar, title_en, description_ar, description_en, client_name, image, category, status, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProject.run(
      'نظام إدارة الموارد ERP', 'ERP Management System',
      'نظام سحابي متكامل لإدارة العمليات المالية والمخزون والموارد البشرية للشركات المتوسطة.',
      'An integrated cloud system for managing financial operations, inventory, and human resources for medium companies.',
      'شركة ركاء العقارية', '/img/portfolio-1.jpg', 'Web Application', 'published', 1
    );
    insertProject.run(
      'تطبيق بارق الذكي', 'Barq Smart App',
      'تطبيق هاتف محمول يعتمد على الذكاء الاصطناعي لتحليل البيانات وتقديم توصيات ذكية للمستخدمين.',
      'A mobile application based on AI to analyze data and provide smart recommendations to users.',
      'مجموعة برق الاستثمارية', '/img/portfolio-2.jpg', 'Mobile App', 'published', 2
    );
    insertProject.run(
      'نظام التعليم الذكي', 'Smart Education Platform',
      'نظام تعليمي متكامل يدعم التعلم عن بعد مع أدوات تفاعلية للمعلمين والطلاب.',
      'An integrated educational platform supporting distance learning with interactive tools for teachers and students.',
      'أكاديمية التعلم', '/img/portfolio-3.jpg', 'Web Platform', 'published', 3
    );
  }

  // Default SEO pages
  const seoCount = db.prepare('SELECT COUNT(*) as count FROM seo_pages').get();
  if (seoCount.count === 0) {
    const insertSeo = db.prepare('INSERT INTO seo_pages (page_name, page_path, title, description, keywords, score) VALUES (?, ?, ?, ?, ?, ?)');
    const seoPages = [
      ['الصفحة الرئيسية', '/', 'برق تك | حلول تقنية ذكية', 'نحوّل طموحك الرقمي إلى نتائج حقيقية', 'برق تك, ذكاء اصطناعي, تحول رقمي', 85],
      ['من نحن', '/about', 'من نحن | برق تك', 'شركة تقنية سعودية متخصصة', 'شركة تقنية, سعودية, رؤية 2030', 72],
      ['الخدمات', '/service', 'خدماتنا | برق تك', 'حلول تقنية متكاملة', 'خدمات تقنية, تطوير, ذكاء اصطناعي', 70],
      ['تطوير الويب', '/service/web-applications', 'تطوير تطبيقات الويب | برق تك', 'تطبيقات ويب عالية الأداء', 'تطوير ويب, تطبيقات, مواقع', 68],
      ['وكلاء الذكاء', '/service/ai-agents', 'وكلاء الذكاء الاصطناعي | برق تك', 'وكلاء AI مستقلين', 'AI Agent, وكيل ذكي', 60],
      ['الأتمتة', '/service/ai-automation', 'أتمتة العمليات | برق تك', 'أتمتة بالذكاء الاصطناعي', 'أتمتة, automation', 55],
      ['اتصل بنا', '/contact', 'اتصل بنا | برق تك', 'تواصل معنا لبدء مشروعك', 'تواصل, استشارة', 78],
      ['المدونة', '/blog', 'المدونة | برق تك', 'مقالات تقنية متخصصة', 'مدونة, مقالات, تقنية', 65],
    ];
    seoPages.forEach(p => insertSeo.run(...p));
  }

  // Default settings
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get();
  if (settingsCount.count === 0) {
    const insertSetting = db.prepare('INSERT INTO settings (setting_key, setting_value, setting_group) VALUES (?, ?, ?)');
    const defaults = [
      ['site_name', 'برق تك | Barq Tech', 'general'],
      ['site_url', 'https://barqtech.ai', 'general'],
      ['site_email', 'grow@barqtech.ai', 'general'],
      ['site_phone', '+966 55 024 3776', 'general'],
      ['site_whatsapp', '966550243776', 'general'],
      ['site_address_ar', 'المملكة العربية السعودية، المنطقة الشرقية، الخبر', 'general'],
      ['site_address_en', 'Saudi Arabia, Eastern Province, Al Khobar', 'general'],
      ['site_map_link', 'https://maps.app.goo.gl/uL98DWCSx767gtjAA?g_st=aw', 'general'],
      ['primary_color', '#082e71', 'appearance'],
      ['facebook_url', '', 'social'],
      ['twitter_url', '', 'social'],
      ['linkedin_url', '', 'social'],
      ['instagram_url', '', 'social'],
      ['tiktok_url', '', 'social'],
      ['ga_measurement_id', '', 'analytics'],
      ['google_verification', '', 'seo'],
      ['about_text_ar', 'نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو. انطلقنا لنطوع أحدث تقنيات الـ AI لخدمة الشركات الطموحة، محولين الأفكار المعقدة إلى تطبيقات واقعية ووكلاء ذكيين يعملون بدقة البرق.', 'general'],
      ['about_text_en', 'We at Barq Tech, a Saudi-born technology company, believe that artificial intelligence is not just a tool, but the new engine for growth. We set out to harness the latest AI technologies to serve ambitious companies, transforming complex ideas into realistic applications and smart agents that work with lightning precision.', 'general'],
      ['vision_text_ar', 'التزاماً منا بدعم رؤية المملكة 2030، نضع نصب أعيننا تسخير نقاط القوة الفريدة لوطننا لتلبية المتطلبات التقنية المحلية بكفاءة عالية. ومن خلال حصيلة خبراتنا العميقة وتخصصنا الدقيق، نقود الابتكارات الرقمية ونقدم خدمات ذكية مدعومة تكنولوجياً لتمكين عملائنا من تحقيق التفوق والريادة.', 'general'],
      ['vision_text_en', "In commitment to supporting the Kingdom's Vision 2030, we aim to harness the unique strengths of our homeland to meet local technical requirements with high efficiency. Through our deep expertise and precise specialization, we lead digital innovations and provide technologically-supported smart services to enable our clients to achieve excellence and leadership.", 'general'],
    ];
    defaults.forEach(s => insertSetting.run(...s));
  }

  console.log('✅ Database initialized successfully');
  return db;
}

module.exports = { initDatabase, DB_PATH };
