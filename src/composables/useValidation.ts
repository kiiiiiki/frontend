import { ref } from 'vue'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  message?: string
}

export interface ValidationError {
  field: string
  message: string
}

export const useValidation = () => {
  const errors = ref<ValidationError[]>([])

  const validateField = (value: string, fieldName: string, rules: ValidationRule): boolean => {
    const fieldErrors: string[] = []

    if (rules.required && (!value || value.trim() === '')) {
      fieldErrors.push(rules.message || `${fieldName}은(는) 필수입니다.`)
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      fieldErrors.push(rules.message || `${fieldName}은(는) 최소 ${rules.minLength}자 이상이어야 합니다.`)
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      fieldErrors.push(rules.message || `${fieldName}은(는) 최대 ${rules.maxLength}자까지 입력 가능합니다.`)
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      fieldErrors.push(rules.message || `${fieldName}의 형식이 올바르지 않습니다.`)
    }

    // Clear previous errors for this field
    errors.value = errors.value.filter(error => error.field !== fieldName)

    // Add new errors
    fieldErrors.forEach(message => {
      errors.value.push({ field: fieldName, message })
    })

    return fieldErrors.length === 0
  }

  const validateForm = (fields: { [key: string]: { value: string; rules: ValidationRule } }): boolean => {
    errors.value = []
    let isValid = true

    Object.keys(fields).forEach(fieldName => {
      const { value, rules } = fields[fieldName]
      if (!validateField(value, fieldName, rules)) {
        isValid = false
      }
    })

    return isValid
  }

  const getErrorsForField = (fieldName: string): string[] => {
    return errors.value
      .filter(error => error.field === fieldName)
      .map(error => error.message)
  }

  const hasErrors = (): boolean => {
    return errors.value.length > 0
  }

  const clearErrors = (fieldName?: string) => {
    if (fieldName) {
      errors.value = errors.value.filter(error => error.field !== fieldName)
    } else {
      errors.value = []
    }
  }

  return {
    errors,
    validateField,
    validateForm,
    getErrorsForField,
    hasErrors,
    clearErrors
  }
}