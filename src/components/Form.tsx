'use client'

import Link from 'next/link'
import { Form as Props } from '@data/forms'
import { Container, FormName, FormImage } from './styles'

const Form = ({ img, name, href }: Props) => {
  return (
    <Link href={href}>
      <Container>
        <FormImage src={img} alt='' width={250} height={250} priority />
        <FormName>{name}</FormName>
      </Container>
    </Link>
  )
}

export default Form
