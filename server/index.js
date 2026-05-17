require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sharp = require('sharp');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const { initDatabase } = require('./database');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 7860;
const JWT_SECRET = process.env.JWT_SECRET || 'barqtech-secret-key-2024';

// ─── Initialize Database ───
const db = initDatabase();

// ─── Middleware ───
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Increased to prevent dev/admin dashboard from locking out
  message: { error: 'طلبات كثيرة جداً، يرجى المحاولة لاحقاً' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── File Upload Config ───
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ─── Auth Middleware ───
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'غير مصرح' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'جلسة منتهية، سجل دخولك مرة أخرى' });
  }
}

// ─── Audit Log Helper ───
const logAction = (req, action, entityType = null, entityId = null, details = null) => {
  try {
    const userId = req.user?.id || null;
    const ip = req.ip || req.connection?.remoteAddress;
    
    // Ensure userId is valid if foreign key exists
    let validUserId = userId;
    if (userId) {
      const userExists = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
      if (!userExists) validUserId = null;
    }

    db.prepare(`
      INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(validUserId, action, entityType, entityId, details ? JSON.stringify(details) : null, ip);
  } catch (err) {
    console.warn('Silent Audit Log Error:', err.message);
  }
};

// ─── User Management Routes ───
app.get('/api/users', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  const users = db.prepare('SELECT id, name, email, role, is_active, avatar, created_at FROM users').all();
  res.json(users);
});

app.post('/api/users', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const result = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)').run(name, email, hash, role || 'admin');
    logAction(req, 'CREATE_USER', 'users', result.lastInsertRowid, { email, name });
    res.status(201).json({ id: result.lastInsertRowid, message: 'تمت إضافة المستخدم' });
  } catch (err) {
    res.status(400).json({ error: 'البريد الإلكتروني موجود مسبقاً' });
  }
});

app.delete('/api/users/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  if (parseInt(req.params.id) === req.user.id) return res.status(400).json({ error: 'لا يمكنك حذف نفسك' });
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  logAction(req, 'DELETE_USER', 'users', req.params.id);
  res.json({ message: 'تم حذف المستخدم' });
});

// ═══════════════════════════════════════
//  AUTH ROUTES
// ═══════════════════════════════════════

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.put('/api/auth/password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(400).json({ error: 'كلمة المرور الحالية غير صحيحة' });
  }
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, req.user.id);
  res.json({ message: 'تم تغيير كلمة المرور بنجاح' });
});

// ═══════════════════════════════════════
//  SERVICES ROUTES
// ═══════════════════════════════════════

app.get('/api/services', (req, res) => {
  const services = db.prepare('SELECT * FROM services ORDER BY sort_order ASC').all();
  res.json(services);
});

app.get('/api/services/:id', (req, res) => {
  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);
  if (!service) return res.status(404).json({ error: 'الخدمة غير موجودة' });
  const features = db.prepare('SELECT * FROM service_features WHERE service_id = ? ORDER BY sort_order').all(req.params.id);
  res.json({ ...service, features });
});

app.post('/api/services', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, excerpt_ar, excerpt_en, icon, icon_image, image, route, sort_order } = req.body;
  const result = db.prepare(`
    INSERT INTO services (title_ar, title_en, description_ar, description_en, excerpt_ar, excerpt_en, icon, icon_image, image, route, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title_ar, title_en, description_ar, description_en, excerpt_ar || '', excerpt_en || '', icon, icon_image, image, route, sort_order || 0);
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت إضافة الخدمة بنجاح' });
});

app.put('/api/services/:id', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, excerpt_ar, excerpt_en, icon, icon_image, image, route, sort_order, is_active } = req.body;
  db.prepare(`
    UPDATE services SET title_ar=?, title_en=?, description_ar=?, description_en=?, excerpt_ar=?, excerpt_en=?, icon=?, icon_image=?, image=?, route=?, sort_order=?, is_active=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `).run(title_ar, title_en, description_ar, description_en, excerpt_ar || '', excerpt_en || '', icon, icon_image, image, route, sort_order, is_active, req.params.id);
  res.json({ message: 'تم تحديث الخدمة بنجاح' });
});

app.delete('/api/services/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف الخدمة' });
});

