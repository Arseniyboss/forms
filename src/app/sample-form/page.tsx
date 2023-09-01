'use client'

import { useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/validationSchema'
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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 0,
    pin: '',
    startDate: '',
    endDate: '',
    language: '',
    image: '',
    description: '',
    priority: '',
    terms: false,
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
            <label htmlFor='username'>Username</label>
            <FormInput
              type='text'
              name='username'
              id='username'
              value={values.username}
              onChange={handleChange}
              $error={errors.username}
            />
            {errors.username && <FormError>{errors.username}</FormError>}
          </FormGroup>
          <FormGroup>
            <label htmlFor='email'>Email</label>
            <FormInput
              type='email'
              name='email'
              id='email'
              value={values.email}
              onChange={handleChange}
              $error={errors.email}
            />
            {errors.email && <FormError>{errors.email}</FormError>}
          </FormGroup>
        </FormFlexGroup>
        <FormFlexGroup>
          <FormGroup>
            <label htmlFor='password'>Password</label>
            <FormInput
              type='password'
              name='password'
              id='password'
              value={values.password}
              onChange={handleChange}
              $error={errors.password}
              autoComplete='on'
            />
            {errors.password && <FormError>{errors.password}</FormError>}
          </FormGroup>
          <FormGroup>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <FormInput
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
              $error={errors.confirmPassword}
              autoComplete='on'
            />
            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword}</FormError>
            )}
          </FormGroup>
        </FormFlexGroup>
        <FormFlexGroup>
          <FormGroup>
            <label htmlFor='age'>Age</label>
            <FormInput
              type='number'
              name='age'
              id='age'
              value={values.age || ''}
              onChange={handleChange}
              $error={errors.age}
            />
            {errors.age && <FormError>{errors.age}</FormError>}
          </FormGroup>
          <FormGroup>
            <label htmlFor='pin'>PIN</label>
            <FormInput
              type='number'
              name='pin'
              id='pin'
              value={values.pin}
              onChange={handleChange}
              $error={errors.pin}
            />
            {errors.pin && <FormError>{errors.pin}</FormError>}
          </FormGroup>
        </FormFlexGroup>
        <FormFlexGroup>
          <FormGroup>
            <label htmlFor='startDate'>Start Date</label>
            <FormInput
              type='date'
              name='startDate'
              id='startDate'
              value={values.startDate}
              onChange={handleChange}
              $error={errors.startDate}
            />
            {errors.startDate && <FormError>{errors.startDate}</FormError>}
          </FormGroup>
          <FormGroup>
            <label htmlFor='endDate'>End Date</label>
            <FormInput
              type='date'
              name='endDate'
              id='endDate'
              value={values.endDate}
              onChange={handleChange}
              $error={errors.endDate}
            />
            {errors.endDate && <FormError>{errors.endDate}</FormError>}
          </FormGroup>
        </FormFlexGroup>
        <FormFlexGroup>
          <FormGroup>
            <label>Language</label>
            <FormInput
              as='select'
              name='language'
              id='language'
              value={values.language}
              onChange={handleChange}
              $error={errors.language}
            >
              <option value=''>Select</option>
              <option value='javascript'>JavaScript</option>
              <option value='java'>Java</option>
              <option value='python'>Python</option>
            </FormInput>
            {errors.language && <FormError>{errors.language}</FormError>}
          </FormGroup>
          <FormGroup>
            <label htmlFor='image'>Image</label>
            <FormFileInput
              type='file'
              name='image'
              id='image'
              value={values.image}
              onChange={handleChange}
              accept='image/*'
            />
            {errors.image && <FormError>{errors.image}</FormError>}
          </FormGroup>
        </FormFlexGroup>
        <FormGroup>
          <label htmlFor='description'>Description</label>
          <FormInput
            as='textarea'
            name='description'
            id='description'
            rows={5}
            value={values.description}
            onChange={handleChange}
            $error={errors.description}
          />
          {errors.description && <FormError>{errors.description}</FormError>}
        </FormGroup>
        <FormGroup>
          <label>Priority</label>
          <FormRadioContainer>
            <FlexGroup>
              <input
                type='radio'
                name='priority'
                id='high'
                value='high'
                onChange={handleChange}
                checked={values.priority === 'high'}
              />
              <label htmlFor='high'>High</label>
            </FlexGroup>
            <FlexGroup>
              <input
                type='radio'
                name='priority'
                id='medium'
                value='medium'
                onChange={handleChange}
                checked={values.priority === 'medium'}
              />
              <label htmlFor='medium'>Medium</label>
            </FlexGroup>
            <FlexGroup>
              <input
                type='radio'
                name='priority'
                id='low'
                value='low'
                onChange={handleChange}
                checked={values.priority === 'low'}
              />
              <label htmlFor='low'>Low</label>
            </FlexGroup>
          </FormRadioContainer>
          {errors.priority && <FormError>{errors.priority}</FormError>}
        </FormGroup>
        <FormGroup>
          <FlexGroup>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              onChange={handleChange}
              checked={values.terms}
            />
            <label htmlFor='terms'>I accept the terms of service</label>
          </FlexGroup>
          {errors.terms && <FormError>{errors.terms}</FormError>}
        </FormGroup>
        <FormButton>Submit</FormButton>
      </Form>
    </FormContainer>
  )
}

export default SampleForm
