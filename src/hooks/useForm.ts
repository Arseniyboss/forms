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

type InferRefValue<T> = keyof T extends infer K
  ? K extends keyof T
    ? FieldValidation<T, K>
    : never
  : never

export type ValidationOptions<
  Values,
  Value,
  ValueType,
  RefValue extends keyof Values
> = {
  required?: {
    value: boolean
    message: string
  }
  pattern?: {
    value: RegExp | ((inputValue: ValueType) => boolean)
    message: string
  }
  ref?: {
    value: RefValue
    pattern: (
      currentInputValue: ValueType,
      refInputValue: Values[RefValue]
    ) => boolean
    message: string
  }
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  length?: {
    value: number
    message: string
  }
  match?: {
    ref: Exclude<keyof Values, Value>
    message: string
  }
}

type FieldValidation<T, K extends keyof T> = {
  [P in keyof T]: ValidationOptions<T, P, T[P], K>
}
export type ValidationSchema<T> = Partial<InferRefValue<T>>

export type Errors<T> = Partial<Record<keyof T, string>>

type SetValues<T> = Dispatch<SetStateAction<T>>

type ChangeEventType = ChangeEvent<
  HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
>
type FormEventType = FormEvent<HTMLFormElement>

type ReturnValues<T> = {
  values: T
  setValues: SetValues<T>
  errors: Errors<T>
  handleChange: (e: ChangeEventType) => void
  handleSubmit: (e: FormEventType) => void
}

export type Value = string | number | boolean

export const useForm = <T extends Record<string, Value>>(options: {
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

  const setValue = (e: ChangeEventType) => {
    const { name, type, checked, value, valueAsNumber } = e.target
    switch (type) {
      case 'number':
        setValues({ ...values, [name]: valueAsNumber || value })
        break
      case 'checkbox':
        setValues({ ...values, [name]: checked })
        break
      case 'select-one':
        setValues({ ...values, [name]: Number(value) || value })
        break
      default:
        setValues({ ...values, [name]: value })
        break
    }
  }

  const handleChange = (e: ChangeEventType) => {
    setValue(e)
    setIsChanging(true)
    setIsSubmitting(false)
  }

  const handleSubmit = (e: FormEventType) => {
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
