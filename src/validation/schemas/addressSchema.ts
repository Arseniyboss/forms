import { ValidationSchema } from '@validation/types'

export type Values = {
  street: string
  country: string
  city: string
  postalCode: string
}

export const validationSchema: ValidationSchema<Values> = {
  street: {
    required: { value: true, message: 'Street is required' },
    pattern: {
      value: /^[a-zA-Z0-9-äöüÄÖÜß/., ]+$/,
      message: 'Street is invalid',
    },
  },
  country: {
    required: { value: true, message: 'Country is required' },
    pattern: { value: /^[a-zA-Z- ]+$/, message: 'Country is invalid' },
  },
  city: {
    required: { value: true, message: 'City is required' },
    pattern: { value: /^[a-zA-Z- ]+$/, message: 'City is invalid' },
  },
  postalCode: {
    required: { value: true, message: 'Postal code is required' },
    pattern: { value: /^[a-zA-Z0-9 ]+$/, message: 'Postal code is invalid' },
  },
}
