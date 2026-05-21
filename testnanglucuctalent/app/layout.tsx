// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export const metadata: Metadata = {
  title: "AI ORM Platform - Hệ thống quản trị danh tiếng thông minh",
  description: "Nền tảng quản lý đánh giá khách hàng bằng AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}