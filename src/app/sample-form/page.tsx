'use client'

import { useState, useEffect } from 'react'
import { ValidationOptions, useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/sampleSchema'
import {
  Form,
  FlexGroup,
  FormFlexGroup,
  FormGroup,
  FormInput,
  FormFileInput,
  FormRadioContainer,
  FormButton,
  FormError,
} from '@styles/form'
import { validate } from '@validation/validate'

type DynamicInput = {
  id: number
  name: `dynamicInput-${number}`
  label: string
  validationOptions: Partial<ValidationOptions<Values, keyof Values>>
}

const SampleForm = () => {
  const initialValues: Values = {
    textInput: '',
    select: '',
    textarea: '',
    fileInput: '',
    radioInput: '',
    otherInputField: '',
  }

  const onSubmit = () => {
    alert('Success!')
    setValues(initialValues)
  }

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema)
  const [dynamicInputs, setDynamicInputs] = useState<DynamicInput[]>([])

  const validationOptions = {
    required: { value: true, message: 'Dynamic Input is required' },
  }

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    setErrors,
    isSubmitting,
    setIsSubmitting,
  } = useForm({
    initialValues,
    onSubmit,
    validationSchema: dynamicSchema,
  })

  const addDynamicInput = () => {
    const id = dynamicInputs.length + 1
    const name = `dynamicInput-${id}` as const
    const label = 'Dynamic Input'
    setIsSubmitting(false)
    setValues({ ...values, [`dynamicInput-${id}`]: '' })
    setDynamicInputs([...dynamicInputs, { id, name, label, validationOptions }])
  }

  const removeDynamicInput = (id: number) => {
    setIsSubmitting(false)
    setDynamicInputs(dynamicInputs.filter((input) => input.id !== id))
    setValues((prevValues) => {
      const values = { ...prevValues }
      delete values[`dynamicInput-${id}` as keyof Values]
      return values
    })
  }

  useEffect(() => {
    if (isSubmitting) {
      setErrors(validate(values, dynamicSchema))
    }
  }, [values, dynamicSchema, isSubmitting, setErrors])

  useEffect(() => {
    if (values.select === 'Option 1') {
      setDynamicSchema({
        ...validationSchema,
        otherInputField: {
          required: { value: true, message: 'Required' },
        },
      })
    } else {
      setDynamicSchema(validationSchema)
    }
  }, [values])

  useEffect(() => {
    dynamicInputs.forEach((input) => {
      const { name, validationOptions } = input
      setDynamicSchema((dynamicSchema) => {
        return { ...dynamicSchema, [name]: validationOptions }
      })
    })
  }, [values, dynamicInputs])

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sample Form</h1>
      <FormFlexGroup>
        <FormGroup>
          <label htmlFor='textInput'>Text Input</label>
          <FormInput
            type='text'
            name='textInput'
            id='textInput'
            value={values.textInput}
            onChange={handleChange}
            $error={errors.textInput}
          />
          {errors.textInput && <FormError>{errors.textInput}</FormError>}
        </FormGroup>
        <FormGroup>
          <label>Select</label>
          <FormInput
            as='select'
            name='select'
            id='select'
            value={values.select}
            onChange={handleChange}
            $error={errors.select}
          >
            <option value=''>Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </FormInput>
          {errors.select && <FormError>{errors.select}</FormError>}
        </FormGroup>
      </FormFlexGroup>
      {/* otherInputField */}
      {values.select === 'Option 1' && (
        <FormGroup>
          <label htmlFor='otherInputField'>Another Input Field</label>
          <FormInput
            type='text'
            name='otherInputField'
            id='otherInputField'
            value={values.otherInputField}
            onChange={handleChange}
            $error={errors.otherInputField}
          />
          {errors.otherInputField && (
            <FormError>{errors.otherInputField}</FormError>
          )}
        </FormGroup>
      )}
      {/* dynamicInputs */}
      {dynamicInputs.map(({ id, name, label }) => (
        <FormGroup key={id}>
          <label htmlFor={name}>{label}</label>
          <FormInput
            type='text'
            name={name}
            id={name}
            value={values[name as keyof Values]}
            onChange={handleChange}
            $error={errors[name as keyof Values]}
          />
          {errors[name as keyof Values] && (
            <FormError>{errors[name as keyof Values]}</FormError>
          )}
          <button type='button' onClick={(e) => removeDynamicInput(id)}>
            -
          </button>
        </FormGroup>
      ))}
      <button type='button' onClick={addDynamicInput}>
        +
      </button>
      <FormGroup>
        <label htmlFor='textarea'>Textarea</label>
        <FormInput
          as='textarea'
          name='textarea'
          id='textarea'
          rows={3}
          value={values.textarea}
          onChange={handleChange}
          $error={errors.textarea}
        />
        {errors.textarea && <FormError>{errors.textarea}</FormError>}
      </FormGroup>
      <FormGroup>
        <label htmlFor='fileInput'>File Input</label>
        <FormFileInput
          type='file'
          name='fileInput'
          id='fileInput'
          value={values.fileInput}
          onChange={handleChange}
        />
        {errors.fileInput && <FormError>{errors.fileInput}</FormError>}
      </FormGroup>
      <FormGroup>
        <label>Radio Input</label>
        <FormRadioContainer>
          <FlexGroup>
            <input
              type='radio'
              name='radioInput'
              id='Option 1'
              value='Option 1'
              onChange={handleChange}
              checked={values.radioInput === 'Option 1'}
            />
            <label htmlFor='Option 1'>Option 1</label>
          </FlexGroup>
          <FlexGroup>
            <input
              type='radio'
              name='radioInput'
              id='Option 2'
              value='Option 2'
              onChange={handleChange}
              checked={values.radioInput === 'Option 2'}
            />
            <label htmlFor='Option 2'>Option 2</label>
          </FlexGroup>
          <FlexGroup>
            <input
              type='radio'
              name='radioInput'
              id='Option 3'
              value='Option 3'
              onChange={handleChange}
              checked={values.radioInput === 'Option 3'}
            />
            <label htmlFor='Option 3'>Option 3</label>
          </FlexGroup>
        </FormRadioContainer>
        {errors.radioInput && <FormError>{errors.radioInput}</FormError>}
      </FormGroup>
      <FormButton>Submit</FormButton>
    </Form>
  )
}

export default SampleForm
