import { ValidationOptions, ValidationSchema, Errors } from '@hooks/useForm'

type Input<T> = [keyof T, ValidationOptions<T, keyof T>]

export const validate = <T extends Record<keyof T, string>>(
  values: T,
  validationSchema: ValidationSchema<T>
): Errors<T> => {
  const errors: Errors<T> = {}

  const printErrors = (field: Input<T>) => {
    const property = field[0]
    const value = field[1]

    const { required, pattern, match, isValid } = value

    if (
      !values[property] &&
      required?.value &&
      typeof required.value === 'boolean' &&
      typeof required.message === 'string'
    ) {
      errors[property] = required.message
    }

    if (
      values[property] &&
      pattern?.value instanceof RegExp &&
      !pattern.value.test(values[property]) &&
      typeof pattern.message === 'string'
    ) {
      errors[property] = pattern.message
    }

    if (
      values[property] &&
      isValid?.value instanceof Function &&
      !isValid.value(values[property]) &&
      typeof isValid.message === 'string'
    ) {
      errors[property] = isValid.message
    }

    if (
      values[property] &&
      typeof match?.ref === 'string' &&
      values[match.ref] !== values[property] &&
      typeof match.message === 'string'
    ) {
      errors[property] = match.message
    }
  }

  Object.entries(validationSchema).forEach((input) => {
    printErrors(input as Input<T>)
  })

  return errors
}
