📖 AI ORM Platform
<div align="center"> <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" alt="Next.js"> <img src="https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript" alt="TypeScript"> <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS"> <img src="https://img.shields.io/badge/Supabase-2.49-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase"> <img src="https://img.shields.io/badge/OpenAI-1.0-412991?style=for-the-badge&logo=openai" alt="OpenAI"> <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"> </div>
<p align="center"> <strong>🚀 Nền tảng quản trị danh tiếng thông minh</strong><br> Tự động hóa quản lý đánh giá khách hàng với trí tuệ nhân tạo </p><p align="center"> <a href="#-tính-năng-chính">Tính năng</a> • <a href="#-yêu-cầu-hệ-thống">Yêu cầu</a> • <a href="#-cài-đặt-nhanh">Cài đặt</a> • <a href="#-cấu-hình">Cấu hình</a> • <a href="#-chạy-dự-án">Chạy dự án</a> • <a href="#-hỗ-trợ">Hỗ trợ</a> </p><hr>
✨ Tính năng chính
<table> <tr> <td align="center" width="33%"> <br> <strong>🤖 AI Response</strong><br> <sub>Tạo phản hồi thông minh<br>cho đánh giá khách hàng</sub> </td> <td align="center" width="33%"> <br> <strong>📊 Sentiment Analysis</strong><br> <sub>Phân tích cảm xúc<br>khách hàng realtime</sub> </td> <td align="center" width="33%"> <br> <strong>🚨 Crisis Detection</strong><br> <sub>Phát hiện sớm<br>rủi ro danh tiếng</sub> </td> </tr> <tr> <td align="center"> <br> <strong>📈 Analytics</strong><br> <sub>Báo cáo chi tiết<br>hiệu suất & danh tiếng</sub> </td> <td align="center"> <br> <strong>🏢 Multi-branch</strong><br> <sub>Quản lý nhiều<br>chi nhánh</sub> </td> <td align="center"> <br> <strong>🔐 RBAC</strong><br> <sub>Phân quyền người dùng<br>chi tiết</sub> </td> </tr> </table>
📋 Yêu cầu hệ thống
Công nghệ	Phiên bản
<img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js" width="120">	>= 20.x
<img src="https://img.shields.io/badge/npm-9.x-CB3837?logo=npm" width="100">	>= 9.x
<img src="https://img.shields.io/badge/PostgreSQL-15.x-4169E1?logo=postgresql" width="130">	>= 15.x
<img src="https://img.shields.io/badge/Redis-7.x-DC382D?logo=redis" width="100">	>= 7.x (tùy chọn)
⚡ Cài đặt nhanh
bash
# 1. Clone dự án
git clone https://github.com/congnguyen2005/AI-Powered-UCTalent.git
cd AI-Powered-UCTalent

# 2. Cài đặt dependencies
npm install

# 3. Tạo file cấu hình
cp .env.example .env.local

# 4. Chạy dự án
npm run dev
🔧 Cấu hình
1. Biến môi trường (.env.local)
env

# 🚀 NEXT.JS
NEXT_PUBLIC_APP_URL=http://localhost:3000
# 🗄️ SUPABASE DATABASE
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-key

# ─────────────────────────────────────────────
# 🤖 OPENAI API (Tùy chọn)
# ─────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-your-openai-api-key

# ─────────────────────────────────────────────
# 🔐 JWT AUTHENTICATION
# ─────────────────────────────────────────────
JWT_SECRET=your-super-secret-key-min-32-chars

# ─────────────────────────────────────────────
# 🎮 DEMO MODE (Phát triển không cần DB)
# ─────────────────────────────────────────────
DEMO_MODE=true
2. Tạo JWT Secret
bash
openssl rand -hex 32
# Kết quả: dcc14309276d73c97f3e226f1f4c149c58ef7b2135a2bfd94e7d46b1ca42ab5b
🗄️ Cấu hình Supabase
Tạo dự án
Truy cập Supabase → New project

