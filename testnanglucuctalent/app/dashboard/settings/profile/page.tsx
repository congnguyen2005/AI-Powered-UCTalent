// app/dashboard/settings/profile/page.tsx - Nâng cấp hoàn chỉnh
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
  Lock,
  Shield,
  Calendar,
  Building2,
  Globe,
  Link2,
  Github,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  AlertCircle,
  LogOut,
  Key,
  Smartphone,
  Clock,
  Bell,
  Fingerprint,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  department: string;
  position: string;
  joinDate: string;
  lastLogin: string;
  avatar: string;
  bio: string;
  website: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    facebook: string;
  };
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Đặng Công Nguyên",
  email: "dangcongnguyenst@gmail.com",
  phone: "0901 234 567",
  address: "TP. Hồ Chí Minh, Việt Nam",
  role: "super_admin",
  department: "Ban Giám đốc",
  position: "Technical Director",
  joinDate: "2024-01-15",
  lastLogin: new Date().toISOString(),
  avatar: "ĐN",
  bio: "Chuyên gia về AI và hệ thống quản lý danh tiếng. Đam mê công nghệ và đổi mới sáng tạo.",
  website: "https://congnguyen.dev",
  socialLinks: {
    github: "congnguyen2005",
    twitter: "congnguyen",
    linkedin: "congnguyen",
    facebook: "congnguyen.dev",
  },
  notificationSettings: {
    email: true,
    push: true,
    sms: false,
  },
  twoFactorEnabled: false,
  language: "vi",
  timezone: "Asia/Ho_Chi_Minh",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Đã cập nhật thông tin cá nhân");
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      toast.success("Đổi mật khẩu thành công");
      setShowPasswordModal(false);
      setPasswordData({ current: "", new: "", confirm: "" });
    }, 1000);
  };

  const handleToggle2FA = () => {
    setProfile((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
    toast.success(
      profile.twoFactorEnabled
        ? "Đã tắt xác thực 2 lớp"
        : "Đã bật xác thực 2 lớp",
    );
    setShow2FAModal(false);
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingAvatar(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // In real app, you would upload to server
          toast.success("Cập nhật ảnh đại diện thành công");
        };
        reader.readAsDataURL(file);
        setUploadingAvatar(false);
      }, 1000);
    }
  };

  const getRoleBadge = () => {
    switch (profile.role) {
      case "super_admin":
        return {
          bg: "bg-purple-500/20",
          text: "text-purple-400",
          label: "Super Admin",
        };
      case "admin":
        return { bg: "bg-blue-500/20", text: "text-blue-400", label: "Admin" };
      case "manager":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          label: "Manager",
        };
      default:
        return {
          bg: "bg-slate-500/20",
          text: "text-slate-400",
          label: "Staff",
        };
    }
  };

  const roleBadge = getRoleBadge();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-7 h-7 text-blue-400" />
            Hồ sơ cá nhân
          </h1>
          <p className="text-slate-400 mt-1">
            Quản lý thông tin tài khoản, bảo mật và cài đặt cá nhân
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-medium transition flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Chỉnh sửa hồ sơ
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Lưu thay đổi
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm font-medium flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Hủy
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === "profile" ? "bg-slate-800/50 text-blue-400 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-200"}`}
        >
          <User className="w-4 h-4" /> Thông tin cá nhân
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === "security" ? "bg-slate-800/50 text-blue-400 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Shield className="w-4 h-4" /> Bảo mật
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === "notifications" ? "bg-slate-800/50 text-blue-400 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Bell className="w-4 h-4" /> Thông báo
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-4xl text-white font-bold">
                    {profile.avatar}
                  </span>
                </div>
                <button
                  onClick={handleAvatarUpload}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 p-2 bg-slate-800 rounded-full border border-slate-600 hover:bg-slate-700 transition"
                >
                  {uploadingAvatar ? (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <h2 className="text-xl font-bold text-white mt-4">
                {profile.name}
              </h2>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${roleBadge.bg} ${roleBadge.text} mt-2`}
              >
                <Shield className="w-3 h-3" /> {roleBadge.label}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">{profile.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">
                    Tham gia: {formatDate(profile.joinDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">
                    Đăng nhập lần cuối:{" "}
                    {new Date(profile.lastLogin).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info Card */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" /> Thông tin cá nhân
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Họ và tên
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white py-2">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Chức vụ
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.position}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            position: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white py-2">{profile.position}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Phòng ban
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white py-2">{profile.department}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Số điện thoại
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white py-2">{profile.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.address}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-white py-2">{profile.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Giới thiệu
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editedProfile.bio}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          bio: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-300 py-2">{profile.bio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.website}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          website: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-blue-400 py-2">{profile.website}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" /> Mạng xã hội
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Github className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.socialLinks.github}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            socialLinks: {
                              ...editedProfile.socialLinks,
                              github: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      />
                    ) : (
                      <span className="text-slate-300">
                        @{profile.socialLinks.github}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Twitter className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.socialLinks.twitter}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            socialLinks: {
                              ...editedProfile.socialLinks,
                              twitter: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      />
                    ) : (
                      <span className="text-slate-300">
                        @{profile.socialLinks.twitter}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Linkedin className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.socialLinks.linkedin}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            socialLinks: {
                              ...editedProfile.socialLinks,
                              linkedin: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      />
                    ) : (
                      <span className="text-slate-300">
                        @{profile.socialLinks.linkedin}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Facebook className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.socialLinks.facebook}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            socialLinks: {
                              ...editedProfile.socialLinks,
                              facebook: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      />
                    ) : (
                      <span className="text-slate-300">
                        @{profile.socialLinks.facebook}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Change Password Card */}
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" /> Đổi mật khẩu
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Đảm bảo tài khoản của bạn được bảo vệ bằng mật khẩu mạnh
            </p>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg font-medium transition flex items-center justify-center gap-2 border border-yellow-500/30"
            >
              <Key className="w-4 h-4" /> Đổi mật khẩu
            </button>
          </div>

          {/* Two-Factor Authentication Card */}
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-purple-400" /> Xác thực 2
                  lớp
                </h3>
                <p className="text-sm text-slate-400">
                  Tăng cường bảo mật cho tài khoản
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${profile.twoFactorEnabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {profile.twoFactorEnabled ? "Đã bật" : "Đã tắt"}
              </div>
            </div>
            <button
              onClick={() => setShow2FAModal(true)}
              className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${profile.twoFactorEnabled ? "bg-red-600/20 text-red-400 border border-red-500/30" : "bg-purple-600/20 text-purple-400 border border-purple-500/30"}`}
            >
              {profile.twoFactorEnabled ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {profile.twoFactorEnabled
                ? "Tắt xác thực 2 lớp"
                : "Bật xác thực 2 lớp"}
            </button>
          </div>

          {/* Session Management */}
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-400" /> Thiết bị đăng
              nhập
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-white text-sm">Chrome trên Windows</p>
                    <p className="text-xs text-slate-500">
                      TP. Hồ Chí Minh • Đang hoạt động
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-400">Thiết bị này</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-white text-sm">Safari trên iPhone</p>
                    <p className="text-xs text-slate-500">
                      Hà Nội • 2 ngày trước
                    </p>
                  </div>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300">
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" /> Lịch sử đăng nhập
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[
                {
                  date: "20/01/2025 10:30",
                  device: "Chrome - Windows",
                  location: "TP.HCM",
                  ip: "192.168.1.1",
                },
                {
                  date: "19/01/2025 15:45",
                  device: "Safari - iPhone",
                  location: "Hà Nội",
                  ip: "192.168.1.2",
                },
                {
                  date: "18/01/2025 09:20",
                  device: "Firefox - Mac",
                  location: "Đà Nẵng",
                  ip: "192.168.1.3",
                },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="p-2 text-xs text-slate-400 border-b border-slate-700 last:border-0"
                >
                  <div className="flex justify-between">
                    <span>{log.date}</span>
                    <span>{log.device}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>{log.location}</span>
                    <span>{log.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" /> Kênh nhận thông báo
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-white">Email notifications</p>
                  <p className="text-xs text-slate-400">
                    Nhận thông báo qua email
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notificationSettings.email}
                    onChange={() =>
                      setProfile((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          email: !prev.notificationSettings.email,
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-white">Push notifications</p>
                  <p className="text-xs text-slate-400">
                    Nhận thông báo trên trình duyệt
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notificationSettings.push}
                    onChange={() =>
                      setProfile((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          push: !prev.notificationSettings.push,
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-white">SMS notifications</p>
                  <p className="text-xs text-slate-400">
                    Nhận thông báo qua tin nhắn
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notificationSettings.sms}
                    onChange={() =>
                      setProfile((prev) => ({
                        ...prev,
                        notificationSettings: {
                          ...prev.notificationSettings,
                          sms: !prev.notificationSettings.sms,
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" /> Ngôn ngữ & Múi giờ
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Ngôn ngữ
                </label>
                <select
                  value={profile.language}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Múi giờ
                </label>
                <select
                  value={profile.timezone}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      timezone: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Asia/Ho_Chi_Minh">
                    Asia/Ho Chi Minh (GMT+7)
                  </option>
                  <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                  <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Đổi mật khẩu</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <XCircle className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.current}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          current: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pr-10 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <button
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.new}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          new: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pr-10 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-medium"
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-3 bg-slate-700 rounded-lg text-white font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2FA Modal */}
      <AnimatePresence>
        {show2FAModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  {profile.twoFactorEnabled ? "Tắt" : "Bật"} xác thực 2 lớp
                </h3>
                <button
                  onClick={() => setShow2FAModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <XCircle className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
                  <Fingerprint className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-300">
                    {profile.twoFactorEnabled
                      ? "Bạn có chắc chắn muốn tắt xác thực 2 lớp?"
                      : "Bật xác thực 2 lớp giúp bảo vệ tài khoản của bạn tốt hơn"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleToggle2FA}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
                  >
                    {profile.twoFactorEnabled ? "Tắt" : "Bật"}
                  </button>
                  <button
                    onClick={() => setShow2FAModal(false)}
                    className="flex-1 py-3 bg-slate-700 rounded-lg text-white font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Import missing icon
import { Edit3 } from "lucide-react";
  