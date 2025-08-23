import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface WeatherInfo {
  temperature: number
  location: string
  description: string
  icon: string
  variance: number
}

export interface HealthData {
  diseases: Array<{
    name: string
    color: string
  }>
  medications: Array<{
    name: string
    icon: string
    time?: string
  }>
  recommendations: Array<{
    name: string
    icon: string
    amount: string
  }>
}

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  const weatherInfo = ref<WeatherInfo>({
    temperature: 27,
    location: '서울특별시, 중구 을지로 1가',
    description: '구름 많음',
    icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
    variance: -0.4
  })

  const healthData = ref<HealthData>({
    diseases: [
      { name: '간과류 알레르기', color: 'orange' },
      { name: '당뇨', color: 'red' },
      { name: '고혈압', color: 'green' }
    ],
    medications: [
      { name: '알레지 약', icon: 'https://cdn-icons-png.flaticon.com/512/811/811640.png' },
      { name: '비타민 A', icon: 'https://cdn-icons-png.flaticon.com/512/3457/3457683.png' },
      { name: '당삼', icon: 'https://cdn-icons-png.flaticon.com/512/3457/3457686.png' },
      { name: '영양제', icon: 'https://cdn-icons-png.flaticon.com/512/1247/1247944.png' }
    ],
    recommendations: [
      { name: '오렌지', icon: 'https://cdn-icons-png.flaticon.com/512/415/415682.png', amount: '1개' },
      { name: '견과류(소금 무첨가)', icon: 'https://cdn-icons-png.flaticon.com/512/634/634822.png', amount: '20g' },
      { name: '바나나', icon: 'https://cdn-icons-png.flaticon.com/512/590/590685.png', amount: '2송이' }
    ]
  })

  const stockInfo = ref({
    name: 'SK하이닉스',
    price: 263000,
    symbol: '*'
  })

  const currentDate = ref({
    day: 19,
    month: 8,
    year: 2024,
    holiday: '💗 휴가 3일',
    schedule: '일정 없음'
  })

  // Actions
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const updateWeather = (weather: Partial<WeatherInfo>) => {
    weatherInfo.value = { ...weatherInfo.value, ...weather }
  }

  const updateHealthData = (health: Partial<HealthData>) => {
    healthData.value = { ...healthData.value, ...health }
  }

  const updateStockInfo = (stock: Partial<typeof stockInfo.value>) => {
    stockInfo.value = { ...stockInfo.value, ...stock }
  }

  const updateCurrentDate = (date: Partial<typeof currentDate.value>) => {
    currentDate.value = { ...currentDate.value, ...date }
  }

  return {
    // State
    isLoading,
    error,
    weatherInfo,
    healthData,
    stockInfo,
    currentDate,
    
    // Actions
    setLoading,
    setError,
    updateWeather,
    updateHealthData,
    updateStockInfo,
    updateCurrentDate
  }
})