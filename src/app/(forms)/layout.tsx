import { ReactNode } from 'react'
import { FormContainer } from '@styles/form'

type Props = {
  children: ReactNode
}

const FormLayout = async ({ children }: Props) => {
  return <FormContainer>{children}</FormContainer>
}

export default FormLayout
