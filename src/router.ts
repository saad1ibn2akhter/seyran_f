import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import IndexPage from './routes/index'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
