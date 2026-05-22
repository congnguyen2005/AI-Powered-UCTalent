// app/api/branches/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('branches')
      .select('*')
      .eq('organization_id', authUser.organizationId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ branches: data || [] })
  } catch (error) {
    console.error('Error fetching branches:', error)
    return NextResponse.json({ branches: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const body = await request.json()
    const { name, address, phone, email, lat, lng } = body

    if (!name) {
      return NextResponse.json({ error: 'Tên chi nhánh là bắt buộc' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('branches')
      .insert({
        id: uuidv4(),
        organization_id: authUser.organizationId,
        name,
        address,
        phone,
        email,
        lat,
        lng,
        status: 'active',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ branch: data })
  } catch (error) {
    console.error('Error creating branch:', error)
    return NextResponse.json({ error: 'Không thể tạo chi nhánh' }, { status: 500 })
  }
}