// app/api/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    let query = supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (unreadOnly) {
      query = query.eq('read', false)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ notifications: data || [] })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ notifications: [] })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId, markAllAsRead } = body

    if (markAllAsRead) {
      const { error } = await supabaseAdmin
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('user_id', authUser.id)
        .eq('read', false)

      if (error) throw error
    } else if (notificationId) {
      const { error } = await supabaseAdmin
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId)
        .eq('user_id', authUser.id)

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({ error: 'Không thể cập nhật thông báo' }, { status: 500 })
  }
}