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

AI_RESPONSE_CACHE_TTL=300
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60


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
docker build -t ai-orm-platform .

# Chạy container
docker run -p 3000:3000 --env-file .env.local ai-orm-platform
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
