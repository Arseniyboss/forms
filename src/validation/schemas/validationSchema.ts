import { ValidationSchema } from '@validation/types'
import { validateStartDate, validateEndDate } from '@utils'

type Language = 'javascript' | 'java' | 'python' | ''
type Priority = 'high' | 'medium' | 'low' | ''

export type Values = {
  username: string
  age: number
  email: string
  password: string
  confirmPassword: string
  pin: string
  startDate: string
  endDate: string
  language: Language
  image: string
  description: string
  priority: Priority
  terms: boolean
}

export const validationSchema: ValidationSchema<Values> = {
  username: {
    required: { value: true, message: 'Username is required' },
  },
  email: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      message: 'Email is invalid',
    },
  },
  password: {
    required: { value: true, message: 'Password is required' },
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
  },
  confirmPassword: {
    required: { value: true, message: 'Password is required' },
    match: { ref: 'password', message: 'Passwords do not match' },
  },
  age: {
    required: { value: true, message: 'Age is required' },
    min: { value: 18, message: 'Age must be at least 18 years old' },
    max: { value: 100, message: 'Age must be under 100 years old' },
  },
  pin: {
    required: { value: true, message: 'PIN is required' },
    length: { value: 4, message: 'PIN must be 4 characters long' },
  },
  startDate: {
    required: { value: true, message: 'Start date is required' },
    pattern: {
      value: (startDate) => validateStartDate(startDate),
      message: 'Start date can not be in the past',
    },
  },
  endDate: {
    required: { value: true, message: 'End date is required' },
    ref: {
      value: 'startDate',
      pattern: (endDate, startDate) => validateEndDate(endDate, startDate),
      message: 'End date must be greater than start date',
    },
  },
  language: {
    required: { value: true, message: 'Language is required' },
  },
  image: {
    required: { value: true, message: 'Image is required' },
  },
  description: {
    required: { value: true, message: 'Description is required' },
    maxLength: {
      value: 50,
      message: 'Description must be under 50 characters',
    },
  },
  priority: {
    required: { value: true, message: 'Priority is required' },
  },
  terms: {
    required: { value: true, message: 'Please accept the terms of service' },
  },
}
