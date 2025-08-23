export const IMAGES = {
  // Weather
  WEATHER_CLOUDY: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
  WEATHER_SUNNY: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
  WEATHER_RAINY: 'https://cdn-icons-png.flaticon.com/512/3313/3313998.png',
  
  // Avatars
  AVATAR_MALE: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
  AVATAR_LION: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  
  // Health & Medicine
  HEALTH_CHART: 'https://cdn-icons-png.flaticon.com/512/4270/4270302.png',
  PILL_ALLERGY: 'https://cdn-icons-png.flaticon.com/512/811/811640.png',
  PILL_VITAMIN_A: 'https://cdn-icons-png.flaticon.com/512/3457/3457683.png',
  PILL_DANSAM: 'https://cdn-icons-png.flaticon.com/512/3457/3457686.png',
  PILL_SUPPLEMENT: 'https://cdn-icons-png.flaticon.com/512/1247/1247944.png',
  
  // Food
  FOOD_ORANGE: 'https://cdn-icons-png.flaticon.com/512/415/415682.png',
  FOOD_NUTS: 'https://cdn-icons-png.flaticon.com/512/634/634822.png',
  FOOD_BANANA: 'https://cdn-icons-png.flaticon.com/512/590/590685.png',
  
  // Flags
  FLAG_NETHERLANDS: 'https://flagcdn.com/w40/nl.png',
  FLAG_KOREA: 'https://flagcdn.com/w40/kr.png',
  FLAG_USA: 'https://flagcdn.com/w40/us.png',
  FLAG_SPAIN: 'https://flagcdn.com/w40/es.png'
} as const

export type ImageKey = keyof typeof IMAGES
export type ImageValue = typeof IMAGES[ImageKey]

// Image optimization utility
export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  if (url.includes('flaticon.com') && (width || height)) {
    const baseUrl = url.replace('/512/', `/${width || 512}/`)
    return baseUrl
  }
  if (url.includes('flagcdn.com') && width) {
    return url.replace('/w40/', `/w${width}/`)
  }
  return url
}

// Preload critical images
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = url
      })
    })
  )
}