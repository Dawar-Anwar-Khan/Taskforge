import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

export interface Task {
  _id: string
  title: string
  description: string
  status: TaskStatus
  deadline: string
  assignedTo: { _id: string; name: string; email: string }
  assignedBy: { name: string }
}

interface TasksResponse {
  tasks: Task[]
}

interface CreateTaskBody {
  title: string
  description: string
  assignedTo: string
  deadline: string
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result?.tasks
          ? [
              ...result.tasks.map((t) => ({ type: 'Tasks' as const, id: t._id })),
              { type: 'Tasks' as const, id: 'LIST' },
            ]
          : [{ type: 'Tasks' as const, id: 'LIST' }],
    }),
    createTask: builder.mutation<{ success: boolean; task: Task }, CreateTaskBody>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTaskStatus: builder.mutation<
      { success: boolean; task: Task },
      { id: string; status: TaskStatus }
    >({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      // Optimistic UI update for status changes
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const task = draft.tasks?.find((t) => t._id === id)
            if (task) {
              task.status = status
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Tasks', id },
        { type: 'Tasks', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = tasksApi

