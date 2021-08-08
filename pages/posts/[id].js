import { useState, useEffect, useContext } from 'react'
import axiosAPI from '../../api/axiosAPI'
import PostCard from '../../components/Post/PostCard'
import styled from 'styled-components'
import CommentsCard from '../../components/Post/CommentsCard'
import Head from 'next/head'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import Footer from '../../components/Footer/Footer'
import AddButton from '../../components/Home/AddButton' 
import Loader from 'react-loader-spinner'
import { MainContext } from '../../context/MainContext'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

export default function PostPage() {
  const [postData, setPostData] = useState(null)
	const [postAvatar, setPostAvatar] = useState(null)
  const [commentsData, setCommentsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const { userProfile, avatarLink } = useContext(MainContext)

  useEffect(async () => {
    try {
			setLoading(true)
      const postId = window.location.href.split('/')[4]
      const post = await axiosAPI.post.getOnePost(postId)
			const user = await axiosAPI.user.getOtherUserInfo(post.data.owner)
      const avatar = user.data.avatar
        ? axiosAPI.user.getUserAvatar(user.data._id)
        : null
      const comments = await axiosAPI.comment.getPostComments(
        postId,
        limit,
        skip
      )
			comments.data.forEach((item) => {
        const avatar = axiosAPI.user.getUserAvatar(item.owner)
        item.avatarLink = avatar
      })
      setPostData(post)
			setPostAvatar(avatar)
      setCommentsData(comments)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }, [limit, skip])


	function isValidImage(url) {
    let image = new Image()
    image.src = url
    if (image.width > 0 || image.height > 0) {
      return true
    } else {
      return false
    }
  }

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <>
      <Head>
        <title>Egyptians Abroad</title>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='website to connect egyptians abroad and answer their questions'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <HomeNavbar
        userProfile={userProfile}
        avatarLink={
          isValidImage(avatarLink) ? avatarLink : '/images/avatar.png'
        }
      />
      <PostPageWrapper>
        <PostCard
          postId={postData.data._id}
          title={postData.data.title}
          body={postData.data.body}
          src={postAvatar || '/images/avatar.png'}
        />
        <CommentsCard comments={commentsData.data} />
        <Link href='/home' passHref>
          <HomeButton variant='contained'>Back to Home</HomeButton>
        </Link>
      </PostPageWrapper>
      <AddButton ButtonLink={`/comments/${postData.data._id}/new`} />
      <Footer />
    </>
  )
}

/*---> Styles <---*/
export const PostPageWrapper = styled.div`
  /* border: 1px solid red; */
  /* max-width: 460px; */
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  min-height: calc((100vh) * 0.72);
`

export const PostsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HomeButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  margin-bottom: 70px !important;
  margin-top: 30px !important;
`