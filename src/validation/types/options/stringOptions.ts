export type StringOptions<
  Values,
  Value extends keyof Values,
  RefValue extends keyof Values
> = {
  required: {
    value: boolean
    message: string
  }
  pattern: {
    value: RegExp | ((inputValue: Values[Value]) => boolean)
    message: string
  }
  ref: {
    value: RefValue
    pattern: (
      currentInputValue: Values[Value],
      refInputValue: Values[RefValue]
    ) => boolean
    message: string
  }
  minLength: {
    value: number
    message: string
  }
  maxLength: {
    value: number
    message: string
  }
  length: {
    value: number
    message: string
  }
  match: {
    ref: Exclude<keyof Values, Value>
    message: string
  }
}
