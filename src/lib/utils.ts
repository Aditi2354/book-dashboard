export function classNames(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(' ')
}

export const GENRES = [
  'Technology','Self-help','Fiction','History','Science Fiction','Business','Psychology','Design'
]
export const STATUSES = ['Available', 'Issued'] as const
