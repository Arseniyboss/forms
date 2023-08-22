'use client'

import { useForm } from '@hooks/useForm'
import { validationSchema } from '@validation/schemas/registerSchema'
import {
  FormContainer,
  Form,
  FormGroup,
  FormFlexGroup,
  FormInput,
  FormButton,
  FormError,
} from '@styles/form'

const RegisterForm = () => {
  const initialValues = {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    pin: '',
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
        <h1>Sign Up</h1>
        <FormGroup>
          <label htmlFor='name'>Name</label>
          <FormInput
            type='name'
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            $error={errors.name}
          />
          {errors.name && <FormError>{errors.name}</FormError>}
        </FormGroup>
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
        <FormGroup>
          <FormFlexGroup>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              onChange={handleChange}
              checked={values.terms}
            />
            <label htmlFor='terms'>I accept the terms of service</label>
          </FormFlexGroup>
          {errors.terms && <FormError>{errors.terms}</FormError>}
        </FormGroup>
        <FormButton>Sign Up</FormButton>
      </Form>
    </FormContainer>
  )
}

export default RegisterForm
