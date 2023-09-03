'use client'

import { useForm } from '@hooks/useForm'
import { Values, validationSchema } from '@validation/schemas/loginSchema'
import { Form, FormGroup, FormInput, FormButton, FormError } from '@styles/form'

const RegisterForm = () => {
  const initialValues: Values = {
    email: '',
    password: '',
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
    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <FormButton>Sign In</FormButton>
    </Form>
  )
}

export default RegisterForm
