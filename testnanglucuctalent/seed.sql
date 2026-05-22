-- seed.sql - Dữ liệu mẫu cho database
-- Chạy sau khi tạo bảng

-- Insert demo organization
INSERT INTO organizations (id, name, tax_code, email, phone, address, subscription_plan, subscription_status)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'AI ORM Demo Company',
  '0123456789',
  'contact@ormai.com',
  '1900 1234',
  'Tầng 10, Tòa nhà ABC, TP. Hồ Chí Minh',
  'professional',
  'active'
);

-- Insert demo branches
INSERT INTO branches (id, organization_id, name, address, phone, email, status)
VALUES 
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Chi nhánh Hồ Chí Minh', '123 Nguyễn Huệ, Quận 1, TP.HCM', '028 1234 5678', 'hcm@ormai.com', 'active'),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Chi nhánh Hà Nội', '456 Lê Lợi, Hoàn Kiếm, Hà Nội', '024 1234 5678', 'hanoi@ormai.com', 'active'),
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Chi nhánh Đà Nẵng', '789 Bạch Đằng, Sơn Trà, Đà Nẵng', '0236 1234 5678', 'danang@ormai.com', 'active');

-- Insert demo user (password: admin123)
INSERT INTO users (id, organization_id, email, password_hash, name, role, status)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'admin@demo.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrF6a8.KqDqj5JzPkUqjh9sLqBqK5K', -- bcrypt hash of 'admin123'
  'Admin Demo',
  'super_admin',
  'active'
);

-- Insert demo reviews
INSERT INTO reviews (id, organization_id, branch_id, author_name, rating, text, date, sentiment, sentiment_score, priority, status)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Nguyễn Văn A', 5, 'Dịch vụ tuyệt vời! Nhân viên thân thiện, phòng ốc sạch sẽ. Tôi sẽ quay lại.', NOW() - INTERVAL '2 days', 'positive', 0.92, 'low', 'pending'),
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Trần Thị B', 2, 'Phòng hơi cũ, điều hòa không mát. Phục vụ bữa sáng chậm. Cần cải thiện nhiều.', NOW() - INTERVAL '5 days', 'negative', 0.25, 'high', 'pending'),
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Lê Văn C', 4, 'Vị trí đẹp, view biển tuyệt vời. Giá hơi cao so với chất lượng.', NOW() - INTERVAL '7 days', 'neutral', 0.55, 'medium', 'pending'),
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Phạm Thị D', 1, 'THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ. Tôi sẽ đăng bài này lên các hội nhóm để mọi người biết!', NOW() - INTERVAL '1 day', 'negative', 0.05, 'critical', 'pending'),
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Hoàng Văn E', 5, 'Ăn sáng ngon, buffet đa dạng. Nhân viên lễ tân rất nhiệt tình hỗ trợ.', NOW() - INTERVAL '3 days', 'positive', 0.88, 'low', 'approved');

-- Insert default brand voice settings
INSERT INTO brand_voice_settings (id, organization_id, tone, formality, response_length, keywords, greeting, closing)
VALUES (
  uuid_generate_v4(),
  '11111111-1111-1111-1111-111111111111',
  'professional',
  'formal',
  'medium',
  ARRAY['chất lượng', 'uy tín', 'chuyên nghiệp', 'dịch vụ'],
  'Kính gửi quý khách',
  'Trân trọng cảm ơn'
);