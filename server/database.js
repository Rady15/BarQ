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
      slogan_ar TEXT,
      slogan_en TEXT,
      image TEXT,
      link_url TEXT,
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
      sector_ar TEXT,
      sector_en TEXT,
      value_ar TEXT,
      value_en TEXT,
      impact_metric TEXT,
      impact_label_ar TEXT,
      impact_label_en TEXT,
      features_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migrate projects table if the columns are missing
  try { db.exec("ALTER TABLE projects ADD COLUMN sector_ar TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN sector_en TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN value_ar TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN value_en TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN impact_metric TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN impact_label_ar TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN impact_label_en TEXT;"); } catch(e){}
  try { db.exec("ALTER TABLE projects ADD COLUMN features_json TEXT;"); } catch(e){}

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

  // ─── MESSAGE REPLIES TABLE ───
  db.exec(`
    CREATE TABLE IF NOT EXISTS message_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id INTEGER,
      admin_id INTEGER,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(message_id) REFERENCES contact_messages(id) ON DELETE CASCADE,
      FOREIGN KEY(admin_id) REFERENCES users(id)
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

  // Migrate service_features to add slogan_ar, slogan_en, image, link_url if missing
  try {
    const info = db.pragma('table_info(service_features)');
    const hasSloganAr = info.some(col => col.name === 'slogan_ar');
    if (!hasSloganAr) {
      db.exec('ALTER TABLE service_features ADD COLUMN slogan_ar TEXT');
      db.exec('ALTER TABLE service_features ADD COLUMN slogan_en TEXT');
      db.exec('ALTER TABLE service_features ADD COLUMN image TEXT');
      db.exec('ALTER TABLE service_features ADD COLUMN link_url TEXT');
      console.log('Migrated service_features table columns successfully.');
    }
  } catch (e) {
    console.log('Migration Note (service_features):', e.message);
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

  // Migration for analytics_log columns
  try {
    const columns = db.pragma('table_info(analytics_log)');
    const hasCountry = columns.some(c => c.name === 'country');
    if (!hasCountry) {
      db.exec('ALTER TABLE analytics_log ADD COLUMN country TEXT');
      db.exec('ALTER TABLE analytics_log ADD COLUMN device TEXT');
      db.exec('ALTER TABLE analytics_log ADD COLUMN browser TEXT');
    }
  } catch (e) {
    console.log('Migration Note (Analytics):', e.message);
  }

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
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('Omar');
  if (!adminExists) {
    const hash = bcrypt.hashSync('Omar2026@', 10);
    db.prepare(`
      INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
    `).run('عمر (المدير)', 'Omar', hash, 'admin');
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

  // Default projects - Clean existing and re-seed to ensure these 6 specific projects are active
  db.exec('DELETE FROM projects');
  
  const insertProject = db.prepare(`
    INSERT INTO projects (
      title_ar, title_en, description_ar, description_en, client_name, image, category, status, sort_order,
      sector_ar, sector_en, value_ar, value_en, impact_metric, impact_label_ar, impact_label_en, features_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  // Project 1: كعك بلادي
  const featuresKaak = [
    {titleAr:"المبيعات (Sales)",titleEn:"Sales Management",icon:"fa-file-invoice-dollar",descAr:"إدارة متكاملة للفواتير والعملاء وتتبع عروض الأسعار والتحصيل المالي.",descEn:"Fully integrated billing, customer directory, quotation tracking, and cash collection pipelines."},
    {titleAr:"المشتريات (Purchases)",titleEn:"Purchases & Supplies",icon:"fa-truck-loading",descAr:"شراء المواد الخام من الموردين تلقائياً وتتبع حركة الأسعار والموازنات.",descEn:"Automatic procurement of raw ingredients from verified vendors with price index tracking."},
    {titleAr:"المخازن (Inventory)",titleEn:"Smart Inventory",icon:"fa-warehouse",descAr:"متابعة المخزون وحركة الأصناف والمواد الأولية في المخابز بدقة متناهية.",descEn:"Real-time ingredient tracking, batch numbers, expiration notifications, and internal stock transfer logs."},
    {titleAr:"التصنيع (Manufacturing)",titleEn:"Manufacturing & Recipes",icon:"fa-blender",descAr:"إدارة الوصفات الإنتاجية (BOM)، وحساب تكاليف المواد وهدر خطوط الإنتاج.",descEn:"Detailed Bill of Materials (BOM) management, production recipe costing, and manufacturing line audits."},
    {titleAr:"نقاط البيع (POS)",titleEn:"Fast POS System",icon:"fa-cash-register",descAr:"البيع المباشر والسريع داخل الفروع والمعارض مع التزامن السحابي المباشر.",descEn:"Blazing fast direct sales for retail branches with offline support and immediate cloud sync."},
    {titleAr:"المحاسبة (Accounting)",titleEn:"Financial Accounting",icon:"fa-calculator",descAr:"إدارة المصاريف والأرباح والضرائب والتقارير المالية المعتمدة للزكاة والدخل.",descEn:"Double-entry ledger, expense claims, custom VAT/Zakat invoicing, and comprehensive financial reports."}
  ];

  insertProject.run(
    'مشروع كعك بلادي', 'Kaak Biladi Project',
    'نظام متكامل مخصص لإدارة مصانع ومعامل المعجنات والحلويات. يغطي دورة التصنيع والمبيعات والمشتريات والمخازن ونقاط البيع POS مع الربط المحاسبي الكامل.',
    'An integrated ERP system for bakery and confectionery manufacturing, covering sales, purchasing, inventory, manufacturing, POS, and financial accounting.',
    'مجموعة كعك بلادي للحلويات', '/img/portfolio-1.jpg', 'ERP & POS Systems', 'published', 1,
    'صناعة الكعك والحلويات والمخابز', 'Sweets, Bakeries & Confectionery Manufacturing',
    'ساعد النظام في تنظيم دورة العمل الكاملة وتقليل الهدر وتحسين دقة احتساب تكلفة الإنتاج وتتبع الموارد الخام.',
    'The system successfully organized the full operational workflow, reduced material waste, and enabled highly accurate real-time costing of recipes and raw items.',
    '35%', 'تقليل في الهدر التشغيلي', 'Reduction in operational waste',
    JSON.stringify(featuresKaak)
  );

  // Project 2: The Pantry
  const featuresPantry = [
    {titleAr:"المبيعات (Sales)",titleEn:"Sales Integration",icon:"fa-receipt",descAr:"إدارة المبيعات وقنوات البيع المختلفة كالتوصيل والطلبات المحلية.",descEn:"Centralized sales processing across multiple channels including delivery and dine-in tables."},
    {titleAr:"المشتريات (Purchases)",titleEn:"Supplies Management",icon:"fa-shopping-basket",descAr:"طلب المواد الغذائية والخضروات وتحديث تكلفة المكونات تلقائياً.",descEn:"Procurement workflows for fresh produce and ingredients with auto-updated recipe costs."},
    {titleAr:"المخازن (Inventory)",titleEn:"Kitchen Inventory",icon:"fa-cubes",descAr:"متابعة صلاحيات الأغذية والمكونات ومنع الهدر في المستودعات.",descEn:"Strict cold-storage logs, ingredient shelf-life alerts, and wastage auditing."},
    {titleAr:"التصنيع (Kitchen Production)",titleEn:"Kitchen Display & Recipes",icon:"fa-utensils",descAr:"ربط شاشات المطبخ الذكية وإدارة وصفات الطهي والمقادير بدقة.",descEn:"KDS (Kitchen Display System) link, ingredient portion control, and recipe instructions."},
    {titleAr:"نقاط البيع (POS)",titleEn:"Dine-In & Takeaway POS",icon:"fa-tablet-alt",descAr:"إدارة الطاولات، الحجوزات، والطلبات السريعة وربطها مع الكابتن مباشرة.",descEn:"Table layouts, visual reservations, and rapid captain orders synced with the kitchen."},
    {titleAr:"الموارد البشرية (HR)",titleEn:"Restaurant HR & Staff",icon:"fa-users-cog",descAr:"تنظيم شفتات العمل للموظفين والطهاة، وتتبع الحضور والرواتب.",descEn:"Chef and waiter shift scheduling, biometric attendance tracking, and localized payroll."},
    {titleAr:"المحاسبة (Accounting)",titleEn:"Revenue & Cost Control",icon:"fa-chart-pie",descAr:"تقارير الأرباح والخسائر اليومية ونسب الربح لكل وجبة أو قسم.",descEn:"Daily profit & loss reporting, food cost percentage metrics, and department cost centers."}
  ];

  insertProject.run(
    'مشروع The Pantry', 'The Pantry Restaurant System',
    'حل رقمي شامل لمجال المطاعم وإدارة الضيافة. يتضمن إدارة المبيعات، المشتريات، المخازن والمستودعات، عمليات التصنيع والطهي، نقاط البيع POS، الموارد البشرية HR، والمحاسبة.',
    'A comprehensive hospitality and restaurant management system covering sales, purchases, warehouses, food manufacturing, POS, HR, and accounting.',
    'مطاعم ذا بانتري العالمية', '/img/portfolio-2.jpg', 'Restaurant Management', 'published', 2,
    'المطاعم والضيافة والمأكولات', 'Restaurants, Food & Hospitality',
    'ساهم المشروع في توحيد جميع أقسام المطعم والمطبخ داخل نظام واحد لرفع الكفاءة التشغيلية وتحسين تجربة الإدارة والطلب.',
    'The project successfully unified all restaurant front-of-house operations and kitchen lines into a single ERP, boosting efficiency and management experience.',
    '42%', 'زيادة سرعة تجهيز الطلبات', 'Increase in order prep speed',
    JSON.stringify(featuresPantry)
  );

  // Project 3: MIS
  insertProject.run(
    'نظام MIS للمقاولات وعروض الأسعار', 'MIS Contracting & Purchasing Agreement System',
    'نظام مخصص لقطاع المقاولات لإدارة ومتابعة العملاء وتقديم عروض أسعار متطورة، بالإضافة إلى إدارة المشتريات وطلبات الشراء بنظام اتفاقيات الشراء (Purchase Agreements).',
    'A specialized contracting subsystem for managing client relationships (CRM), issuing advanced quotations, and handling purchases under Purchase Agreements.',
    'شركة MIS للمقاولات والحلول العقارية', '/img/portfolio-3.jpg', 'Enterprise Systems', 'published', 3,
    'المقاولات والإنشاءات', 'Contracting & Construction',
    'أتاح للشركة تحويل طلبات الشراء إلى نظام مرن أوتوماتيكي بالكامل مع تتبع تسعير المواد.',
    'Transformed standard purchasing into an automated, highly traceable ecosystem across multi-scale projects.',
    '28%', 'تخفيض تكلفة المشتريات', 'Decrease in purchase cycle time',
    '[]'
  );

  // Project 4: Stretch
  insertProject.run(
    'منصة Stretch لإدارة مراكز الـ Spa', 'Stretch Spa & Massage Management Platform',
    'نظام متكامل مخصص لإدارة جلسات المساج، الـ Spa، والنوادي الصحية. يدعم نظام الباقات، الاشتراكات الدورية، الجلسات الفردية، والحجز المباشر مع لوحة تحكم مالية محاسبية.',
    'A complete booking and management system for spa, wellness, and massage centers, supporting subscription packages, single sessions, and fully integrated accounting.',
    'مراكز Stretch الصحية والرياضية', '/img/portfolio-4.jpg', 'Booking & Subscription Platforms', 'published', 4,
    'النوادي الصحية والجمال', 'Wellness & Health Centers',
    'وفر النظام للعملاء تجربة حجز متطورة مع زيادة نسبة المبيعات المتكررة بنسبة ملحوظة.',
    'Organized booking parameters and improved recurring client acquisition cycles via seamless mobile app portals.',
    '50%', 'زيادة مبيعات الاشتراكات', 'Increase in subscription sales',
    '[]'
  );

  // Project 5: IBSS
  insertProject.run(
    'نظام IBSS لإدارة المستشفيات وعيادات الأسنان', 'IBSS Hospital & Dental Clinic Management System',
    'نظام صحي متكامل مخصص لإدارة المستشفيات والمجمعات الطبية وعيادات الأسنان. يغطي الحسابات العامة، المبيعات والفوترة، إدارة علاقات المرضى CRM، الموارد البشرية HR، المشتريات، وإدارة المخزون الطبي.',
    'A dedicated healthcare enterprise system for managing dental clinics and hospitals, covering billing, CRM, HR, specialized medical inventory, and purchase tracking.',
    'مجموعة عيادات ومستشفيات IBSS الطبية', '/img/portfolio-5.jpg', 'Healthcare Solutions', 'published', 5,
    'المستشفيات والرعاية الطبية', 'Healthcare & Medical Centers',
    'سلسلة عيادات كاملة تعمل الآن بنظام رقمي موحد متوافق مع متطلبات التأمين الطبي.',
    'Integrated patient check-in queues, dental record charts, and Zatca e-invoicing databases.',
    '99.9%', 'دقة في الفوترة والمطالبات', 'Billing and claim accuracy',
    '[]'
  );

  // Project 6: Tailor
  insertProject.run(
    'نظام Tailor للتصنيع وتفصيل الملابس', 'Tailor Apparel Manufacturing & Customization System',
    'نظام شامل مخصص للمشاغل وورش الخياطة يغطي دورة العمل بأكملها: من التصنيع والتفصيل وتدوين المقاسات التفصيلية، مروراً بإدارة المبيعات والمخازن، ووصولاً للمشتريات والتسليم النهائي للعميل.',
    'A comprehensive tailor and workshop management system, tracking apparel from manufacturing, custom sizing and detailed measurements to sales, inventory, and final delivery.',
    'دار Tailor للأزياء والخياطة الراقية', '/img/portfolio-6.jpg', 'Manufacturing & Retail Systems', 'published', 6,
    'صناعة الأزياء وتفصيل الملابس', 'Fashion & Custom Apparel Industry',
    'قلص النظام أخطاء المقاسات والتسليمات الضائعة بنسبة غير مسبوقة.',
    'Reduced measurement records mismatch errors and enhanced inventory management of valuable textile rolls.',
    '85%', 'تحسن في دقة تلبية المقاسات', 'Improvement in custom sizing accuracy',
    '[]'
  );

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
      ['ga_measurement_id', 'G-ZNTDE26H27', 'analytics'],
      ['google_verification', '', 'seo'],
      ['about_text_ar', 'نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو. انطلقنا لنطوع أحدث تقنيات الـ AI لخدمة الشركات الطموحة، محولين الأفكار المعقدة إلى تطبيقات واقعية ووكلاء ذكيين يعملون بدقة البرق.', 'general'],
      ['about_text_en', 'We at Barq Tech, a Saudi-born technology company, believe that artificial intelligence is not just a tool, but the new engine for growth. We set out to harness the latest AI technologies to serve ambitious companies, transforming complex ideas into realistic applications and smart agents that work with lightning precision.', 'general'],
      ['vision_text_ar', 'التزاماً منا بدعم رؤية المملكة 2030، نضع نصب أعيننا تسخير نقاط القوة الفريدة لوطننا لتلبية المتطلبات التقنية المحلية بكفاءة عالية. ومن خلال حصيلة خبراتنا العميقة وتخصصنا الدقيق، نقود الابتكارات الرقمية ونقدم خدمات ذكية مدعومة تكنولوجياً لتمكين عملائنا من تحقيق التفوق والريادة.', 'general'],
      ['vision_text_en', "In commitment to supporting the Kingdom's Vision 2030, we aim to harness the unique strengths of our homeland to meet local technical requirements with high efficiency. Through our deep expertise and precise specialization, we lead digital innovations and provide technologically-supported smart services to enable our clients to achieve excellence and leadership.", 'general'],
    ];
    defaults.forEach(s => insertSetting.run(...s));
  }

  // Update GA ID to the user's specific G-ZNTDE26H27 if it is still set to the old default or is empty,
  // while preserving user's custom future updates from the control panel!
  db.prepare("UPDATE settings SET setting_value = 'G-ZNTDE26H27' WHERE setting_key = 'ga_measurement_id' AND (setting_value = 'G-DT4Y4BNB9H' OR setting_value IS NULL OR setting_value = '')").run();

  // Default Testimonials - Clean and re-seed to ensure these 5 specific reviews are active
  db.exec('DELETE FROM testimonials');
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (name_ar, name_en, role_ar, role_en, text_ar, text_en, is_active)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `);

  insertTestimonial.run(
    'د. هبة إبراهيم', 'Dr. Heba Ibrahim',
    'المدير العام لشركة Ibss Innovation', 'General Manager of Ibss Innovation',
    'تجربتنا مع شركة برق تكنولوجي كانت رائعة جدًا، ومن أفضل القرارات اللي أخذناها في تطوير أعمالنا. الفريق كان متعاون واحترافي من أول يوم، وفهم احتياجاتنا بشكل سريع، واشتغل معنا على تنفيذ نظام Odoo كامل ومتكامل بالإضافة إلى نظام CRM مخصص ساعدنا بشكل كبير في تنظيم جميع عملياتنا الداخلية بطريقة أكثر كفاءة ووضوح. بفضل الحلول اللي قدموها لنا، قدرنا نحسن إدارة العملاء، تنظيم المبيعات، متابعة العمليات اليومية، وربط أقسام الشركة بشكل أفضل داخل نظام واحد سهل وعملي. أكثر شيء أعجبنا هو اهتمامهم بالتفاصيل، سرعة التنفيذ، والدعم المستمر اللي خلانا نحس أننا نتعامل مع شريك نجاح حقيقي.',
    'Our experience with Barq Tech was truly wonderful, and one of the best decisions we made for our business development. The team was collaborative and professional from day one, quickly understanding our needs and working with us to implement a fully integrated Odoo system along with a custom CRM. This significantly helped organize all our internal operations efficiently and clearly. Thanks to their solutions, we improved client management, sales organization, and department integration within a simple, practical system. Their attention to detail, speed of execution, and continuous support made us feel like we had a true partner in success.'
  );

  insertTestimonial.run(
    'سامر عيسى', 'Samer Issa',
    'المدير العام لشركة أفاتار', 'General Manager of Avatar',
    'تعاملنا مع برق تك كان تجربة مميزة فعلًا. كنا بحاجة إلى موقع إلكتروني يعكس شخصية أفاتار كشركة متخصصة في الدعاية والإعلان بطريقة احترافية وجذابة، وفريق برق تك قدر يقدم لنا حل متكامل تجاوز توقعاتنا. اشتغلوا على بناء موقع عصري يعبر عن هويتنا بشكل واضح، مع تصميم بصري مميز، عرض منظم لخدماتنا، وتجربة استخدام سهلة وسلسة على مختلف الأجهزة. كذلك اهتموا بجوانب مهمة مثل سرعة الأداء، وضوح المحتوى، وإظهار أعمالنا بطريقة تساعد العملاء على فهم خدماتنا والتواصل معنا بسهولة أكبر. أكثر شيء قدّرناه هو اهتمامهم الحقيقي بالتفاصيل، وحرصهم على أن يكون الموقع أداة فعالة لدعم أعمالنا وليس مجرد واجهة فقط. الفريق كان متجاوب، محترف، وسريع في التنفيذ، وهذا صنع فرق كبير معنا. نشكر برق تك على هذا العمل الرائع، وسعداء جدًا بهذا التعاون اللي ساعدنا في تعزيز حضورنا الرقمي بشكل أقوى وأكثر احترافية',
    'Working with Barq Tech was a truly remarkable experience. We needed a professional, engaging website that reflects Avatar\'s identity as an advertising agency. The Barq Tech team delivered an integrated solution that exceeded our expectations, building a modern site with outstanding visual design and a seamless user experience across devices. The team was highly responsive, professional, and quick in execution, which made a huge difference for us. We thank Barq Tech for this wonderful work!'
  );

  insertTestimonial.run(
    'يوسف جان', 'Yousef Jan',
    'المدير العام لشركة OSB', 'General Manager of OSB',
    'بصفتي المدير العام لشركة OSB، كنت أبحث عن جهة تقنية تستطيع تقديم موقع إلكتروني يعكس احترافية خدماتنا في مجال تأسيس الشركات ويعبر عن ثقة عملائنا بنا، والحقيقة أن برق تك قدمت لنا تجربة ممتازة من البداية حتى الإطلاق. الفريق استطاع بناء موقع متكامل يوضح خدماتنا بشكل منظم وواضح، وساعدنا في تقديم معلوماتنا بطريقة أكثر احترافية وسهولة للعملاء، سواء من ناحية التصميم، ترتيب المحتوى، أو سهولة الوصول للخدمات. ما أعجبني فعلًا هو قدرتهم على فهم طبيعة نشاطنا وتحويله إلى حضور رقمي يعكس هوية OSB بالشكل الصحيح. برق تك لم تقدم لنا مجرد موقع إلكتروني، بل ساعدتنا في بناء واجهة قوية تمثل شركتنا وتدعم نمو أعمالنا. التزامهم، سرعة استجابتهم، واهتمامهم بجودة العمل جعل التجربة ناجحة بكل المقاييس. أشكر فريق برق تك على هذا المستوى المميز، وأوصى بهم بكل ثقة لأي شركة تبحث عن شريك تقني يفهم احتياجها ويقدم نتائج حقيقية.',
    'As the General Manager of OSB, I was looking for a technical partner capable of delivering a website that reflects the professionalism of our corporate setup services. Barq Tech provided us with an outstanding experience from inception to launch. The team built an integrated platform that showcases our services clearly and professionally. Their commitment, swift response, and attention to quality made this experience successful by all metrics.'
  );

  insertTestimonial.run(
    'محمد برمدا', 'Mohamed Barmada',
    'المدير العام لمجمع أزهار السكني', 'General Manager of Azhar Compound',
    'بصفتي المدير العام لمجمع أزهار السكني، أود أن أعبر عن تقديري الكبير لفريق برق تك على العمل الاحترافي الذي قدموه لنا في تطوير تطبيق متكامل يخدم سكان المجمع ويرتقي بتجربة الحياة اليومية داخل المشروع. من البداية، أظهر فريق برق تك فهمًا واضحًا لاحتياجاتنا، ونجحوا في تصميم وتنفيذ تطبيق عملي وسهل الاستخدام ساعد السكان على الوصول للخدمات والمعلومات المهمة بكل سهولة، وساهم بشكل كبير في تحسين التواصل وتنظيم العديد من الجوانب التشغيلية داخل المجمع. ما يميز برق تك هو قدرتهم على تحويل الفكرة إلى حل رقمي فعّال يجمع بين الجودة، سهولة الاستخدام، والاهتمام بالتفاصيل، إلى جانب التزامهم العالي وسرعة استجابتهم طوال مراحل المشروع. نفخر بهذا التعاون، ونعتبر برق تك شريكًا تقنيًا موثوقًا ساعدنا في تقديم قيمة حقيقية لسكان مجمع أزهار، ونتطلع لمزيد من النجاحات معهم مستقبلًا.',
    'As the General Manager of Azhar Compound, I want to express my gratitude to the Barq Tech team for their professional work in developing an integrated application serving compound residents and elevating their daily living experience. From the start, they demonstrated a clear understanding of our needs, designing and executing a highly practical, user-friendly app that facilitated resident communications and operations. We are proud of this partnership.'
  );

  insertTestimonial.run(
    'المدير العام لشركة Coffee Selection', 'General Manager of Coffee Selection',
    'المدير العام لشركة Coffee Selection ومحمصة ريفيكس', 'General Manager of Coffee Selection & Refix Roastery',
    'بصفتي المدير العام لشركة Coffee Selection، يسعدني أن أشارك تجربتنا مع شركة برق تك التي كانت تجربة مميزة بكل المقاييس. عملنا معهم على مشروع متكامل شمل تطوير نظام رقمي كامل للمحمصة، بالإضافة إلى موقع إلكتروني احترافي وتطبيق موبايل باسم Refix، وكان الهدف هو ربط جميع عملياتنا في منصة واحدة ذكية وسهلة الاستخدام. برق تك نجحوا في تنفيذ نظام متكامل يربط عملياتنا التشغيلية من الإنتاج داخل المحمصة، إلى إدارة الطلبات، والتكامل مع شركات الشحن الخارجية، بالإضافة إلى ربط النظام مع Meta لإدارة الحملات والتسويق بشكل أكثر احترافية. كذلك تم تطوير حلول تدعم التوصيل وإدارة الطلبات بشكل سلس وسريع، مما ساعدنا على تحسين تجربة العملاء بشكل كبير. ما يميز فريق برق تك هو فهمهم العميق لطبيعة العمل، وقدرتهم على بناء حلول تقنية قابلة للتوسع وتخدم النمو المستقبلي للشركة، إلى جانب احترافيتهم العالية وسرعة تنفيذهم وحرصهم على التفاصيل. نحن في Coffee Selection نعتبر برق تك شريكًا تقنيًا حقيقيًا ساهم في تطوير أعمالنا بشكل واضح، ونشكرهم على هذا المستوى المتميز من الجودة والالتزام.',
    'As the GM of Coffee Selection, I am delighted to share our outstanding experience with Barq Tech. We worked with them on an integrated system for our roastery, including a professional website and a mobile app called Refix. The goal was to unify all operations in one smart platform. Barq Tech successfully delivered a comprehensive ecosystem linking our production, order dispatching, shipping integration, and Meta marketing campaigns.'
  );

  console.log('✅ Database initialized successfully');
  return db;
}

module.exports = { initDatabase, DB_PATH };
