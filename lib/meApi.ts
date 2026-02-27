import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Me {
  id: string
  name: string
  email: string
  role: 'admin' | 'employee'
}

export const meApi = createApi({
  reducerPath: 'meApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getMe: builder.query<Me, void>({
      query: () => '/me',
    }),
  }),
})

export const { useGetMeQuery } = meApi

