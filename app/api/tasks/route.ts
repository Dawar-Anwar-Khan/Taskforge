// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Task from '@/models/taskModel'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  const query = session.role === 'admin'
    ? {}
    : { assignedTo: session.id }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name')
    .sort({ createdAt: -1 })

  return NextResponse.json({ tasks })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { title, description, assignedTo, deadline } = await req.json()
  await connectDB()

  const task = await Task.create({
    title,
    description,
    assignedTo,
    assignedBy: session.id,
    deadline: new Date(deadline),
  })

  return NextResponse.json({ success: true, task })
}