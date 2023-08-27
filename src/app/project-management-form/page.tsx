'use client'

import { useForm } from '@hooks/useForm'
import {
  Values,
  validationSchema,
} from '@validation/schemas/projectManagementSchema'
import {
  FormContainer,
  Form,
  FormGroup,
  FormFlexGroup,
  FormInput,
  FormFileInput,
  FormRadioContainer,
  FormButton,
  FormError,
} from '@styles/form'

const ProjectManagementForm = () => {
  const initialValues: Values = {
    name: '',
    startDate: '',
    endDate: '',
    language: '',
    priority: '',
    description: '',
    image: '',
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
        <h1>Project Management</h1>
        <FormGroup>
          <label htmlFor='name'>Project Name</label>
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
        <FormGroup>
          <label>Priority</label>
          <FormRadioContainer>
            <FormFlexGroup>
              <input
                type='radio'
                name='priority'
                id='high'
                value='high'
                onChange={handleChange}
                checked={values.priority === 'high'}
              />
              <label htmlFor='high'>High</label>
            </FormFlexGroup>
            <FormFlexGroup>
              <input
                type='radio'
                name='priority'
                id='medium'
                value='medium'
                onChange={handleChange}
                checked={values.priority === 'medium'}
              />
              <label htmlFor='medium'>Medium</label>
            </FormFlexGroup>
            <FormFlexGroup>
              <input
                type='radio'
                name='priority'
                id='low'
                value='low'
                onChange={handleChange}
                checked={values.priority === 'low'}
              />
              <label htmlFor='low'>Low</label>
            </FormFlexGroup>
          </FormRadioContainer>
          {errors.priority && <FormError>{errors.priority}</FormError>}
        </FormGroup>
        <FormGroup>
          <label>Programming Language</label>
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
          <label htmlFor='description'>Description</label>
          <FormInput
            as='textarea'
            name='description'
            id='description'
            rows={3}
            value={values.description}
            onChange={handleChange}
            $error={errors.description}
          />
          {errors.description && <FormError>{errors.description}</FormError>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='image'>Project Image</label>
          <FormFileInput
            type='file'
            name='image'
            id='image'
            value={values.image}
            onChange={handleChange}
            $error={errors.image}
            accept='image/*'
          />
          {errors.image && <FormError>{errors.image}</FormError>}
        </FormGroup>
        <FormButton>Create</FormButton>
      </Form>
    </FormContainer>
  )
}

export default ProjectManagementForm
