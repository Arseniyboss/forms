import { ValidationSchema } from '@hooks/useForm'

type InitialValues = {
  name: string
  age: string
  email: string
  password: string
  confirmPassword: string
  pin: string
  terms: boolean
}

export const validationSchema: ValidationSchema<InitialValues> = {
  name: {
    required: { value: true, message: 'Name is required' },
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long',
    },
    pattern: { value: /^[a-zA-Z ]+$/, message: 'Name is invalid' },
  },
  age: {
    required: { value: true, message: 'Age is required' },
    min: { value: 18, message: 'Age must be at least 18 years old' },
    max: { value: 100, message: 'Age must be not more than 100 years old' },
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
  pin: {
    required: { value: true, message: 'PIN is required' },
    length: { value: 4, message: 'PIN must be 4 characters long' },
  },
  terms: {
    required: { value: true, message: 'Please accept the terms of service' },
  },
}
