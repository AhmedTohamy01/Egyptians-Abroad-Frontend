import { useState, useEffect } from 'react'
import axiosAPI from '../../api/axiosAPI'
import PostCard from '../../components/Post/PostCard'
import styled from 'styled-components'
import CommentsCard from '../../components/Post/CommentsCard'
import Head from 'next/head'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import Footer from '../../components/Footer/Footer'

export default function PostPage() {
  const [postData, setPostData] = useState(null)
  const [commentsData, setCommentsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)

  useEffect(async () => {
    try {
      const postId = window.location.href.split('/')[4]
      const post = await axiosAPI.post.getOnePost(postId)
      const comments = await axiosAPI.comment.getPostComments(
        postId,
        limit,
        skip
      )
      console.log('comments', comments)
      setPostData(post)
      setCommentsData(comments)
      setLoading(false)
    } catch (e) {
      setError(e)
    }
  }, [limit, skip])

  if (loading) {
    return <>loading ...</>
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
      <HomeNavbar />
      <PostPageWrapper>
        <PostCard
          postId={postData.data._id}
          title={postData.data.title}
          body={postData.data.body}
          src='/images/avatar.png'
        />
        <CommentsCard comments={commentsData.data} />
      </PostPageWrapper>
      <Footer />
    </>
  )
}

/*---> Styles <---*/
export const PostPageWrapper = styled.div`
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
