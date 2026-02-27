// app/api/employees/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/models/userModel'
import { getSession } from '@/lib/auth'

// Generate a random temp password
function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!'
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { name, email } = await req.json()
  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 })

  const tempPassword = generateTempPassword()
  const hashed = await bcrypt.hash(tempPassword, 12)

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: 'employee',
    mustChangePassword: true,
  })

  // Return temp password ONCE — admin must share it with employee
  return NextResponse.json({
    success: true,
    employee: { id: user._id, name: user.name, email: user.email },
    temporaryPassword: tempPassword,   // Show in modal, never stored in plaintext again
  })
}

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  await connectDB()
  const employees = await User.find({ role: 'employee' }).select('-password')
  return NextResponse.json({ employees })
}