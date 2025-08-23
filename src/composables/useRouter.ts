import { useRouter as useVueRouter, type Router } from 'vue-router'

export const useNavigation = () => {
  const router = useVueRouter()

  const goBack = () => {
    router.go(-1)
  }

  const goTo = (path: string) => {
    router.push(path)
  }

  const goToHome = () => {
    router.push('/main_home')
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const goToSettings = () => {
    router.push('/settings')
  }

  const goToVoice = () => {
    router.push('/voice')
  }

  const goToCalendar = () => {
    router.push('/calendar')
  }

  const goToSideMenu = () => {
    router.push('/menu')
  }

  const goToHealth = () => {
    router.push('/health')
  }

  const goToNews = () => {
    router.push('/news')
  }

  const goToFinance = () => {
    router.push('/finance')
  }

  const goToShop = () => {
    router.push('/price')
  }

  const goToSelection = () => {
    router.push('/selection')
  }

  const goToPermission = () => {
    router.push('/permission')
  }

  const goToGetUsername = () => {
    router.push('/get_username')
  }

  const goToProfileEdit = () => {
    router.push('/profile-edit')
  }

  const goToDailyReports = () => {
    router.push('/daily-reports')
  }

  const goToIntegrationsManager = () => {
    router.push('/integrations-manager')
  }

  const goToLanguagePicker = () => {
    router.push('/language-picker')
  }

  return {
    goBack,
    goTo,
    goToHome,
    goToLogin,
    goToSettings,
    goToVoice,
    goToCalendar,
    goToSideMenu,
    goToHealth,
    goToNews,
    goToFinance,
    goToShop,
    goToSelection,
    goToPermission,
    goToGetUsername,
    goToProfileEdit,
    goToDailyReports,
    goToIntegrationsManager,
    goToLanguagePicker
  }
}