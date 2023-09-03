import Link from 'next/link'
import { Container } from './styles'

const Home = () => {
  return (
    <Container>
      <Link href='/sample-form'>Sample Form</Link>
      <Link href='/register-form'>Register Form</Link>
      <Link href='/login-form'>Login Form</Link>
      <Link href='/address-form'>Address Form</Link>
    </Container>
  )
}

export default Home