// ─── SERVICE FEATURES ROUTES ───
app.post('/api/services/:id/features', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, icon, section, sort_order, slogan_ar, slogan_en, image, link_url } = req.body;
  const result = db.prepare(`
    INSERT INTO service_features (service_id, title_ar, title_en, description_ar, description_en, icon, section, sort_order, slogan_ar, slogan_en, image, link_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    req.params.id, 
    title_ar, 
    title_en, 
    description_ar || '', 
    description_en || '', 
    icon || 'fa-check', 
    section || 'why', 
    sort_order || 0,
    slogan_ar || '',
    slogan_en || '',
    image || '',
    link_url || ''
  );
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت إضافة الميزة' });
});

app.put('/api/services/features/:id', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, icon, section, sort_order, slogan_ar, slogan_en, image, link_url } = req.body;
  db.prepare(`
    UPDATE service_features 
    SET title_ar = ?, title_en = ?, description_ar = ?, description_en = ?, icon = ?, section = ?, sort_order = ?, slogan_ar = ?, slogan_en = ?, image = ?, link_url = ?
    WHERE id = ?
  `).run(
    title_ar, 
    title_en, 
    description_ar || '', 
    description_en || '', 
    icon || 'fa-check', 
    section || 'why', 
    sort_order || 0,
    slogan_ar || '',
    slogan_en || '',
    image || '',
    link_url || '',
    req.params.id
  );
  res.json({ message: 'تم تحديث الميزة بنجاح' });
});

app.delete('/api/services/features/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM service_features WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف الميزة' });
});

// ═══════════════════════════════════════
//  CLIENTS ROUTES
// ═══════════════════════════════════════

app.get('/api/clients', (req, res) => {
  const type = req.query.type;
  let clients;
  if (type) {
    clients = db.prepare('SELECT * FROM clients WHERE type = ? AND is_active = 1 ORDER BY sort_order').all(type);
  } else {
    clients = db.prepare('SELECT * FROM clients WHERE is_active = 1 ORDER BY sort_order').all();
  }
  res.json(clients);
});

app.post('/api/clients', authMiddleware, (req, res) => {
  const { name, name_en, logo, website, type, sort_order } = req.body;
  const result = db.prepare('INSERT INTO clients (name, name_en, logo, website, type, sort_order) VALUES (?,?,?,?,?,?)').run(name, name_en, logo, website, type || 'client', sort_order || 0);
  logAction(req, 'CREATE_CLIENT', 'clients', result.lastInsertRowid, { name });
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت الإضافة بنجاح' });
});

app.put('/api/clients/:id', authMiddleware, (req, res) => {
  const { name, name_en, logo, website, type, sort_order, is_active } = req.body;
  db.prepare('UPDATE clients SET name=?, name_en=?, logo=?, website=?, type=?, sort_order=?, is_active=? WHERE id=?').run(name, name_en, logo, website, type, sort_order, is_active, req.params.id);
  res.json({ message: 'تم التحديث بنجاح' });
});

app.delete('/api/clients/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM clients WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  PROJECTS ROUTES
// ═══════════════════════════════════════

app.get('/api/projects', (req, res) => {
  const status = req.query.status;
  let projects;
  if (status) {
    projects = db.prepare('SELECT * FROM projects WHERE status = ? ORDER BY sort_order, created_at DESC').all(status);
  } else {
    projects = db.prepare('SELECT * FROM projects ORDER BY sort_order, created_at DESC').all();
  }
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) return res.status(404).json({ error: 'المشروع غير موجود' });
  res.json(project);
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, client_name, image, category, technologies, project_url, status } = req.body;
  const result = db.prepare(`
    INSERT INTO projects (title_ar, title_en, description_ar, description_en, client_name, image, category, technologies, project_url, status)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `).run(title_ar, title_en, description_ar, description_en, client_name, image, category, technologies, project_url, status || 'draft');
  logAction(req, 'CREATE_PROJECT', 'projects', result.lastInsertRowid, { title_ar });
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت إضافة المشروع' });
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const { title_ar, title_en, description_ar, description_en, client_name, image, category, technologies, project_url, status } = req.body;
  db.prepare(`
    UPDATE projects SET title_ar=?, title_en=?, description_ar=?, description_en=?, client_name=?, image=?, category=?, technologies=?, project_url=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).run(title_ar, title_en, description_ar, description_en, client_name, image, category, technologies, project_url, status, req.params.id);
  res.json({ message: 'تم تحديث المشروع' });
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  logAction(req, 'DELETE_PROJECT', 'projects', req.params.id);
  res.json({ message: 'تم حذف المشروع' });
});

