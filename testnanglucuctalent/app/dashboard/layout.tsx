// app/dashboard/layout.tsx
import MainLayout from '@/app/components/dashboard/MainLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}