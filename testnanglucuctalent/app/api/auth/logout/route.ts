import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/app/lib/logger'

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token) {
      try {
        const jwt = require('jsonwebtoken')
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        if (decoded) {
          logEvent('Authenticated request', { ip: clientIp, token })
          return NextResponse.json({ message: 'Success' })
        }
      } catch (error) {
        logEvent('JWT verification failed', { ip: clientIp, error })
      }
    } else {
      logEvent('No token provided', { ip: clientIp })
    }
  } catch (error) {
    logEvent('Error in POST request', { error })
  }

  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}