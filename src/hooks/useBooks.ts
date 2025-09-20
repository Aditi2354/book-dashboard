import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Book } from '@/types'

const KEY = ['books']

export type ListParams = {
  q?: string
  genre?: string
  status?: string
  page?: number
  limit?: number
}

export function useBooks(params: ListParams) {
  return useQuery({
    queryKey: [...KEY, params],
    queryFn: async () => {
      // Try server-side pagination if supported (json-server style)
      const query: Record<string, any> = {}
      if (params.q) query.q = params.q
      if (params.genre) query.genre = params.genre
      if (params.status) query.status = params.status
      if (params.page) query._page = params.page
      if (params.limit) query._limit = params.limit

      try {
        const { data, headers } = await api.get('/books', { params: query })
        const total = parseInt(headers['x-total-count'] ?? `${data.length ?? 0}`)
        return { items: data as Book[], total }
      } catch {
        // Fallback: fetch all then paginate client-side
        const { data } = await api.get('/books')
        let items = data as Book[]
        if (params.q) {
          const v = params.q.toLowerCase()
          items = items.filter(b => b.title.toLowerCase().includes(v) || b.author.toLowerCase().includes(v))
        }
        if (params.genre) items = items.filter(b => b.genre === params.genre)
        if (params.status) items = items.filter(b => b.status === params.status)
        const total = items.length
        const start = ((params.page ?? 1) - 1) * (params.limit ?? 10)
        const end = start + (params.limit ?? 10)
        return { items: items.slice(start, end), total }
      }
    }
  })
}

export function useCreateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (book: Book) => {
      const { data } = await api.post('/books', book)
      return data as Book
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY })
  })
}

export function useUpdateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, book }: { id: string | number, book: Book }) => {
      const { data } = await api.put(`/books/${id}`, book)
      return data as Book
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY })
  })
}

export function useDeleteBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string | number) => {
      await api.delete(`/books/${id}`)
      return true
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY })
  })
}

export function useGetBook(id?: string) {
  return useQuery({
    queryKey: ['book', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/books/${id}`)
      return data as Book
    }
  })
}
