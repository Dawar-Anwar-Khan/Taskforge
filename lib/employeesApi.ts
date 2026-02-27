import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Employee {
  _id: string
  name: string
  email: string
  createdAt: string
}

interface EmployeesResponse {
  employees: Employee[]
}

interface CreateEmployeeBody {
  name: string
  email: string
}

interface CreateEmployeeResponse {
  success: boolean
  employee: { id: string; name: string; email: string }
  temporaryPassword: string
}

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesResponse, void>({
      query: () => '/employees',
      providesTags: (result) =>
        result?.employees
          ? [
              ...result.employees.map((e) => ({
                type: 'Employees' as const,
                id: e._id,
              })),
              { type: 'Employees' as const, id: 'LIST' },
            ]
          : [{ type: 'Employees' as const, id: 'LIST' }],
    }),
    createEmployee: builder.mutation<CreateEmployeeResponse, CreateEmployeeBody>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
  }),
})

export const { useGetEmployeesQuery, useCreateEmployeeMutation } = employeesApi

