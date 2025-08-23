import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  fullName: string
  username: string
  phone: string
  email: string
  avatar: string
}

export interface UserSettings {
  selectedLanguage: string
  permissions: {
    healthInfo: boolean
    financialInfo: boolean
    calendarLocation: boolean
    socialAccounts: boolean
  }
  notifications: {
    security: boolean
    sharing: boolean
    alerts: boolean
  }
}

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref<UserInfo>({
    fullName: '',
    username: '',
    phone: '+91 23 456 7890',
    email: 'randommail@mail.me',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
  })

  const userSettings = ref<UserSettings>({
    selectedLanguage: 'nl',
    permissions: {
      healthInfo: true,
      financialInfo: true,
      calendarLocation: true,
      socialAccounts: true
    },
    notifications: {
      security: true,
      sharing: true,
      alerts: false
    }
  })

  const isLoggedIn = ref(false)

  // Getters
  const displayName = computed(() => {
    return userInfo.value.fullName || userInfo.value.username || 'User'
  })

  const isProfileComplete = computed(() => {
    return !!(userInfo.value.fullName && userInfo.value.username)
  })

  // Actions
  const updateUserInfo = (info: Partial<UserInfo>) => {
    userInfo.value = { ...userInfo.value, ...info }
  }

  const updateSettings = (settings: Partial<UserSettings>) => {
    userSettings.value = { ...userSettings.value, ...settings }
  }

  const updatePermissions = (permissions: Partial<UserSettings['permissions']>) => {
    userSettings.value.permissions = { ...userSettings.value.permissions, ...permissions }
  }

  const updateNotifications = (notifications: Partial<UserSettings['notifications']>) => {
    userSettings.value.notifications = { ...userSettings.value.notifications, ...notifications }
  }

  const login = (username: string, password: string) => {
    // TODO: Implement actual authentication logic
    console.log('Login attempt:', username)
    isLoggedIn.value = true
    return Promise.resolve(true)
  }

  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = {
      fullName: '',
      username: '',
      phone: '',
      email: '',
      avatar: ''
    }
  }

  const setLanguage = (language: string) => {
    userSettings.value.selectedLanguage = language
  }

  return {
    // State
    userInfo,
    userSettings,
    isLoggedIn,
    
    // Getters
    displayName,
    isProfileComplete,
    
    // Actions
    updateUserInfo,
    updateSettings,
    updatePermissions,
    updateNotifications,
    login,
    logout,
    setLanguage
  }
})