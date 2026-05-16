import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import IndexPage from './routes/index'
import HelloPage from './routes/hello'
import Chat from './routes/chat'
import Video from './routes/video'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SignOutComponent from './pages/SignOutComponent'
import Home from './components/landing/home'
import App2 from './components/landing/Hero'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
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
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component:LoginPage,
})
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component:RegisterPage,
})

const signOutRoute = createRoute({
  getParentRoute : () => rootRoute,
  path:'/signout',
  component:SignOutComponent,
})


const routeTree = rootRoute.addChildren([indexRoute , helloRoute , chatRoute, videoRoute ,loginRoute ,registerRoute,signOutRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
