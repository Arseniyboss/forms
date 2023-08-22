export type ValidationOptions<
  Values,
  ValueType,
  Value extends keyof Values,
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
