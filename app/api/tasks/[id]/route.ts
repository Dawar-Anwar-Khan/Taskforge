// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Task from '@/models/taskModel'
import { getSession } from '@/lib/auth'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = await req.json()
  const validStatuses = ['Pending', 'In Progress', 'Completed']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  await connectDB()
  const { id } = await params
  const task = await Task.findById(id)
  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

  // Employee can only update their own tasks
  if (session.role === 'employee' && task.assignedTo.toString() !== session.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  task.status = status
  await task.save()

  return NextResponse.json({ success: true, task })
}