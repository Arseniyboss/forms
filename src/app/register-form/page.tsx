'use client'

import { useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/registerSchema'
import {
  FormContainer,
  Form,
  FormGroup,
  FormInput,
  FormButton,
  FormError,
} from '@styles/form'

const RegisterForm = () => {
  const initialValues: Values = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            $error={errors.name}
          />
          {errors.name && <FormError>{errors.name}</FormError>}
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
        <FormButton>Sign Up</FormButton>
      </Form>
    </FormContainer>
  )
}

export default RegisterForm
