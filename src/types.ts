export type BookStatus = 'Available' | 'Issued'

export type Book = {
  id?: number | string
  title: string
  author: string
  genre: string
  year: number
  status: BookStatus
}
