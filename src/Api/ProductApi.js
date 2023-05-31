import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getSingleProducts: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategoriesName: builder.query({
      query: () => 'products/categories',
    }),
    getCategoryData: builder.query({
      query: (name) => `products/category/${name}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetSingleProductsQuery, useGetCategoriesNameQuery, useGetCategoryDataQuery } = productApi