// ═══════════════════════════════════════
//  TESTIMONIALS ROUTES
// ═══════════════════════════════════════

app.get('/api/testimonials', (req, res) => {
  const { all } = req.query;
  const testimonials = all 
    ? db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all()
    : db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC').all();
  res.json(testimonials);
});

app.post('/api/testimonials', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating } = req.body;
  const result = db.prepare(`
    INSERT INTO testimonials (name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating || 5);
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت إضافة الرأي بنجاح' });
});

app.put('/api/testimonials/:id', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating, is_active } = req.body;
  db.prepare(`
    UPDATE testimonials SET name_ar=?, name_en=?, role_ar=?, role_en=?, company=?, text_ar=?, text_en=?, image=?, rating=?, is_active=? WHERE id=?
  `).run(name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating, is_active, req.params.id);
  res.json({ message: 'تم التحديث بنجاح' });
});

app.delete('/api/testimonials/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  TEAM MEMBERS ROUTES
// ═══════════════════════════════════════

app.get('/api/team', (req, res) => {
  const { all } = req.query;
  const team = all
    ? db.prepare('SELECT * FROM team_members ORDER BY sort_order ASC, created_at DESC').all()
    : db.prepare('SELECT * FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC').all();
  res.json(team);
});

app.post('/api/team', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, sort_order } = req.body;
  const result = db.prepare(`
    INSERT INTO team_members (name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, sort_order || 0);
  res.status(201).json({ id: result.lastInsertRowid, message: 'تمت الإضافة بنجاح' });
});

app.put('/api/team/:id', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, sort_order, is_active } = req.body;
  db.prepare(`
    UPDATE team_members SET name_ar=?, name_en=?, role_ar=?, role_en=?, bio_ar=?, bio_en=?, image=?, email=?, linkedin=?, twitter=?, sort_order=?, is_active=? WHERE id=?
  `).run(name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, sort_order, is_active, req.params.id);
  res.json({ message: 'تم التحديث بنجاح' });
});

app.delete('/api/team/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM team_members WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  BLOG / ARTICLES ROUTES
// ═══════════════════════════════════════

app.get('/api/articles', (req, res) => {
  const { status, category, limit } = req.query;
  let query = 'SELECT * FROM articles';
  const conditions = [];
  const params = [];
  if (status) { conditions.push('status = ?'); params.push(status); }
  if (category) { conditions.push('category = ?'); params.push(category); }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY created_at DESC';
  if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)); }
  res.json(db.prepare(query).all(...params));
});

app.get('/api/articles/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE id = ? OR slug = ?').get(req.params.id, req.params.id);
  if (!article) return res.status(404).json({ error: 'المقال غير موجود' });
  // Increment views
  db.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').run(article.id);
  res.json(article);
});

app.post('/api/articles', authMiddleware, (req, res) => {
  const { title_ar, title_en, slug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, status } = req.body;
  const autoSlug = slug || title_en?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;
  const result = db.prepare(`
    INSERT INTO articles (title_ar, title_en, slug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, author_id, status, published_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).run(title_ar, title_en, autoSlug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, req.user.id, status || 'draft', status === 'published' ? new Date().toISOString() : null);
  logAction(req, 'CREATE_ARTICLE', 'articles', result.lastInsertRowid, { title_ar, autoSlug });
  res.status(201).json({ id: result.lastInsertRowid, slug: autoSlug, message: 'تمت إضافة المقال' });
});

app.put('/api/articles/:id', authMiddleware, (req, res) => {
  const { title_ar, title_en, slug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, status } = req.body;
  db.prepare(`
    UPDATE articles SET title_ar=?, title_en=?, slug=?, content_ar=?, content_en=?, excerpt_ar=?, excerpt_en=?, image=?, category=?, tags=?, status=?, published_at=CASE WHEN ? = 'published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).run(title_ar, title_en, slug, content_ar, content_en, excerpt_ar, excerpt_en, image, category, tags, status, status, req.params.id);
  logAction(req, 'UPDATE_ARTICLE', 'articles', req.params.id, { title_ar });
  res.json({ message: 'تم تحديث المقال' });
});

app.delete('/api/articles/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  logAction(req, 'DELETE_ARTICLE', 'articles', req.params.id);
  res.json({ message: 'تم حذف المقال' });
});

// ═══════════════════════════════════════
//  FAQ ROUTES
// ═══════════════════════════════════════

