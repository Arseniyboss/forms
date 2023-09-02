import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { validate } from '@validation/validate'

export type ValidationOptions<T, P> = {
  required: {
    value: boolean
    message: string
  }
  pattern: {
    value: RegExp
    message: string
  }
  isValid: {
    value: (inputValue: string) => boolean
    message: string
  }
  match: {
    ref: Exclude<keyof T, P>
    message: string
  }
}

export type FieldValidation<T> = {
  [P in keyof T]: Partial<ValidationOptions<T, P>>
}

export type ValidationSchema<T> = Partial<FieldValidation<T>>

type SetValues<T> = Dispatch<SetStateAction<T>>

export type Errors<T> = Partial<Record<keyof T, string>>

type HTMLChangeElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

type ReturnValues<T> = {
  values: T
  setValues: SetValues<T>
  errors: Errors<T>
  handleChange: (e: ChangeEvent<HTMLChangeElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const useForm = <T extends Record<string, string>>(options: {
  initialValues: T
  onSubmit: () => void
  validationSchema?: ValidationSchema<T>
}): ReturnValues<T> => {
  const { initialValues, onSubmit, validationSchema } = options

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [isChanging, setIsChanging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateOnSubmit = () => {
    if (validationSchema && (!isSubmitted || !isSubmitting)) {
      setErrors(validate(values, validationSchema))
      setIsChanging(false)
      setIsSubmitted(true)
    }
  }

  const validateOnChange = useCallback(() => {
    if (validationSchema && isSubmitted && isChanging) {
      setErrors(validate(values, validationSchema))
      setIsChanging(false)
    }
  }, [validationSchema, values, isSubmitted, isChanging])

  const handleChange = (e: ChangeEvent<HTMLChangeElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setIsChanging(true)
    setIsSubmitting(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    validateOnSubmit()
  }

  useEffect(() => {
    validateOnChange()
  }, [validateOnChange])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit()
      setIsSubmitting(false)
      setIsSubmitted(false)
    }
  }, [errors, isSubmitting, onSubmit])

  return { values, setValues, errors, handleChange, handleSubmit }
}
