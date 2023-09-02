import { ValidationSchema } from '@hooks/useForm'

export type Values = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const validationSchema: ValidationSchema<Values> = {
  name: {
    required: { value: true, message: 'Name is required' },
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
    isValid: {
      value: (password) => password.length >= 8,
      message: 'Password must be at least 8 characters long',
    },
  },
  confirmPassword: {
    required: { value: true, message: 'Password is required' },
    match: { ref: 'password', message: 'Passwords do not match' },
  },
}
