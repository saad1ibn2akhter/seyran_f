import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import IndexPage from './routes/index'
import HelloPage from './routes/hello'
import Chat from './routes/chat'
import Video from './routes/video'

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
const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v',
  component:Video,
})
// const routeTree = rootRoute.addChildren([indexRoute , helloRoute ])
const routeTree = rootRoute.addChildren([indexRoute , helloRoute , chatRoute, videoRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
