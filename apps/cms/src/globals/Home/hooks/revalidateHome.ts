import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHome: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc
  void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
    revalidateTag('home')
    revalidateTag('home-hero')
    revalidatePath('/')
  })
  return doc
}
