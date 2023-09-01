import { ValidationSchema } from '@validation/types'

export type Values = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const validationSchema: ValidationSchema<Values> = {
  name: {
    required: { value: true, message: 'Name is required' },
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long',
    },
    pattern: { value: /^[a-zA-Z ]+$/, message: 'Name is invalid' },
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
    maxLength: {
      value: 20,
      message: 'Password must be no longer than 20 characters long',
    },
  },
  confirmPassword: {
    required: { value: true, message: 'Password is required' },
    match: { ref: 'password', message: 'Passwords do not match' },
  },
}
