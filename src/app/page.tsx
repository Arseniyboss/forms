import Link from 'next/link'
import { Container } from './styles'

const Home = () => {
  return (
    <Container>
      <Link href='/register-form'>Register Form</Link>
      <Link href='/project-management-form'>Project Management Form</Link>
    </Container>
  )
}

export default Home
