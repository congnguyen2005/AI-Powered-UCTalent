-- database-schema.sql - Schema đầy đủ cho Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== ORGANIZATIONS ====================
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    website VARCHAR(255),
    logo_url TEXT,
    subscription_plan VARCHAR(50) DEFAULT 'trial',
    subscription_status VARCHAR(50) DEFAULT 'active',
    subscription_expires_at TIMESTAMP,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== USERS ====================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'staff',
    status VARCHAR(50) DEFAULT 'active',
    last_login TIMESTAMP,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== BRANCHES ====================
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    status VARCHAR(50) DEFAULT 'active',
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== PLATFORMS / SOURCES ====================
CREATE TABLE platforms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
    platform_type VARCHAR(50) NOT NULL, -- google, facebook, tripadvisor, etc.
    platform_id VARCHAR(255),
    name VARCHAR(255),
    api_key_encrypted TEXT,
    api_secret_encrypted TEXT,
    webhook_url TEXT,
    webhook_secret TEXT,
    last_sync_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== REVIEWS ====================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    platform_id UUID REFERENCES platforms(id) ON DELETE SET NULL,
    external_id VARCHAR(255),
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    author_avatar TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    response TEXT,
    responded_at TIMESTAMP,
    date TIMESTAMP NOT NULL,
    sentiment VARCHAR(20), -- positive, neutral, negative
    sentiment_score DECIMAL(5, 4),
    priority VARCHAR(20), -- low, medium, high, critical
    crisis_score DECIMAL(5, 4),
    crisis_reasons TEXT[],
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, auto_responded
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    language VARCHAR(10) DEFAULT 'vi',
    is_responded BOOLEAN DEFAULT FALSE,
    raw_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== AI RESPONSES ====================
CREATE TABLE ai_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    strategy VARCHAR(100),
    tone VARCHAR(50),
    score DECIMAL(5, 4),
    was_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    was_edited BOOLEAN DEFAULT FALSE,
    original_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== ANALYTICS ====================
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    total_reviews INT DEFAULT 0,
    avg_rating DECIMAL(3, 2) DEFAULT 0,
    positive_count INT DEFAULT 0,
    neutral_count INT DEFAULT 0,
    negative_count INT DEFAULT 0,
    responded_count INT DEFAULT 0,
    pending_count INT DEFAULT 0,
    critical_count INT DEFAULT 0,
    avg_response_time_seconds DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(organization_id, branch_id, date)
);

-- ==================== AUDIT LOGS ====================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(255),
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== NOTIFICATIONS ====================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    data JSONB,
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== USER PERMISSIONS ====================
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    resource VARCHAR(100),
    action VARCHAR(50)
);

CREATE TABLE user_permissions (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMP DEFAULT NOW(),
    granted_by UUID REFERENCES users(id),
    PRIMARY KEY (user_id, permission_id)
);

CREATE TABLE role_permissions (
    role VARCHAR(50) NOT NULL,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role, permission_id)
);

-- ==================== BRAND VOICE SETTINGS ====================
CREATE TABLE brand_voice_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE UNIQUE,
    tone VARCHAR(50) DEFAULT 'professional',
    formality VARCHAR(50) DEFAULT 'formal',
    response_length VARCHAR(20) DEFAULT 'medium',
    keywords TEXT[] DEFAULT ARRAY['chất lượng', 'uy tín', 'chuyên nghiệp'],
    greeting TEXT DEFAULT 'Kính gửi quý khách',
    closing TEXT DEFAULT 'Trân trọng cảm ơn',
    custom_prompt TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== API KEYS ====================
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    key_preview VARCHAR(50),
    permissions TEXT[] DEFAULT ARRAY['read'],
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    revoked_at TIMESTAMP
);

-- ==================== CRISIS EVENTS ====================
CREATE TABLE crisis_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'high', -- low, medium, high, critical
    status VARCHAR(20) DEFAULT 'open', -- open, investigating, resolved, false_alarm
    triggered_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX idx_reviews_organization_id ON reviews(organization_id);
CREATE INDEX idx_reviews_branch_id ON reviews(branch_id);
CREATE INDEX idx_reviews_date ON reviews(date);
CREATE INDEX idx_reviews_sentiment ON reviews(sentiment);
CREATE INDEX idx_reviews_priority ON reviews(priority);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_audit_logs_organization_id ON audit_logs(organization_id);
CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_notifications_user_id_read ON notifications(user_id, read);
CREATE INDEX idx_crisis_events_organization_id_status ON crisis_events(organization_id, status);

-- ==================== TRIGGERS ====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brand_voice_settings_updated_at BEFORE UPDATE ON brand_voice_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== INSERT DEFAULT DATA ====================

