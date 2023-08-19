import styled from 'styled-components'

type Props = {
  $error?: string
}

export const FormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 400px;
  max-width: 80vw;
  padding: 2rem;
  color: #555;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem darkgrey;

  select,
  button,
  input[type='radio'],
  input[type='checkbox'],
  input[type='file'],
  input[type='date'],
  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  select {
    appearance: none;
  }

  textarea {
    font-family: inherit;
    resize: none;
  }
`

export const FormFlexGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const FormGroup = styled(FormFlexGroup)`
  flex-direction: column;
`

export const FormInput = styled.input<Props>`
  outline: none;
  border-radius: 0.25rem;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: ${({ $error }) => ($error ? '2px solid red' : '1px solid #ddd')};

  &:focus {
    border: ${({ $error }) => !$error && '1px solid #aaa'};
  }
`

export const FormFileInput = styled(FormInput)`
  position: relative;

  &::file-selector-button {
    display: none;
  }

  &::before {
    content: 'Browse';
    background: #eee;
    border-left: 1px solid #ddd;
    padding: inherit;
    position: absolute;
    right: 0;
    top: 0;
  }

  &:focus::before {
    border-left: 1px solid #aaa;
  }
`

export const FormRadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FormButton = styled.button`
  border: none;
  background: hsl(193, 82%, 31%);
  color: white;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 2rem;
  letter-spacing: 1px;
  align-self: flex-start;
  cursor: pointer;

  &:hover {
    background-color: hsl(193, 82%, 21%);
  }

  &:disabled {
    pointer-events: none;
    cursor: initial;
    opacity: 0.5;
  }
`

export const FormError = styled.p`
  color: red;
  font-weight: bold;
`
