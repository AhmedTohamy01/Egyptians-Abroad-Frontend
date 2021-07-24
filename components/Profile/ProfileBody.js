import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
import GenericCard from '../Post/GenericCard'
import Button from '@material-ui/core/Button'

/*---> Component <---*/
export default function ProfileHeader() {
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [avatarLink, setAvatarLink] = useState(null)
  const [limit, setLimit] = useState(2)
  const [skip, setSkip] = useState(0)
  
  useEffect(async () => {	
    try {
      const user = await axiosAPI.user.getMyUserInfo()
      const userNewPosts = await axiosAPI.post.getMyUserPosts(limit, skip)
      const avatar = user.data.avatar
        ? await axiosAPI.user.getUserAvatar(user.data._id)
        : null
      setUserData(user)
			console.log('newUserPosts', userNewPosts.data)
			setUserPosts(userPosts.concat(userNewPosts.data))
      setAvatarLink(avatar)
    } catch (e) {
      setError(e)
    }
  }, [limit, skip])

  function handleShowMore() {
    setSkip(skip + 2)
  }

  return (
    <ProfileBodyWrapper>
      <PostsTitle>My Posts</PostsTitle>
      <PostsWrapper>
        {userPosts?.map((item) => (
          <GenericCard
            key={item._id}
            src={avatarLink || '/images/avatar.png'}
            title={item.title}
          />
        ))}
      </PostsWrapper>
      <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
    </ProfileBodyWrapper>
  )
}

/*---> Styles <---*/
export const ProfileBodyWrapper = styled.div`
  /* border: solid red; */
  max-width: 460px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  min-height: calc((100vh) * 0.25);
`

export const PostsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const PostsTitle = styled.div`
  /* border: 1px solid green; */
  font-size: 35px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;
`

export const ShowMoreButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
`
