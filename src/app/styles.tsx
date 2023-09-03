'use client'

import styled from 'styled-components'

export const Heading = styled.h1`
  color: #555;
  text-align: center;
  margin: 1.5rem 0;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
`
