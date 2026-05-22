<<<<<<< HEAD
📖 AI ORM Platform - Hướng dẫn cài đặt và vận hành
Giới thiệu
AI ORM Platform là nền tảng quản trị danh tiếng thông minh sử dụng trí tuệ nhân tạo (AI) để tự động hóa việc quản lý đánh giá khách hàng. Hệ thống giúp doanh nghiệp phân tích cảm xúc, phát hiện khủng hoảng truyền thông, và tạo phản hồi thông minh cho khách hàng.

Tính năng chính
🤖 AI Response Generation - Tạo phản hồi thông minh cho đánh giá khách hàng

📊 Sentiment Analysis - Phân tích cảm xúc khách hàng theo thời gian thực

🚨 Crisis Detection - Phát hiện sớm các nguy cơ khủng hoảng truyền thông

📈 Analytics Dashboard - Báo cáo chi tiết về hiệu suất và danh tiếng

👥 Multi-branch Management - Quản lý nhiều chi nhánh

🔐 RBAC - Phân quyền người dùng chi tiết

🔌 API Integration - Tích hợp với các nền tảng bên thứ ba

📋 Yêu cầu hệ thống
Yêu cầu	Phiên bản
Node.js	>= 20.x
npm	>= 9.x
PostgreSQL (Supabase)	>= 15.x
Redis (tùy chọn)	>= 7.x
🚀 Cài đặt dự án
Bước 1: Clone dự án
bash
git clone https://github.com/your-repo/ai-orm-platform.git
cd ai-orm-platform
Bước 2: Cài đặt dependencies
bash
npm install
Hoặc nếu dùng yarn:

bash
yarn install
Bước 3: Cấu hình môi trường
Tạo file .env.local trong thư mục gốc của dự án:

env
# ============================================
# NEXT.JS CONFIGURATION
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# SUPABASE DATABASE CONFIGURATION
# ============================================
# Lấy từ Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key-here
SUPABASE_SERVICE_ROLE_KEY=your-secret-key-here

# ============================================
# OPENAI API CONFIGURATION
# ============================================
# Lấy từ https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-openai-api-key

# ============================================
# JWT AUTHENTICATION
# ============================================
# Tạo bằng lệnh: openssl rand -hex 32
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# ============================================
# REDIS CACHE (TÙY CHỌN)
# ============================================
REDIS_URL=redis://localhost:6379

# ============================================
# RATE LIMITING
# ============================================
=======
# 🚀 AI ORM Platform - Hệ thống quản trị danh tiếng thông minh

<div align="center">
  
  <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Supabase-2.49-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/OpenAI-1.0-412991?style=for-the-badge&logo=openai" alt="OpenAI">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel">
  
</div>

<br>

<p align="center">
  <strong>🤖 Nền tảng quản lý đánh giá khách hàng bằng trí tuệ nhân tạo</strong><br>
  Tự động phân tích cảm xúc, phát hiện khủng hoảng và tạo phản hồi thông minh
</p>

<p align="center">
  <a href="#demo">🌐 Demo</a> •
  <a href="#tinh-nang">✨ Tính năng</a> •
  <a href="#cai-dat">⚡ Cài đặt</a> •
  <a href="#api">📡 API</a> •
  <a href="#ho-tro">📞 Hỗ trợ</a>
</p>

---

## 🌐 Demo {#demo}