app.get('/api/faqs', (req, res) => {
  res.json(db.prepare('SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order').all());
});

app.post('/api/faqs', authMiddleware, (req, res) => {
  const { question_ar, question_en, answer_ar, answer_en, sort_order } = req.body;
  const result = db.prepare('INSERT INTO faqs (question_ar, question_en, answer_ar, answer_en, sort_order) VALUES (?,?,?,?,?)').run(question_ar, question_en, answer_ar, answer_en, sort_order || 0);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.put('/api/faqs/:id', authMiddleware, (req, res) => {
  const { question_ar, question_en, answer_ar, answer_en, sort_order, is_active } = req.body;
  db.prepare('UPDATE faqs SET question_ar=?, question_en=?, answer_ar=?, answer_en=?, sort_order=?, is_active=? WHERE id=?').run(question_ar, question_en, answer_ar, answer_en, sort_order, is_active, req.params.id);
  res.json({ message: 'تم التحديث' });
});

app.delete('/api/faqs/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  TEAM MEMBERS ROUTES
// ═══════════════════════════════════════

app.get('/api/team', (req, res) => {
  res.json(db.prepare('SELECT * FROM team_members WHERE is_active = 1 ORDER BY sort_order').all());
});

app.post('/api/team', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter } = req.body;
  const result = db.prepare('INSERT INTO team_members (name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter) VALUES (?,?,?,?,?,?,?,?,?,?)').run(name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.put('/api/team/:id', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, is_active } = req.body;
  db.prepare('UPDATE team_members SET name_ar=?, name_en=?, role_ar=?, role_en=?, bio_ar=?, bio_en=?, image=?, email=?, linkedin=?, twitter=?, is_active=? WHERE id=?').run(name_ar, name_en, role_ar, role_en, bio_ar, bio_en, image, email, linkedin, twitter, is_active, req.params.id);
  res.json({ message: 'تم التحديث' });
});

app.delete('/api/team/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM team_members WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  TESTIMONIALS ROUTES
// ═══════════════════════════════════════

app.get('/api/testimonials', (req, res) => {
  res.json(db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC').all());
});

app.post('/api/testimonials', authMiddleware, (req, res) => {
  const { name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating } = req.body;
  const result = db.prepare('INSERT INTO testimonials (name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating) VALUES (?,?,?,?,?,?,?,?,?)').run(name_ar, name_en, role_ar, role_en, company, text_ar, text_en, image, rating || 5);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.delete('/api/testimonials/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف' });
});

// ═══════════════════════════════════════
//  CONTACT MESSAGES ROUTES
// ═══════════════════════════════════════

app.get('/api/messages', authMiddleware, (req, res) => {
  const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
  
  // Attach replies to each message
  const messagesWithReplies = messages.map(msg => {
    const replies = db.prepare('SELECT * FROM message_replies WHERE message_id = ? ORDER BY created_at ASC').all(msg.id);
    return { ...msg, replies };
  });
  
  res.json(messagesWithReplies);
});

app.post('/api/messages', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'يرجى ملء جميع الحقول المطلوبة' });
  
  try {
    db.prepare('INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?,?,?,?,?)').run(name, email, phone, subject, message);
    
    // Send Email Notification
    let notificationSent = false;
    if (resend) {
      try {
        const response = await resend.emails.send({
          from: 'برق تك <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL,
          subject: `رسالة جديدة من الموقع: ${subject || 'بدون عنوان'}`,
          html: `
            <div dir="rtl" style="font-family: sans-serif;">
              <h3>لديك رسالة جديدة من الموقع</h3>
              <p><strong>الاسم:</strong> ${name}</p>
              <p><strong>الإيميل:</strong> ${email}</p>
              <p><strong>الهاتف:</strong> ${phone || 'غير متوفر'}</p>
              <p><strong>الرسالة:</strong></p>
              <p style="padding: 10px; background: #f3f4f6; border-radius: 5px;">${message}</p>
            </div>
          `
        });
        console.log('Contact Notification Resend Response:', response);
        if (!response.error) notificationSent = true;
      } catch (e) {
        console.error('Resend notification error:', e);
      }
    }

    if (!notificationSent && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Attempting SMTP Fallback for notification...');
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `رسالة جديدة من الموقع: ${subject || 'بدون عنوان'}`,
        html: `
          <div dir="rtl" style="font-family: sans-serif;">
            <h3>لديك رسالة جديدة من الموقع</h3>
            <p><strong>الاسم:</strong> ${name}</p>
            <p><strong>الإيميل:</strong> ${email}</p>
            <p><strong>الهاتف:</strong> ${phone || 'غير متوفر'}</p>
            <p><strong>الرسالة:</strong></p>
            <p style="padding: 10px; background: #f3f4f6; border-radius: 5px;">${message}</p>
          </div>
        `
      };
      transporter.sendMail(mailOptions).catch(e => console.error('SMTP notification fallback error:', e));
    }
    
    res.status(201).json({ message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء حفظ الرسالة' });
  }
});

app.put('/api/messages/:id/read', authMiddleware, (req, res) => {
  db.prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم التحديث' });
});

app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم الحذف بنجاح' });
});

