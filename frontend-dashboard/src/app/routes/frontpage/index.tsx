import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/frontpage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/frontpage/"!</div>
}
