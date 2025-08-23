export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{2,3})(\d{2,4})(\d{4})/, '$1 $2 $3')
}

export const formatEmail = (email: string): string => {
  if (!email.includes('@')) return email
  const [user, domain] = email.split('@')
  if (user.length > 3) {
    const masked = user.substring(0, 3) + '*'.repeat(user.length - 3)
    return `${masked}@${domain}`
  }
  return email
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

export const formatCurrency = (amount: number, currency = 'KRW'): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (date: Date | string, format = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}