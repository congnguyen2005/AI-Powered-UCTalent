-- Bảng tổ chức/doanh nghiệp
CREATE TABLE organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_tone VARCHAR(50) DEFAULT 'professional',
    brand_values TEXT[] DEFAULT ARRAY['quality', 'service'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng người dùng
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff',
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng chi nhánh/địa điểm
CREATE TABLE locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    platform_id VARCHAR(255),
    platform_type VARCHAR(50) DEFAULT 'google'
);

-- Bảng đánh giá (Reviews) - QUAN TRỌNG NHẤT
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    external_id VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    author_name VARCHAR(255),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    sentiment VARCHAR(20), -- positive, neutral, negative
    sentiment_score FLOAT,
    priority VARCHAR(20) DEFAULT 'low', -- low, medium, high, critical
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    crisis_indicators JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng gợi ý AI
CREATE TABLE ai_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    suggested_response TEXT NOT NULL,
    confidence_score FLOAT DEFAULT 0.8,
    tone_used VARCHAR(50),
    model_used VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng phản hồi đã được duyệt
CREATE TABLE approved_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
    response_text TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng nhật ký audit
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm dữ liệu mẫu
INSERT INTO organizations (id, name, brand_tone) VALUES ('11111111-1111-1111-1111-111111111111', 'Khách Sạn Mẫu', 'hospitality');
INSERT INTO users (id, email, password_hash, name, role, organization_id) VALUES ('22222222-2222-2222-2222-222222222222', 'admin@demo.com', '$2a$10$dummyhash', 'Admin', 'super_admin', '11111111-1111-1111-1111-111111111111');
-- Mật khẩu cho admin@demo.com là 'admin123' (bcrypt hash sẽ được tạo trong code)