Đặt tên: ai-powered-uctalent

Chọn region gần bạn

Chờ khởi tạo (2-3 phút)

Lấy thông tin
Vào Settings → API, sao chép:

Thông tin	Biến môi trường
Project URL	NEXT_PUBLIC_SUPABASE_URL
anon public key	NEXT_PUBLIC_SUPABASE_ANON_KEY
service_role key	SUPABASE_SERVICE_ROLE_KEY
Tạo bảng
Vào SQL Editor, chạy:

<details> <summary><b>📝 Xem SQL tạo bảng</b></summary>
sql
-- Tạo bảng organizations
CREATE TABLE IF NOT EXISTS organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_tone VARCHAR(50) DEFAULT 'professional',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff',
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id),
    platform VARCHAR(50) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    author_name VARCHAR(255),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    sentiment VARCHAR(20),
    priority VARCHAR(20) DEFAULT 'low',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dữ liệu mẫu
INSERT INTO organizations (id, name) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Demo Organization')
ON CONFLICT (id) DO NOTHING;
</details>
🤖 Cấu hình OpenAI (Tùy chọn)
Truy cập OpenAI Platform

Create new secret key

Sao chép key → .env.local

💡 Không có OpenAI key? Hệ thống vẫn chạy với chế độ demo!

🚀 Chạy dự án
Development
bash
npm run dev
👉 Truy cập: http://localhost:3000

Production
bash
npm run build
npm run start
Docker
<details> <summary><b>🐳 Dockerfile</b></summary>
dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
</details>
bash
docker build -t ai-orm-platform .
docker run -p 3000:3000 --env-file .env.local ai-orm-platform
🔐 Tài khoản đăng nhập
👤 Vai trò	📧 Email	🔑 Mật khẩu
👑 Super Admin	admin@demo.com	admin123
⚠️ Hoạt động khi DEMO_MODE=true

📁 Cấu trúc thư mục
text
📂 ai-orm-platform/
├── 📂 app/
│   ├── 📂 api/          # API Routes
│   ├── 📂 auth/         # Đăng nhập/Đăng ký
│   ├── 📂 components/   # React components
│   ├── 📂 dashboard/    # Trang chính
│   └── 📂 lib/          # Tiện ích
├── 📂 public/           # Tài nguyên tĩnh
├── 📄 .env.local        # Biến môi trường
├── 📄 package.json      # Dependencies
└── 📄 tsconfig.json     # TypeScript
🛠️ Các lệnh
Lệnh	Mô tả
npm run dev	🔧 Chạy development
npm run build	📦 Build production
npm run start	🚀 Chạy production
npm run lint	🔍 Kiểm tra code
🐛 Xử lý lỗi
<details> <summary><b>❌ 401 khi đăng nhập</b></summary>
Kiểm tra DEMO_MODE=true trong .env.local

Restart: npm run dev

</details><details> <summary><b>❌ Lỗi kết nối Supabase</b></summary>
Kiểm lại URL và keys

Đảm bảo dự án đang hoạt động

</details><details> <summary><b>❌ Lỗi OpenAI</b></summary>
Kiểm tra API key

Hệ thống tự động dùng chế độ demo

</details><details> <summary><b>❌ Lỗi Redis</b></summary>
Không bắt buộc, tự động fallback sang memory cache

Hoặc cài: docker run -d -p 6379:6379 redis

</details>
📞 Hỗ trợ
<div align="center">
Kênh	Liên kết
📧 Email	dangcongnguyenst@gmail.com
🐙 GitHub	AI-Powered-UCTalent
</div>
📄 License
<div align="center"> <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"> <br> <sub>Copyright © 2026 AI ORM Platform</sub> </div>
<p align="center"> <sub>Built with ❤️ using Next.js, TypeScript, TailwindCSS, Supabase & OpenAI</sub> </p>
