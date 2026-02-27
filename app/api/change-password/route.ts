import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/models/userModel'
import { getSession, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  await connectDB()

  // If this isn't the forced first-time password set flow, require current password.
  if (!session.mustChangePassword) {
    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 })
    }

    const user = await User.findById(session.id).select('+password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const ok = await bcrypt.compare(currentPassword, user.password)
    if (!ok) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }
  }

  const hashed = await bcrypt.hash(newPassword, 12)
  await User.findByIdAndUpdate(session.id, {
    password: hashed,
    mustChangePassword: false,
  })

  // Issue a fresh token with mustChangePassword: false
  const newToken = signToken({
    id: session.id,
    role: session.role,
    name: session.name,
    mustChangePassword: false,
  })

  const res = NextResponse.json({ success: true })

  // Overwrite the old cookie with the new token
  res.cookies.set('token', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return res
}