-- Insert default permissions
INSERT INTO permissions (id, name, description, resource, action) VALUES
    (uuid_generate_v4(), 'view_dashboard', 'Xem bảng điều khiển', 'dashboard', 'view'),
    (uuid_generate_v4(), 'view_reviews', 'Xem đánh giá', 'reviews', 'view'),
    (uuid_generate_v4(), 'respond_reviews', 'Phản hồi đánh giá', 'reviews', 'respond'),
    (uuid_generate_v4(), 'approve_responses', 'Duyệt phản hồi AI', 'responses', 'approve'),
    (uuid_generate_v4(), 'configure_ai', 'Cấu hình AI', 'ai', 'configure'),
    (uuid_generate_v4(), 'manage_users', 'Quản lý người dùng', 'users', 'manage'),
    (uuid_generate_v4(), 'view_reports', 'Xem báo cáo', 'reports', 'view'),
    (uuid_generate_v4(), 'export_data', 'Xuất dữ liệu', 'data', 'export'),
    (uuid_generate_v4(), 'manage_branches', 'Quản lý chi nhánh', 'branches', 'manage'),
    (uuid_generate_v4(), 'view_crisis', 'Xem khủng hoảng', 'crisis', 'view'),
    (uuid_generate_v4(), 'handle_crisis', 'Xử lý khủng hoảng', 'crisis', 'handle'),
    (uuid_generate_v4(), 'manage_api_keys', 'Quản lý API keys', 'api_keys', 'manage');

-- Insert role permissions
INSERT INTO role_permissions (role, permission_id) VALUES
    ('super_admin', (SELECT id FROM permissions WHERE name = 'view_dashboard')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'view_reviews')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'respond_reviews')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'approve_responses')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'configure_ai')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'manage_users')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'view_reports')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'export_data')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'manage_branches')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'view_crisis')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'handle_crisis')),
    ('super_admin', (SELECT id FROM permissions WHERE name = 'manage_api_keys')),
    
    ('admin', (SELECT id FROM permissions WHERE name = 'view_dashboard')),
    ('admin', (SELECT id FROM permissions WHERE name = 'view_reviews')),
    ('admin', (SELECT id FROM permissions WHERE name = 'respond_reviews')),
    ('admin', (SELECT id FROM permissions WHERE name = 'approve_responses')),
    ('admin', (SELECT id FROM permissions WHERE name = 'view_reports')),
    ('admin', (SELECT id FROM permissions WHERE name = 'export_data')),
    ('admin', (SELECT id FROM permissions WHERE name = 'manage_branches')),
    ('admin', (SELECT id FROM permissions WHERE name = 'view_crisis')),
    
    ('manager', (SELECT id FROM permissions WHERE name = 'view_dashboard')),
    ('manager', (SELECT id FROM permissions WHERE name = 'view_reviews')),
    ('manager', (SELECT id FROM permissions WHERE name = 'respond_reviews')),
    ('manager', (SELECT id FROM permissions WHERE name = 'view_reports')),
    ('manager', (SELECT id FROM permissions WHERE name = 'view_crisis')),
    
    ('staff', (SELECT id FROM permissions WHERE name = 'view_dashboard')),
    ('staff', (SELECT id FROM permissions WHERE name = 'view_reviews'));

-- ==================== HELPER FUNCTIONS ====================

-- Function to calculate review analytics
CREATE OR REPLACE FUNCTION calculate_review_analytics(p_organization_id UUID, p_date DATE)
RETURNS VOID AS $$
DECLARE
    v_branch_id UUID;
BEGIN
    FOR v_branch_id IN SELECT id FROM branches WHERE organization_id = p_organization_id
    LOOP
        INSERT INTO analytics (organization_id, branch_id, date, total_reviews, avg_rating, 
            positive_count, neutral_count, negative_count, responded_count, pending_count, critical_count, avg_response_time_seconds)
        SELECT 
            p_organization_id,
            v_branch_id,
            p_date,
            COUNT(*),
            COALESCE(AVG(rating), 0),
            COUNT(*) FILTER (WHERE sentiment = 'positive'),
            COUNT(*) FILTER (WHERE sentiment = 'neutral'),
            COUNT(*) FILTER (WHERE sentiment = 'negative'),
            COUNT(*) FILTER (WHERE is_responded = TRUE),
            COUNT(*) FILTER (WHERE status = 'pending'),
            COUNT(*) FILTER (WHERE priority = 'critical'),
            COALESCE(AVG(EXTRACT(EPOCH FROM (responded_at - date))), 0)
        FROM reviews
        WHERE organization_id = p_organization_id 
            AND branch_id = v_branch_id
            AND DATE(date) = p_date
        ON CONFLICT (organization_id, branch_id, date) DO UPDATE SET
            total_reviews = EXCLUDED.total_reviews,
            avg_rating = EXCLUDED.avg_rating,
            positive_count = EXCLUDED.positive_count,
            neutral_count = EXCLUDED.neutral_count,
            negative_count = EXCLUDED.negative_count,
            responded_count = EXCLUDED.responded_count,
            pending_count = EXCLUDED.pending_count,
            critical_count = EXCLUDED.critical_count,
            avg_response_time_seconds = EXCLUDED.avg_response_time_seconds,
            updated_at = NOW();
    END LOOP;
END;
$$ LANGUAGE plpgsql;    