app.post('/api/messages/reply', authMiddleware, async (req, res) => {
  console.log('Received reply request for:', req.body.email);
  const { email, subject, message } = req.body;
  
  if (!email || !message) {
    return res.status(400).json({ error: 'البريد والمحتوى مطلوبان' });
  }

  const mailHtml = `
    <div dir="rtl" style="font-family: 'Cairo', sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #082e71;">مرحباً،</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        ${message.replace(/\n/g, '<br>')}
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 14px; color: #777;">
        مع تحيات فريق عمل <b>برق تك</b><br>
        <a href="https://barqtech.ai" style="color: #082e71; text-decoration: none;">www.barqtech.ai</a>
      </p>
    </div>
  `;

    try {
      let sentSuccessfully = false;
      
      if (resend) {
        const response = await resend.emails.send({
          from: `برق تك <onboarding@resend.dev>`, 
          to: email,
          subject: subject || 'رد على استفسارك - برق تك',
          html: mailHtml,
        });
        
        console.log('Resend Response:', response);
        
        if (!response.error) {
          sentSuccessfully = true;
        } else {
          console.warn('Resend failed, trying SMTP fallback...', response.error);
        }
      }

      // Fallback to SMTP if Resend is not available or failed
      if (!sentSuccessfully) {
        console.log('Attempting SMTP Fallback...');
        await transporter.sendMail({
          from: `"${process.env.SITE_NAME || 'برق تك'}" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: subject || 'رد على استفسارك - برق تك',
          text: message,
          html: mailHtml,
        });
        sentSuccessfully = true;
        console.log('SMTP Fallback Successful');
      }

    // Save to database
    if (req.body.message_id) {
      db.prepare('INSERT INTO message_replies (message_id, admin_id, subject, message) VALUES (?, ?, ?, ?)')
        .run(req.body.message_id, req.user.id, subject || 'رد على استفسارك', message);
    }

    logAction(req, 'REPLY_TO_MESSAGE', 'contact_messages', req.body.message_id, { to: email });
    res.json({ message: 'تم إرسال الرد وحفظه بنجاح' });
  } catch (err) {
    console.error('Email Reply Error:', err);
    res.status(500).json({ error: 'حدث خطأ أثناء إرسال الإيميل' });
  }
});

// ═══════════════════════════════════════
//  SEO ROUTES
// ═══════════════════════════════════════

app.get('/api/seo', (req, res) => {
  res.json(db.prepare('SELECT * FROM seo_pages ORDER BY page_path').all());
});

app.get('/api/seo/:path(*)', (req, res) => {
  const page = db.prepare('SELECT * FROM seo_pages WHERE page_path = ?').get('/' + req.params.path);
  res.json(page || {});
});

app.put('/api/seo/:id', authMiddleware, (req, res) => {
  const { title, description, keywords, og_image, canonical_url, score } = req.body;
  db.prepare('UPDATE seo_pages SET title=?, description=?, keywords=?, og_image=?, canonical_url=?, score=?, updated_at=CURRENT_TIMESTAMP WHERE id=?').run(title, description, keywords, og_image, canonical_url, score, req.params.id);
  res.json({ message: 'تم تحديث SEO' });
});

// ═══════════════════════════════════════
//  SETTINGS ROUTES
// ═══════════════════════════════════════

app.get('/api/settings', (req, res) => {
  const rows = db.prepare('SELECT * FROM settings ORDER BY setting_group, setting_key').all();
  const settings = {};
  rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
  res.json(settings);
});

app.get('/api/settings/:group', (req, res) => {
  const rows = db.prepare('SELECT * FROM settings WHERE setting_group = ?').all(req.params.group);
  const settings = {};
  rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
  res.json(settings);
});

app.put('/api/settings', authMiddleware, (req, res) => {
  const updates = req.body;
  const stmt = db.prepare('UPDATE settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?');
  const insertStmt = db.prepare('INSERT OR IGNORE INTO settings (setting_key, setting_value, setting_group) VALUES (?, ?, ?)');
  Object.entries(updates).forEach(([key, value]) => {
    const result = stmt.run(value, key);
    if (result.changes === 0) insertStmt.run(key, value, 'general');
  });
  logAction(req, 'UPDATE_SETTINGS', 'settings', null, updates);
  res.json({ message: 'تم حفظ الإعدادات' });
});

// ═══════════════════════════════════════
//  FILE UPLOAD ROUTE
// ═══════════════════════════════════════

app.post('/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم اختيار ملف' });
  
  const { filename, path: tempPath, originalname, mimetype, size } = req.file;
  const targetPath = path.join(__dirname, 'uploads', `opt-${filename}`);
  const relativePath = `/uploads/opt-${filename}`;

  try {
    // Optimize image using sharp
    if (mimetype.startsWith('image/') && mimetype !== 'image/svg+xml') {
      await sharp(tempPath)
        .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(targetPath);
      
      // Delete temp original file
      const fs = require('fs');
      fs.unlinkSync(tempPath);
    } else {
      // For non-images or SVGs, just use as is
      const fs = require('fs');
      fs.renameSync(tempPath, path.join(__dirname, 'uploads', filename));
    }

    db.prepare('INSERT INTO media (filename, original_name, mime_type, size, path, uploaded_by) VALUES (?,?,?,?,?,?)')
      .run(filename, originalname, mimetype, size, relativePath, req.user.id);
    
    res.json({ url: relativePath, filename, message: 'تم رفع الملف وتحسينه بنجاح' });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الملف' });
  }
});

app.get('/api/media', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM media ORDER BY created_at DESC').all());
});

// ═══════════════════════════════════════
//  ANALYTICS ROUTES
// ═══════════════════════════════════════

app.post('/api/analytics/track', (req, res) => {
  const { page_path } = req.body;
  const ip = req.ip || req.connection?.remoteAddress || '';
  const ua = req.headers['user-agent'] || '';
  const referrer = req.headers.referer || '';
  
  // Simple Device Detection
  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = 'Mobile';
  if (/tablet|ipad/i.test(ua)) device = 'Tablet';
  
  // Simple Browser Detection
  let browser = 'Other';
  if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/edge/i.test(ua)) browser = 'Edge';

  // For country, we'd normally use an API, but for now we'll mark as 'Saudi Arabia' for demo or leave empty
  // In a real production, you'd call a geo-ip service here.
  const country = 'Saudi Arabia'; 

  db.prepare('INSERT INTO analytics_log (page_path, visitor_ip, user_agent, referrer, device, browser, country) VALUES (?,?,?,?,?,?,?)')
    .run(page_path, ip, ua, referrer, device, browser, country);
  res.json({ ok: true });
});

app.get('/api/analytics/summary', authMiddleware, (req, res) => {
  const today = db.prepare("SELECT COUNT(*) as count FROM analytics_log WHERE date(visited_at) = date('now')").get();
  const week = db.prepare("SELECT COUNT(*) as count FROM analytics_log WHERE visited_at >= datetime('now', '-7 days')").get();
  const month = db.prepare("SELECT COUNT(*) as count FROM analytics_log WHERE visited_at >= datetime('now', '-30 days')").get();
  const topPages = db.prepare("SELECT page_path, COUNT(*) as views FROM analytics_log GROUP BY page_path ORDER BY views DESC LIMIT 10").all();
  const topCountries = db.prepare("SELECT country, COUNT(*) as count FROM analytics_log GROUP BY country ORDER BY count DESC LIMIT 5").all();
  const devices = db.prepare("SELECT device, COUNT(*) as count FROM analytics_log GROUP BY device").all();
  
  // Real Traffic Sources Analysis
  const allLogs = db.prepare("SELECT referrer FROM analytics_log").all();
  let sources = { google: 0, social: 0, direct: 0, other: 0 };
  allLogs.forEach(log => {
    const ref = log.referrer?.toLowerCase() || '';
    if (!ref) sources.direct++;
    else if (ref.includes('google.com') || ref.includes('bing.com')) sources.google++;
    else if (ref.includes('facebook.com') || ref.includes('t.co') || ref.includes('instagram.com')) sources.social++;
    else sources.other++;
  });

  const unreadMessages = db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0').get();
  
  res.json({
    visitors: { today: today.count, week: week.count, month: month.count },
    topPages,
    topCountries,
    devices,
    sources,
    unreadMessages: unreadMessages.count
  });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  try {
    const services = db.prepare('SELECT COUNT(*) as count FROM services').get();
    const clients = db.prepare('SELECT COUNT(*) as count FROM clients').get();
    const articles = db.prepare('SELECT COUNT(*) as count FROM articles').get();
    const projects = db.prepare('SELECT COUNT(*) as count FROM projects').get();
    const messages = db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0').get();
    const todayVisits = db.prepare("SELECT COUNT(*) as count FROM analytics_log WHERE date(visited_at) = date('now')").get();
    
    res.json({
      services: services.count,
      clients: clients.count,
      articles: articles.count,
      projects: projects.count,
      unreadMessages: messages.count,
      todayVisits: todayVisits.count
    });
  } catch (err) {
    res.status(500).json({ error: 'خطأ في جلب بيانات لوحة التحكم' });
  }
});

app.get('/api/audit-logs', authMiddleware, (req, res) => {
  const logs = db.prepare(`
    SELECT a.*, u.name as user_name 
    FROM audit_logs a
    LEFT JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC 
    LIMIT 100
  `).all();
  res.json(logs);
});


// ═══════════════════════════════════════
//  NEWSLETTER ROUTES
// ═══════════════════════════════════════

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'البريد الإلكتروني مطلوب' });
  try {
    db.prepare('INSERT INTO newsletter_subs (email) VALUES (?)').run(email);
    res.json({ message: 'تم الاشتراك بنجاح' });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') return res.json({ message: 'أنت مشترك بالفعل!' });
    res.status(500).json({ error: 'حدث خطأ ما' });
  }
});

app.get('/api/newsletter/list', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM newsletter_subs ORDER BY created_at DESC').all());
});

// ═══════════════════════════════════════
//  SYSTEM LOGS & ERRORS
// ═══════════════════════════════════════

app.get('/api/system/logs', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 100').all());
});

// ─── Global Error Handler Middleware ───
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.message);
  try {
    db.prepare('INSERT INTO system_logs (level, message, stack, path, method) VALUES (?,?,?,?,?)')
      .run('error', err.message, err.stack, req.path, req.method);
  } catch (logErr) {
    console.error('LOGGING_FAILED:', logErr);
  }
  res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
});

// ─── Maintenance Middleware (Global) ───
app.use((req, res, next) => {
  // Allow API and static files
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/') || req.path.includes('.')) return next();
  // Allow Admin panel
  if (req.path.startsWith('/admin')) return next();
  
  try {
    const mode = db.prepare("SELECT setting_value FROM settings WHERE setting_key = 'maintenance_mode'").get();
    if (mode && mode.setting_value === '1') {
      return res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>صيانة مجدولة | برق تك</title>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f7faff; color: #082e71; text-align: center; }
            .container { padding: 40px; background: white; border-radius: 20px; shadow: 0 10px 30px rgba(0,0,0,0.05); }
            h1 { font-size: 2.5rem; margin-bottom: 10px; }
            p { font-size: 1.2rem; color: #6b7280; }
            .logo { max-width: 150px; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="/white.png" alt="Logo" class="logo" style="filter: brightness(0.2);">
            <h1>الموقع قيد الصيانة</h1>
            <p>نحن نقوم ببعض التحسينات لنقدم لكم خدمة أفضل. سنعود قريباً!</p>
            <div style="margin-top: 30px; font-weight: bold;">برق تك - Barq Tech</div>
          </div>
        </body>
        </html>
      `);
    }
  } catch (e) {}
  next();
});

// ═══════════════════════════════════════
//  SEARCH API
// ═══════════════════════════════════════

app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ articles: [], projects: [], services: [] });
  
  const searchStr = `%${q}%`;
  
  const articles = db.prepare(`
    SELECT id, title_ar, title_en, image, 'blog' as type 
    FROM articles 
    WHERE (title_ar LIKE ? OR title_en LIKE ? OR content_ar LIKE ? OR content_en LIKE ?) AND status = 'published'
  `).all(searchStr, searchStr, searchStr, searchStr);

  const projects = db.prepare(`
    SELECT id, title_ar, title_en, image, 'project' as type 
    FROM projects 
    WHERE (title_ar LIKE ? OR title_en LIKE ? OR description_ar LIKE ? OR description_en LIKE ?) AND status = 'published'
  `).all(searchStr, searchStr, searchStr, searchStr);

  const services = db.prepare(`
    SELECT id, title_ar, title_en, icon, 'service' as type 
    FROM services 
    WHERE (title_ar LIKE ? OR title_en LIKE ? OR description_ar LIKE ? OR description_en LIKE ?) AND is_active = 1
  `).all(searchStr, searchStr, searchStr, searchStr);

  res.json({ articles, projects, services });
});

