export type Form = {
  id: number
  href: string
  name: string
  img: string
}

const forms: Form[] = [
  {
    id: 1,
    href: '/sample-form',
    name: 'Sample Form',
    img: '/sample-form.png',
  },
  {
    id: 2,
    href: '/register-form',
    name: 'Register Form',
    img: '/register-form.png',
  },
  {
    id: 3,
    href: '/login-form',
    name: 'Login Form',
    img: '/login-form.png',
  },
  {
    id: 4,
    href: '/address-form',
    name: 'Address Form',
    img: '/address-form.png',
  },
]

export default forms
