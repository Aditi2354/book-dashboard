import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateBook, useGetBook, useUpdateBook } from '@/hooks/useBooks'
import { toast } from 'sonner'
import { GENRES, STATUSES } from '@/lib/utils'
import type { Book } from '@/types'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  genre: z.string().min(2, 'Genre is required'),
  year: z.coerce.number().int().min(0, 'Year is required'),
  status: z.enum(['Available', 'Issued'])
})

export function BookForm({ defaultValues, onSubmit }:{ defaultValues?: Partial<Book>, onSubmit: (values: Book)=>void }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Book>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as Book ?? {
      title: '', author: '', genre: '', year: new Date().getFullYear(), status: 'Available'
    }
  })

  useEffect(()=>{
    if (defaultValues) reset(defaultValues as Book)
  }, [defaultValues])

  return (
    <form
  onSubmit={handleSubmit((v)=>onSubmit(v))}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  <div className="field">
    <label className="label-premium">Title</label>
    <input className="input input-xl" placeholder="e.g. Atomic Habits" {...register('title')} />
    {errors.title && <p className="text-sm text-red-600 mt-0.5">{errors.title.message}</p>}
  </div>

  <div className="field">
    <label className="label-premium">Author</label>
    <input className="input input-xl" placeholder="e.g. James Clear" {...register('author')} />
    {errors.author && <p className="text-sm text-red-600 mt-0.5">{errors.author.message}</p>}
  </div>

  <div className="field">
    <label className="label-premium">Genre</label>
    <select className="select select-xl" {...register('genre')}>
      <option value="">Select genre</option>
      {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
    {errors.genre && <p className="text-sm text-red-600 mt-0.5">{errors.genre.message}</p>}
    <p className="helper">Pick the closest category your readers expect.</p>
  </div>

  <div className="field">
    <label className="label-premium">Published Year</label>
    <input className="input input-xl" type="number" placeholder="e.g. 2018" {...register('year')} />
    {errors.year && <p className="text-sm text-red-600 mt-0.5">{errors.year.message}</p>}
  </div>

  <div className="field">
    <label className="label-premium">Status</label>
    <select className="select select-xl" {...register('status')}>
      {Array.from(STATUSES).map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  </div>

  {/* Save bar */}
  <div className="md:col-span-2 flex justify-end pt-2">
    <button type="submit" className="btn btn-gradient btn-lg">
      Save
    </button>
  </div>
</form>

  )
}

export function BookFormPage({ mode }:{ mode: 'create' | 'edit' }){
  const nav = useNavigate()
  const params = useParams()
  const id = params.id
  const { data } = useGetBook(id)
  const createMutation = useCreateBook()
  const updateMutation = useUpdateBook()

  const handleSubmit = async (values: Book) => {
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(values)
        toast.success('Book added')
      } else if (id) {
        await updateMutation.mutateAsync({ id, book: values })
        toast.success('Book updated')
      }
      nav('/')
    } catch (e:any) {
      toast.error(e?.message ?? 'Something went wrong')
    }
  }

  return (
  <div className="card-premium p-6 sm:p-8 space-y-6">
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
        {mode === 'create' ? 'Add New Book' : 'Edit Book'}
      </h2>
      <p className="mt-1 text-gray-600 text-sm">
        Fill the details below to keep your library fresh and organized.
      </p>
    </div>

    <div className="hr-soft" />

    <BookForm defaultValues={mode==='edit' ? data : undefined} onSubmit={handleSubmit} />
  </div>
)

}
