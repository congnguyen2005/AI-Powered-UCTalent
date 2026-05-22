// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ChatWidget from "./components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "AI ORM Platform - Hệ thống quản trị danh tiếng thông minh",
  description: "Nền tảng quản lý đánh giá khách hàng bằng AI",
  keywords: "ORM, AI, reputation management, review management",
  authors: [{ name: "AI ORM Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased dark"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-black"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#fff",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
                <ChatWidget /> {/* Thêm chat widget */}

      </body>
    </html>
  );
}
