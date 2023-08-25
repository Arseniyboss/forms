import { StringOptions } from './options/stringOptions'
import { NumberOptions } from './options/numberOptions'
import { BooleanOptions } from './options/booleanOptions'

export type Value = string | number | boolean

export type Errors<T> = Partial<Record<keyof T, string>>

export type ValidationSchema<T> = Partial<FieldValidation<T>>

type FieldValidation<T> = {
  [P in keyof T]: InferRefValue<T, P>
}

type InferRefValue<
  Values,
  Value extends keyof Values
> = keyof Values extends infer RefValue
  ? RefValue extends Exclude<keyof Values, Value>
    ? Partial<ConditionalOptions<Values, Value, RefValue>>
    : never
  : never

type ConditionalOptions<
  Values,
  Value extends keyof Values,
  RefValue extends keyof Values
> = Values[Value] extends string
  ? StringOptions<Values, Value, RefValue>
  : Values[Value] extends number
  ? NumberOptions<Values, Value, RefValue>
  : Values[Value] extends boolean
  ? BooleanOptions
  : never
