import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import IndexPage from './routes/index'
import HelloPage from './routes/hello'
import Chat from './routes/chat'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const helloRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hello',
  component: HelloPage,
})

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component:Chat,
})
const routeTree = rootRoute.addChildren([indexRoute , helloRoute , chatRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
