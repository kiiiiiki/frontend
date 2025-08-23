import { createI18n } from 'vue-i18n'

// Import language files
import ko from './locales/ko.json'
import en from './locales/en.json'
import nl from './locales/nl.json'
import es from './locales/es.json'

export const SUPPORTED_LOCALES = {
  ko: 'Korean',
  en: 'English', 
  nl: 'Nederlands',
  es: 'Español'
} as const

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES

const messages = {
  ko,
  en,
  nl,
  es
}

// Get locale from localStorage or default to Korean
const getInitialLocale = (): SupportedLocale => {
  const stored = localStorage.getItem('app-language')
  if (stored && stored in SUPPORTED_LOCALES) {
    return stored as SupportedLocale
  }
  return 'ko'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'ko',
  messages,
  globalInjection: true
})

export default i18n

// Helper function to change locale
export const setLocale = (locale: SupportedLocale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('app-language', locale)
  document.documentElement.lang = locale
}

// Helper function to get current locale
export const getCurrentLocale = (): SupportedLocale => {
  return i18n.global.locale.value as SupportedLocale
}