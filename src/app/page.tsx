import { Heading, Container } from './styles'
import Form from '@components/Form'
import forms from '@data/forms'

const Home = () => {
  return (
    <>
      <Heading>Forms</Heading>
      <Container>
        {forms.map((form) => (
          <Form key={form.id} {...form} />
        ))}
      </Container>
    </>
  )
}

export default Home