| Môi trường | Link |
|------------|------|
| 🌍 Production | **[https://ai-powered-uctalent.vercel.app](https://ai-powered-uctalent.vercel.app)** |
| 💻 Local | `http://localhost:3000` |
| 📦 Repository | **[github.com/congnguyen2005/AI-Powered-UCTalent](https://github.com/congnguyen2005/AI-Powered-UCTalent)** |

### 🔐 Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| 👑 Super Admin | `admin@demo.com` | `admin123` |

---

## ✨ Tính năng {#tinh-nang}

| Tính năng | Mô tả |
|-----------|-------|
| 🤖 **AI Response** | Tạo phản hồi thông minh cho đánh giá khách hàng |
| 📊 **Sentiment Analysis** | Phân tích cảm xúc khách hàng theo thời gian thực |
| 🚨 **Crisis Detection** | Phát hiện sớm rủi ro khủng hoảng truyền thông |
| 📈 **Analytics Dashboard** | Báo cáo chi tiết về hiệu suất và danh tiếng |
| 🏢 **Multi-branch** | Quản lý đánh giá cho nhiều chi nhánh |
| 🔐 **RBAC** | Phân quyền người dùng chi tiết (Admin/Manager/Staff) |
| 🎨 **Brand Voice** | Cấu hình giọng nói và phong cách thương hiệu |
| 📱 **Responsive** | Giao diện tương thích mọi thiết bị |
| 🌙 **Dark Mode** | Hỗ trợ giao diện tối |

---

## 🏗️ Kiến trúc hệ thống
┌─────────────────────────────────────────────────────────────┐
│ 🌐 Client Browser │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ ⚡ Next.js 15 (App Router) │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │ Pages │ │ Components │ │ API Routes │ │
│ │ (RSC/CSR) │ │ (React) │ │ (Serverless Func) │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────┼─────────────────────┐
▼ ▼ ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 🗄️ Supabase │ │ 🤖 OpenAI │ │ 💾 Redis │
│ (PostgreSQL) │ │ (GPT-4o) │ │ (Cache) │
└─────────────────┘ └─────────────────┘ └─────────────────┘

text

---

## 📋 Yêu cầu hệ thống {#yeu-cau}

| Công nghệ | Phiên bản |
|-----------|-----------|
| Node.js | >= 20.x |
| npm / yarn | >= 9.x |
| PostgreSQL (Supabase) | >= 15.x |
| Redis (tùy chọn) | >= 7.x |

---

## ⚡ Cài đặt nhanh {#cai-dat}

```bash
# 1. Clone dự án
git clone https://github.com/congnguyen2005/AI-Powered-UCTalent.git
cd AI-Powered-UCTalent/testnanglucuctalent

# 2. Cài đặt dependencies
npm install

# 3. Tạo file cấu hình
cp .env.example .env.local

# 4. Chạy dự án
npm run dev
👉 Truy cập: http://localhost:3000


🔧 Cấu hình
Biến môi trường (.env.local)
env
# 🚀 NEXT.JS
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://fnxzwkahxhkakagtnxhv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_jA1_uAXaoQsruYeVwsGmNA_tT-x__80
SUPABASE_SERVICE_ROLE_KEY=sb_secret_aZQ8_sKtXeAxnJDtWFbkSQ_xfvBYASO

OPENAI_API_KEY=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

JWT_SECRET=dcc14309276d73c97f3e226f1f4c149c58ef7b2135a2bfd94e7d46b1ca42ab5b
REDIS_URL=redis://localhost:6379

>>>>>>> 31cdb26f9290dd2c59b43e0f9d5f7514ba1f408e
AI_RESPONSE_CACHE_TTL=300
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60

<<<<<<< HEAD
# ============================================
# DEMO MODE (BỎ QUA DATABASE CHO DEVELOPMENT)
# ============================================
DEMO_MODE=true
Bước 4: Tạo JWT Secret Key
bash
# Trên Linux/Mac/Git Bash
openssl rand -hex 32

# Kết quả mẫu: dcc14309276d73c97f3e226f1f4c149c58ef7b2135a2bfd94e7d46b1ca42ab5b
🗄️ Cấu hình Supabase Database
Tạo dự án Supabase
Truy cập https://supabase.com và đăng nhập

Nhấn "New project"

Điền thông tin:

Name: ai-orm-platform

Database Password: Tạo mật khẩu mạnh

Region: Chọn gần bạn nhất (ví dụ: Southeast Asia)

Chờ dự án khởi tạo (khoảng 2-3 phút)

Lấy thông tin kết nối
Sau khi dự án sẵn sàng:

Vào Settings → API

Sao chép:

Project URL → NEXT_PUBLIC_SUPABASE_URL

anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY

service_role key → SUPABASE_SERVICE_ROLE_KEY

Tạo bảng database
Vào SQL Editor và chạy các câu lệnh sau:

sql
-- ============================================
-- TẠO BẢNG ORGANIZATIONS (TỔ CHỨC/DOANH NGHIỆP)
-- ============================================
CREATE TABLE IF NOT EXISTS organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50),
    brand_tone VARCHAR(50) DEFAULT 'professional',
    brand_values TEXT[] DEFAULT ARRAY['quality', 'service'],
    logo_url TEXT,
    website VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG USERS (NGƯỜI DÙNG)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'staff',
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG BRANCHES (CHI NHÁNH)
-- ============================================
CREATE TABLE IF NOT EXISTS branches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    manager_id UUID REFERENCES users(id),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG REVIEWS (ĐÁNH GIÁ)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    external_id VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    sentiment VARCHAR(20),
    sentiment_score FLOAT,
    priority VARCHAR(20) DEFAULT 'low',
    status VARCHAR(20) DEFAULT 'pending',
    crisis_score FLOAT DEFAULT 0,
    crisis_reasons TEXT[],
    is_responded BOOLEAN DEFAULT false,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG AI_RESPONSES (PHẢN HỒI AI)
-- ============================================
CREATE TABLE IF NOT EXISTS ai_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    suggested_response TEXT NOT NULL,
    confidence_score FLOAT DEFAULT 0.8,
    tone_used VARCHAR(50),
    model_used VARCHAR(50),
    is_approved BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG APPROVED_RESPONSES
-- ============================================
CREATE TABLE IF NOT EXISTS approved_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
    response_text TEXT NOT NULL,
    approved_by UUID REFERENCES users(id),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG NOTIFICATIONS (THÔNG BÁO)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50),
    title VARCHAR(255),
    body TEXT,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO BẢNG AUDIT_LOGS (NHẬT KÝ HỆ THỐNG)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TẠO INDEXES (TĂNG HIỆU SUẤT)
-- ============================================
CREATE INDEX idx_reviews_organization_id ON reviews(organization_id);
CREATE INDEX idx_reviews_branch_id ON reviews(branch_id);
CREATE INDEX idx_reviews_sentiment ON reviews(sentiment);
CREATE INDEX idx_reviews_priority ON reviews(priority);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_date ON reviews(date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ============================================
-- TẠO RLS (ROW LEVEL SECURITY) POLICIES
-- ============================================
-- Bật RLS trên các bảng
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy cho organizations
CREATE POLICY "Users can view their organization" ON organizations
    FOR SELECT USING (id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

-- ============================================
-- THÊM DỮ LIỆU MẪU
-- ============================================
INSERT INTO organizations (id, name, brand_tone) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Demo Organization', 'professional')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, email, password_hash, name, role, organization_id) 
VALUES (
    '22222222-2222-2222-2222-222222222222', 
    'admin@demo.com', 
    '$2a$10$dummyhash', 
    'Admin Demo', 
    'super_admin', 
    '11111111-1111-1111-1111-111111111111'
) ON CONFLICT (id) DO NOTHING;
🔧 Cấu hình OpenAI API
Truy cập https://platform.openai.com/api-keys

Đăng nhập tài khoản OpenAI

Nhấn "Create new secret key"

Đặt tên (ví dụ: AI ORM Platform)

Sao chép key và thêm vào .env.local

🚀 Chạy dự án
Development mode
bash
npm run dev
Truy cập: http://localhost:3000

Production build
bash
# Build dự án
npm run build

# Chạy production server
npm run start
Build với Docker (tùy chọn)
dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
bash
# Build Docker image
=======

# 🎮 DEMO MODE (Bỏ qua database cho development)
DEMO_MODE=true
Tạo JWT Secret
bash
openssl rand -hex 32
# Kết quả: dcc14309276d73c97f3e226f1f4c149c58ef7b2135a2bfd94e7d46b1ca42ab5b
🗄️ Cấu hình Supabase
1. Tạo dự án
Truy cập supabase.com → New project

Đặt tên: ai-powered-uctalent

Chọn region: Southeast Asia

Chờ khởi tạo (2-3 phút)

2. Lấy thông tin kết nối
Vào Settings → API, sao chép:

Thông tin	Biến môi trường
Project URL	NEXT_PUBLIC_SUPABASE_URL
anon public key	NEXT_PUBLIC_SUPABASE_ANON_KEY
service_role key	SUPABASE_SERVICE_ROLE_KEY
3. Tạo bảng
Vào SQL Editor, chạy file database-schema.sql có sẵn trong dự án.

🤖 Cấu hình OpenAI (Tùy chọn)
Truy cập platform.openai.com/api-keys

Create new secret key

Sao chép key → .env.local

💡 Không có OpenAI key? Hệ thống vẫn chạy với chế độ demo!

🚀 Chạy dự án
Development
bash
npm run dev
Production
bash
npm run build
npm run start
Deploy lên Vercel
bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
Deploy với Docker
bash
# Build image
>>>>>>> 31cdb26f9290dd2c59b43e0f9d5f7514ba1f408e
docker build -t ai-orm-platform .

# Chạy container
docker run -p 3000:3000 --env-file .env.local ai-orm-platform
<<<<<<< HEAD
🔐 Tài khoản đăng nhập
Vai trò	Email	Mật khẩu
Super Admin	admin@demo.com	admin123
Lưu ý: Tài khoản này hoạt động khi DEMO_MODE=true trong .env.local

📁 Cấu trúc thư mục dự án
text
ai-orm-platform/
├── app/
│   ├── api/                    # API Routes
│   │   ├── ai/                 # AI endpoints
│   │   ├── auth/               # Authentication endpoints
│   │   └── reviews/            # Review endpoints
│   ├── auth/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── components/             # React components
│   │   └── dashboard/          # Dashboard components
│   ├── dashboard/              # Dashboard pages
│   │   ├── ai/                 # AI features
│   │   ├── analytics/          # Analytics pages
│   │   ├── crisis/             # Crisis center
│   │   ├── docs/               # Documentation
│   │   ├── help/               # Help center
│   │   ├── organization/       # Org management
│   │   ├── reviews/            # Review management
│   │   └── settings/           # Settings pages
│   └── lib/                    # Shared utilities
│       ├── ai/                 # AI services
│       ├── supabase/           # Supabase clients
│       ├── auth.ts             # JWT auth
│       ├── cache.ts            # Caching
│       ├── rate-limit.ts       # Rate limiting
│       └── redis.ts            # Redis client
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.mjs             # Next.js config
├── tailwind.config.ts          # Tailwind CSS config
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
🛠️ Các lệnh hữu ích
Lệnh	Mô tả
npm run dev	Chạy development server
npm run build	Build production bundle
npm run start	Chạy production server
npm run lint	Kiểm tra code style
npm run type-check	Kiểm tra TypeScript
🐛 Xử lý lỗi thường gặp
Lỗi 401 khi đăng nhập
Nguyên nhân: API login chưa được cấu hình đúng

Cách khắc phục:

Kiểm tra file app/api/auth/login/route.ts tồn tại

Đảm bảo DEMO_MODE=true trong .env.local

Restart server: npm run dev

Lỗi kết nối Supabase
Nguyên nhân: Sai thông tin kết nối

Cách khắc phục:

Kiểm tra lại NEXT_PUBLIC_SUPABASE_URL và các keys

Đảm bảo dự án Supabase đang hoạt động

Kiểm tra network/firewall

Lỗi OpenAI API
Nguyên nhân: Key không hợp lệ hoặc hết credit

Cách khắc phục:

Kiểm tra OPENAI_API_KEY trong .env.local

Kiểm tra số dư credit tại OpenAI dashboard

Hệ thống sẽ tự động dùng mock responses nếu OpenAI không khả dụng

Lỗi Redis connection
Nguyên nhân: Redis chưa được cài đặt

Cách khắc phục:

Không cần Redis, hệ thống sẽ tự động dùng memory cache fallback

Hoặc cài Redis: docker run -d -p 6379:6379 redis

🔄 CI/CD với GitHub Actions
yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run test
      # Thêm bước deploy lên Vercel/Railway/AWS
📞 Hỗ trợ
Email: dangcongnguyenst@gmail.com

GitHub Issues: https://github.com/your-repo/ai-orm-platform/issues

📄 License
MIT License - Vui lòng xem file LICENSE để biết thêm chi tiết.

🙏 Cảm ơn
Next.js

Supabase

OpenAI

Tailwind CSS

Framer Motion

© 2026 AI ORM Platform. All rights reserved.
=======
📁 Cấu trúc thư mục
text
📂 testnanglucuctalent/
├── 📂 app/
│   ├── 📂 api/                    # API Routes
│   ├── 📂 auth/                   # Đăng nhập/Đăng ký
│   ├── 📂 components/             # React components
│   ├── 📂 dashboard/              # Dashboard pages
│   │   ├── 📂 ai/                 # AI features
│   │   ├── 📂 analytics/          # Analytics pages
│   │   ├── 📂 crisis/             # Crisis center
│   │   ├── 📂 docs/               # Documentation
│   │   ├── 📂 help/               # Help center
│   │   ├── 📂 organization/       # Org management
│   │   ├── 📂 reviews/            # Review management
│   │   └── 📂 settings/           # Settings pages
│   └── 📂 lib/                    # Shared utilities
├── 📂 public/                     # Static assets
├── 📄 .env.local                  # Environment variables
├── 📄 package.json                # Dependencies
├── 📄 tailwind.config.ts          # Tailwind CSS config
├── 📄 tsconfig.json               # TypeScript config
└── 📄 README.md                   # Documentation
📡 API Documentation {#api}
Authentication
Method	Endpoint	Mô tả
POST	/api/auth/login	Đăng nhập
POST	/api/auth/register	Đăng ký
POST	/api/auth/logout	Đăng xuất
AI
Method	Endpoint	Mô tả
POST	/api/ai/generate-response	Tạo phản hồi AI
Reviews
Method	Endpoint	Mô tả
GET	/api/reviews	Lấy danh sách review
POST	/api/reviews/approve	Duyệt phản hồi
Ví dụ request
bash
# Đăng nhập
curl -X POST https://ai-powered-uctalent.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'

# Tạo phản hồi AI
curl -X POST https://ai-powered-uctalent.vercel.app/api/ai/generate-response \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"reviewText": "Dịch vụ tuyệt vời! Nhân viên thân thiện."}'
🛠️ Các lệnh
Lệnh	Mô tả
npm run dev	🔧 Chạy development server
npm run build	📦 Build production
npm run start	🚀 Chạy production server
npm run lint	🔍 Kiểm tra code style
🐛 Xử lý lỗi
<details> <summary><b>❌ 401 khi đăng nhập</b></summary>
Kiểm tra DEMO_MODE=true trong .env.local

Restart server: npm run dev

</details><details> <summary><b>❌ Lỗi kết nối Supabase</b></summary>
Kiểm tra lại URL và API keys

Đảm bảo dự án Supabase đang hoạt động

</details><details> <summary><b>❌ Lỗi OpenAI</b></summary>
Hệ thống tự động chuyển sang chế độ demo

Kiểm tra API key nếu muốn dùng AI thật

</details><details> <summary><b>❌ Lỗi Port 3000</b></summary>
bash
npx kill-port 3000
# Hoặc đổi port: npm run dev -- -p 3001
</details>
📊 Thống kê dự án
Chỉ số	Số lượng
📄 Pages	25+
🔌 API Endpoints	8
🧩 Components	15+
⏱️ Thời gian	7 ngày
📄 License
<div align="center"> <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"> <br> <strong>MIT License</strong><br> <sub>Copyright © 2026 Đặng Công Nguyên</sub><br> <sub>Dự án được phát triển cho bài test UCTalent Labs</sub> </div>
📞 Hỗ trợ {#ho-tro}
<div align="center">
Kênh	Liên kết
📧 Email	dangcongnguyenst@gmail.com
🐙 GitHub	@congnguyen2005
🌐 Demo	ai-powered-uctalent.vercel.app
</div>
🙏 Cảm ơn
Next.js - React Framework

Supabase - Database

OpenAI - GPT-4 API

Tailwind CSS - Styling

Framer Motion - Animations

Lucide Icons - Icons

<p align="center"> <sub>Built with ❤️ by Đặng Công Nguyên</sub><br> <sub>© 2026 AI ORM Platform - UCTalent Labs Test Assignment</sub> </p><p align="center"> <a href="#-ai-orm-platform---hệ-thống-quản-trị-danh-tiếng-thông-minh">⬆️ Lên đầu trang</a> </p> ```
>>>>>>> 31cdb26f9290dd2c59b43e0f9d5f7514ba1f408e
