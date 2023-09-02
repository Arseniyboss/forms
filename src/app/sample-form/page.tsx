'use client'

import { useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/sampleSchema'
import {
  FormContainer,
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

const SampleForm = () => {
  const initialValues: Values = {
    textInput: '',
    select: '',
    textarea: '',
    fileInput: '',
    radioInput: '',
  }

  const onSubmit = () => {
    alert('Success!')
    setValues(initialValues)
  }

  const { values, errors, setValues, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <FormContainer>
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
    </FormContainer>
  )
}

export default SampleForm
