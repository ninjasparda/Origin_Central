import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { PropertyCarousel } from './components/house/PropertyCarousel'
import { ActiveModal } from './components/modals/ActiveModal'

function App() {
  return (
    <AppShell>
      <Header />
      <PropertyCarousel />
      <ActiveModal />
    </AppShell>
  )
}

export default App
