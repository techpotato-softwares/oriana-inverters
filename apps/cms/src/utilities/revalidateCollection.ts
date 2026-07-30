type RevalidateOpts = {
  paths?: string[]
  tags?: string[]
  context?: { disableRevalidate?: boolean }
}

export async function revalidateCollection({ paths = [], tags = [], context }: RevalidateOpts) {
  if (context?.disableRevalidate) return
  const { revalidatePath, revalidateTag } = await import('next/cache')
  for (const p of paths) revalidatePath(p)
  for (const t of tags) revalidateTag(t)
}
