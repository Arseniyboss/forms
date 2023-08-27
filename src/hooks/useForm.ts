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
import { Errors, ValidationSchema, Value } from '@validation/types'

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

type Values<T> = {
  [P in keyof T]: Value
}

// export const useForm = <T extends Record<string, Value>>(options: {
// avoid error when passing interface as a generic
export const useForm = <T extends Values<T>>(options: {
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
