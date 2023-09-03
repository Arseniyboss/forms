import { ValidationSchema } from '@hooks/useForm'

type Option = 'Option 1' | 'Option 2' | 'Option 3' | ''

export type Values = {
  textInput: string
  select: Option
  textarea: string
  fileInput: string
  radioInput: Option
  otherInputField: string
}

const required = {
  value: true,
  message: 'Value is required',
}

export const validationSchema: ValidationSchema<Values> = {
  textInput: { required },
  select: { required },
  textarea: { required },
  fileInput: { required },
  radioInput: { required },
}
