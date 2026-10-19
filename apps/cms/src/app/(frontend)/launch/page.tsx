import { redirect } from 'next/navigation'

/** Legacy URL — homepage gate owns the pre-launch experience. */
export default function LaunchPageRoute() {
  redirect('/')
}
