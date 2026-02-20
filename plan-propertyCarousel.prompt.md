## Plan: Build Property Carousel with ODS Carousel

Create a swipeable carousel of HouseSVG components allowing users to view different properties (mass market, CES) and add new properties on the last slide, using the ODS Carousel library.

### Steps

1. **Install `@origin-digital/ods-carousel`** - Add the carousel package dependency to [package.json](/Users/kevin.peng/Dev/Origin_Central/package.json) and run `npm install`

2. **Create Property type and data** - Add a new `Property` interface to [types/index.ts](/Users/kevin.peng/Dev/Origin_Central/src/types/index.ts) with fields like `id`, `name`, `type` (mass-market/CES), and `products`. Create a new [data/properties.ts](/Users/kevin.peng/Dev/Origin_Central/src/data/properties.ts) file with initial property definitions

3. **Extend the Zustand store** - Update [useDashboardStore.ts](/Users/kevin.peng/Dev/Origin_Central/src/store/useDashboardStore.ts) to manage multiple properties with `activePropertyId`, `properties` array, `setActiveProperty()`, and `addProperty()` actions

4. **Create PropertyCarousel component** - Build a new [components/house/PropertyCarousel.tsx](/Users/kevin.peng/Dev/Origin_Central/src/components/house/PropertyCarousel.tsx) using `Carousel` and `CarouselSlide` from ODS, rendering `HouseScene` for each property, plus an "Add Property" card on the last slide

5. **Update HouseScene to accept property prop** - Modify [HouseScene.tsx](/Users/kevin.peng/Dev/Origin_Central/src/components/house/HouseScene.tsx) to accept a `propertyId` prop and filter products based on the active property

6. **Integrate carousel into App** - Replace `<HouseScene />` with `<PropertyCarousel />` in [App.tsx](/Users/kevin.peng/Dev/Origin_Central/src/App.tsx)

### Further Considerations

1. **Property-specific products** - Should each property have its own independent set of connected products, or share the same product states? Recommend: independent per property
2. **Add Property flow** - What should happen when user taps "Add Property"? Options: Open a modal form / Navigate to a new page / Show inline form
3. **Property labels** - Should the carousel show property names/labels above each house? Recommend: Yes, with property type badge (e.g., "Mass Market", "CES")

