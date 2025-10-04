import { redirect } from "next/navigation"

export default function PropertyTypePage({
  params,
}: {
  params: { type: string }
}) {
  // Redirect to properties page with type filter
  redirect(`/properties?type=${params.type}`)
}
