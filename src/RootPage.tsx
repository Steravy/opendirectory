import { Outlet } from 'react-router-dom'
import { useAuth } from 'wasp/client/auth'
import { MotionConfig } from 'motion/react'
import { MotionProvider } from './motion/motion-provider'
import { ThemeProvider } from './root-components/theme-provider'
import { Footer } from './root-components/footer'
import { Nav } from './root-components/nav'
import { ScrollToTop } from './root-components/scroll-to-top'
import { TransitionPlayground } from './root-components/transition-playground'
import { transitions } from './motion/transitionPresets'
import './Root.css'
import '@fontsource-variable/inter'
import { useShouldShowNavbar } from './hooks/use-should-show-navbar'
import { Toaster } from './client/components/ui/sonner'

export default function Root() {
  const { data: user, isLoading } = useAuth()

  const shouldRender = useShouldShowNavbar()

  return (
    <MotionConfig reducedMotion='user' transition={transitions.snappy}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <MotionProvider>
          <div className='bg-background text-foreground'>
            {
              shouldRender && (
                <header className='border-b'>
                  <Nav user={user} userLoading={isLoading} />
                </header>
              )
            }
            <main>
              <Outlet />
            </main>
            <Toaster />
            <ScrollToTop />
            {
              shouldRender && (
                <footer className='relative z-50 border-t border-input bg-background'>
                  <div className='relative z-50 mx-auto max-w-7xl'>
                    <Footer />
                  </div>
                </footer>
              )
            }
            <TransitionPlayground />
          </div>
        </MotionProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
