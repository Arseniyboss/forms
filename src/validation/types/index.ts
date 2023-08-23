import { StringOptions } from './options/stringOptions'
import { NumberOptions } from './options/numberOptions'
import { BooleanOptions } from './options/booleanOptions'

export type Value = string | number | boolean

export type Errors<T> = Partial<Record<keyof T, string>>

export type ValidationSchema<T> = Partial<FieldValidation<T>>

type FieldValidation<T> = {
  [P in keyof T]: InferRefValue<T, T[P], P>
}

type InferRefValue<
  Values,
  ValueType,
  Value extends keyof Values
> = keyof Values extends infer RefValue
  ? RefValue extends Exclude<keyof Values, Value>
    ? Partial<ConditionalOptions<Values, ValueType, Value, RefValue>>
    : never
  : never

type ConditionalOptions<
  Values,
  ValueType,
  Value extends keyof Values,
  RefValue extends keyof Values
> = ValueType extends string
  ? StringOptions<Values, ValueType, Value, RefValue>
  : ValueType extends number
  ? NumberOptions<Values, ValueType, Value, RefValue>
  : ValueType extends boolean
  ? BooleanOptions
  : never
