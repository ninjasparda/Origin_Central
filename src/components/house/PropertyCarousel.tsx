import { Box, Card, Text, Stack } from '@origin-digital/ods-core'
import { Carousel, CarouselSlide } from '@origin-digital/ods-carousel'
import { Plus } from 'lucide-react'
import { HouseScene } from './HouseScene'
import { useDashboardStore } from '../../store/useDashboardStore'

export function PropertyCarousel() {
  const { properties, setActiveProperty, addProperty } = useDashboardStore()

  const handleAddProperty = () => {
    const newId = `property-${Date.now()}`
    addProperty({
      id: newId,
      name: `Property ${properties.length + 1}`,
      type: 'mass-market',
      connectedProductIds: ['energy-plan'],
    })
  }

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    const index = swiper.activeIndex
    if (index < properties.length) {
      setActiveProperty(properties[index].id)
    }
  }

  const allSlides = [
    ...properties.map((property) => (
      <CarouselSlide key={property.id}>
        <Box paddingX="small" paddingY="medium">
          {/* Property Label */}
          <Stack space="small">
            <Box display="flex" alignItems="center" justifyContent="center" gap="small">
              <Text variant="subtitle-small" tone="neutralDark" align="center">
                {property.name}
              </Text>
              <Box
                paddingX="xsmall"
                paddingY="xxsmall"
                style={{
                  backgroundColor: property.type === 'ces' ? '#E8F5E9' : '#E3F2FD',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    color: property.type === 'ces' ? '#2E7D32' : '#1565C0',
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  {property.type === 'ces' ? 'CES' : 'Mass Market'}
                </span>
              </Box>
            </Box>

            {/* House Scene */}
            <HouseScene propertyId={property.id} />
          </Stack>
        </Box>
      </CarouselSlide>
    )),
    <CarouselSlide key="add-property">
      <Box paddingX="small" paddingY="medium" height="full">
        <Card padding="large" height="full">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="full"
            gap="medium"
            style={{ minHeight: '300px' }}
          >
            <button
              onClick={handleAddProperty}
              className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Add new property"
            >
              <Plus size={32} className="text-gray-600" />
            </button>
            <Stack space="xsmall" alignX="center">
              <Text variant="subtitle" tone="neutralDark" align="center">
                Add a Property
              </Text>
              <Text variant="body-small" tone="neutralLight" align="center">
                Track energy usage for another home
              </Text>
            </Stack>
          </Box>
        </Card>
      </Box>
    </CarouselSlide>,
  ]

  return (
    <Box padding="none">
      <div className="property-carousel-container">
        <Carousel
          id="property-carousel"
          pagination="bullets"
          swiperProps={{
            'aria-label': 'Your properties',
            onSlideChange: handleSlideChange,
            slidesPerView: 1,
            spaceBetween: 16,
            centeredSlides: true,
          }}
        >
          {allSlides}
        </Carousel>
      </div>
    </Box>
  )
}