// ─── Email Transporter ───
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: parseInt(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  family: 4, // إجبار استخدام IPv4 لحل مشكلة ENETUNREACH
  connectionTimeout: 20000,
});

// ─── System Tools Routes ───
app.post('/api/system/maintenance', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  const { enabled } = req.body;
  const val = enabled ? '1' : '0';
  
  const exists = db.prepare('SELECT id FROM settings WHERE setting_key = ?').get('maintenance_mode');
  if (exists) {
    db.prepare('UPDATE settings SET setting_value = ? WHERE setting_key = ?').run(val, 'maintenance_mode');
  } else {
    db.prepare('INSERT INTO settings (setting_key, setting_value, setting_group) VALUES (?, ?, ?)').run('maintenance_mode', val, 'general');
  }
  
  logAction(req, 'UPDATE_MAINTENANCE_MODE', 'system', null, { enabled });
  res.json({ success: true, maintenance_mode: val });
});

app.get('/api/system/backup', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  
  const backupFileName = `barqtech_backup_${Date.now()}.db`;
  const backupPath = path.join(__dirname, backupFileName);
  
  try {
    db.prepare(`VACUUM INTO '${backupPath}'`).run();
    res.download(backupPath, backupFileName, (err) => {
      const fs = require('fs');
      if (fs.existsSync(backupPath)) fs.unlinkSync(backupPath);
    });
  } catch (err) {
    console.error('Backup error:', err);
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

app.post('/api/system/restore', authMiddleware, upload.single('file'), (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'غير مسموح' });
  if (!req.file) return res.status(400).json({ error: 'يرجى إرفاق ملف النسخة الاحتياطية' });
  
  const fs = require('fs');
  const dbPath = path.join(__dirname, 'barqtech.db');
  const tempFile = req.file.path;
  
  try {
    // Verify it's a valid SQLite DB before replacing
    const testDb = require('better-sqlite3')(tempFile);
    testDb.prepare('SELECT count(*) FROM sqlite_master').get();
    testDb.close();

    // Close current connection
    db.close();

    // Remove WAL and SHM if they exist to prevent corruption
    const walPath = dbPath + '-wal';
    const shmPath = dbPath + '-shm';
    if (fs.existsSync(walPath)) fs.unlinkSync(walPath);
    if (fs.existsSync(shmPath)) fs.unlinkSync(shmPath);

    // Replace the DB
    fs.copyFileSync(tempFile, dbPath);
    fs.unlinkSync(tempFile);
    
    // Attempt graceful restart by exiting process
    setTimeout(() => {
      process.exit(0);
    }, 1000);
    
    res.json({ success: true, message: 'تم استعادة النسخة بنجاح! جاري إعادة تشغيل النظام...' });
  } catch (err) {
    console.error('Restore error:', err);
    const fs = require('fs');
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    res.status(500).json({ error: 'فشل استعادة النسخة الاحتياطية، تأكد من صحة الملف' });
  }
});

// ─── Sitemap Endpoint ───
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.FRONTEND_URL || 'https://barqtech.ai';
  const articles = db.prepare('SELECT id, updated_at FROM articles WHERE status = "published"').all();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/about</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/service</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/project</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/blog</loc><priority>0.8</priority></url>`;

  articles.forEach(a => {
    xml += `\n  <url><loc>${baseUrl}/blog/${a.id}</loc><lastmod>${new Date(a.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod><priority>0.6</priority></url>`;
  });
  
  res.header('Content-Type', 'application/xml');
  res.send(xml + '\n</urlset>');
});

// ─── Create uploads directory ───
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ─── Start Server ───
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   🚀 Barq Tech API Server           ║
  ║   Running on port ${PORT}              ║
  ║   http://localhost:${PORT}             ║
  ╚══════════════════════════════════════╝
  `);
});
