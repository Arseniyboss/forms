'use client'

import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.article`
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem darkgrey;
  overflow: hidden;
`

export const FormImage = styled(Image)`
  border-bottom: 1px solid #ddd;
  height: auto;
  width: 100%;
  aspect-ratio: 1.2;
`

export const FormName = styled.p`
  padding: 1rem;
  background: white;
  color: #4e7093;
  text-align: center;
  font-weight: bold;
`
