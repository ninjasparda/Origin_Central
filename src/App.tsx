import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { PropertyCarousel } from './components/house/PropertyCarousel'
import { ActiveModal } from './components/modals/ActiveModal'
import { Alert, Box, Columns, Column, Text, Heading } from '@origin-digital/ods-core'
import { useDashboardStore } from './store/useDashboardStore'

function PropertyAlert() {
  const { activePropertyId, properties } = useDashboardStore()
  const activeProperty = properties.find((p) => p.id === activePropertyId)

  if (!activeProperty) return null

  // Different alert content based on property
  const alertContent = {
    'property-2': {
      tone: 'positive' as const,
      title: 'Make the most of the beautiful weather',
      message: "Today's sun is worth $10 in potential savings. All you're missing is a solar setup.",
      pictogram: 'https://res.cloudinary.com/originenergy/image/upload/v1754868133/pictograms/pictogram_solar.svg',
    },
    'property-1': {
      tone: 'info' as const,
      title: 'Wake up to half price internet',
      message: 'Stream, scroll and switch off without the stress. Fast, reliable internet at 50% off.',
      pictogram: 'https://res.cloudinary.com/originenergy/image/upload/v1763703847/pictograms/pictogram_internet-wifi.svg',
    },
  }

  const content = alertContent[activeProperty.id as keyof typeof alertContent] || {
    tone: 'info' as const,
    title: activeProperty.name,
    message: `Viewing ${activeProperty.name}`,
    pictogram: '',
  }

  return (
    <Box marginTop="small" paddingX="medium" paddingY="small">
        <Alert icon={false} tone={content.tone}>
          <Columns alignY="center">
              <Column>
                <Heading variant="h4" component="h3">{content.title}</Heading>
                <Text>{content.message}</Text>
              </Column>
            <Column width="content">
              {content.pictogram && (
                <img src={content.pictogram} alt="" width="48" height="48" />
              )}
            </Column>
          </Columns>
        </Alert>
    </Box>
  )
}

function App() {
  return (
    <AppShell>
      <Header />
      <PropertyCarousel />
      <PropertyAlert />
      <ActiveModal />
    </AppShell>
  )
}

export default App
