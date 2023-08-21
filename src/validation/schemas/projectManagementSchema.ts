import { ValidationSchema } from '@hooks/useForm'
import { validateStartDate, validateEndDate } from '@utils'

type Priority = 'high' | 'medium' | 'low' | ''

export type InitialValues = {
  name: string
  startDate: string
  endDate: string
  language: string
  priority: Priority
  description: string
  image: string
}

export const validationSchema: ValidationSchema<InitialValues> = {
  name: {
    required: { value: true, message: 'Project name is required' },
    pattern: { value: /^[a-zA-Z ]+$/, message: 'Name is invalid' },
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long',
    },
  },
  startDate: {
    required: { value: true, message: 'Start Date is required' },
    pattern: {
      value: (startDate) => validateStartDate(startDate),
      message: 'Start Date must be equal to or greater than the current date',
    },
  },
  endDate: {
    required: { value: true, message: 'End Date is required' },
    ref: {
      value: 'startDate',
      pattern: (endDate, startDate) => validateEndDate(endDate, startDate),
      message: 'End Date must be greater than the Start Date',
    },
  },
  language: {
    required: { value: true, message: 'Programming language is required' },
  },
  priority: {
    required: { value: true, message: 'Priority is required' },
  },
  description: {
    required: { value: true, message: 'Description is required' },
  },
  image: {
    required: { value: true, message: 'Image is required' },
  },
}
