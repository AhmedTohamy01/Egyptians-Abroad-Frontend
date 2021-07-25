import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

/*---> Component <---*/
export default function CommentsCard({ comments }) {
  return (
    <CommentsCardWrapper>
      <CommentsTitle>Comments</CommentsTitle>
      {comments.map((item) => (
        <CommentWrapper key={item._id}>
          <ImageWrapper>
            <GenericImage src='/images/avatar.png' />
          </ImageWrapper>
          <CommentTextWrapper>{item.body}</CommentTextWrapper>
        </CommentWrapper>
      ))}
    </CommentsCardWrapper>
  )
}


/*---> Styles <---*/

export const CommentsCardWrapper = styled.div`
  /* border: 1px solid green; */
  width: 100%;
  background-color: white;
  box-shadow: ${(props) =>
    props.isDragging
      ? '16px 16px 40px 0 rgba(0, 0, 0, 0.2)'
      : '0 10px 16px 0 rgba(0, 0, 0, 0.05)'};
  border-radius: 18px;
  margin-bottom: 20px;
  padding: 20px;
  width: 700px;
  margin-bottom: 40px;
  cursor: pointer;

  @media (max-width: 500px) {
    width: 90%;
  }
`

export const CommentsTitle = styled.div`
  /* border: 1px solid green; */
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  /* margin-bottom: 20px; */
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const CommentWrapper = styled.div`
  /* border: 1px solid green; */
  border-bottom: 1px solid gray;
  padding: 20px 0px;
  display: flex;
`

export const ImageWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  /* align-items: center; */
`

export const GenericImage = styled.img`
  /* border: 1px solid yellow; */
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 12px;
`

export const CommentTextWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  word-break: break-word;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`

