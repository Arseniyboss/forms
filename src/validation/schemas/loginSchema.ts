import { ValidationSchema } from '@hooks/useForm'

export type Values = {
  email: string
  password: string
}

export const validationSchema: ValidationSchema<Values> = {
  email: {
    required: { value: true, message: 'Email is required' },
  },
  password: {
    required: { value: true, message: 'Password is required' },
  },
}
