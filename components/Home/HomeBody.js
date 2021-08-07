import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
import GenericCard from '../Post/GenericCard'
import Button from '@material-ui/core/Button'
import Loader from 'react-loader-spinner'

/*---> Component <---*/
export default function HomeBody() {
  const [error, setError] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    try {
      const allNewPosts = await axiosAPI.post.getAllPosts(limit, skip)
      const arr = allPosts.concat(allNewPosts.data)

      arr.forEach((item) => {
        const avatar = axiosAPI.user.getUserAvatar(item.owner)
        item.avatarLink = avatar
      })
      setAllPosts(arr)
      setLoading(false)
    } catch (e) {
      setError(e)
    }
  }, [limit, skip])

  function handleShowMore() {
    setSkip(skip + 5)
  }

  function isValidImage(url) {
    let image = new Image()
    image.src = url
    if (image.width > 0 || image.height > 0) {
      return true
    } else {
      return false
    }
  }

  if (allPosts.length === 0) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <ProfileBodyWrapper>
      <PostsTitle>All Posts</PostsTitle>
      <PostsWrapper>
        {allPosts.map((item) => (
          <GenericCard
            key={item._id}
            ownerId={item.owner}
            postId={item._id}
            title={item.title}
            src={
              isValidImage(item.avatarLink)
                ? item.avatarLink
                : '/images/avatar.png'
            }
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

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
