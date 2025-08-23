export const ROUTES = {
  HOME: '/',
  START: '/start',
  LOGIN: '/login',
  SELECTION: '/selection',
  PERMISSION: '/permission',
  GET_USERNAME: '/get_username',
  MAIN_HOME: '/main_home',
  SETTINGS: '/settings',
  VOICE: '/voice',
  CALENDAR: '/calendar',
  MENU: '/menu',
  HEALTH: '/health',
  NEWS: '/news',
  FINANCE: '/finance',
  PRICE: '/price',
  PROFILE_EDIT: '/profile-edit',
  DAILY_REPORTS: '/daily-reports',
  INTEGRATIONS_MANAGER: '/integrations-manager',
  LANGUAGE_PICKER: '/language-picker'
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]