import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import axiosAPI from '../../api/axiosAPI'

/*---> Component <---*/
export default function GenericCard({ src, title, postId, ownerId }) {
  const [imageUrl, setImageUrl] = useState(src)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getAvatar() {
      const user = await axiosAPI.user.getOtherUserInfo(ownerId)
      if (!user.data.avatar) {
        setImageUrl('/images/avatar.png')
      }
      setLoading(false)
    }
    getAvatar()
  }, [])

	// if (loading) {
	// 	return <>Loading</>
	// }

  return (
    <Link href={`/posts/${postId}`}>
      <GenericWrapper>
        <Link href={`/public-profile/${ownerId}`}>
          <GenericImageWrapper>
            <GenericImage src={imageUrl} />
          </GenericImageWrapper>
        </Link>
        <GenericTextWrapper>
          <GenericTitle>{title}</GenericTitle>
        </GenericTextWrapper>
      </GenericWrapper>
    </Link>
  )
}

/*---> Styles <---*/

/*---> Generic Card Styles <---*/

export const GenericWrapper = styled.div`
  /* border: 1px solid green; */
  width: 100%;
  background-color: white;
  box-shadow: ${(props) =>
    props.isDragging
      ? '16px 16px 40px 0 rgba(0, 0, 0, 0.2)'
      : '0 10px 16px 0 rgba(0, 0, 0, 0.05)'};
  border-radius: 18px;
  margin-bottom: 20px;
  display: flex;
  padding: 10px 12px 10px 8px;
  width: 460px;
  margin-bottom: 40px;
  cursor: pointer;

  @media (max-width: 500px) {
    width: 90%;
  }
`

export const GenericImageWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`

export const GenericImage = styled.img`
  /* border: 1px solid yellow; */
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 12px;

  img[alt] {
    margin-left: -16px;
    text-indent: 16px;
  }
`

export const GenericTextWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GenericTitle = styled.p`
  /* border: 1px solid orange; */
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 5px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  word-break: break-word;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`
