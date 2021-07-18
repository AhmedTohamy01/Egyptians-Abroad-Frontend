import React from 'react'
import styled from 'styled-components'

/*---> Component <---*/
export default function PageWrapper ({ children }) {
  return <Wrapper>{children}</Wrapper>
}

/*---> Styles <---*/
export const Wrapper = styled.div`
  /* border: 1px solid yellow; */
  margin: auto;
  background-color: #fafafa;
`
