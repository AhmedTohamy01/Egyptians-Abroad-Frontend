import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import AvatarEditor from 'react-avatar-editor'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import axiosAPI from '../../api/axiosAPI'

/*---> Component <---*/
export default function UploadPhoto() {
  const [newImageAdded, setNewImageAdded] = useState(false)
  const [newImage, setNewImage] = useState(null)
  const [newImageURL, setNewImageURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editor, setEditor] = useState(null)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [scale, setScale] = useState(1)
  const [avatarLink, setAvatarLink] = useState(null)
  const [error, setError] = useState(null)

  useEffect(async () => {
    try {
      const user = await axiosAPI.user.getUserInfo()
      const avatar = user.data.avatar
        ? await axiosAPI.user.getUserAvatar(user.data._id)
        : '/images/avatar.png'
      setAvatarLink(avatar)
    } catch (e) {
      setError(e)
    }
  }, [])

  function handleNewImageSelect(event) {
    setNewImageAdded(true)
		setNewImageURL(null)
    setNewImage(event.target.files[0])
    setScale(1)
  }

  const handleZoomBar = (e) => {
    let newScale = parseFloat(e.target.value)
    setScale(newScale)
  }

  const handlePositionChange = (position) => {
    setPosition(position)
  }

  async function handleSave(event) {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('avatar', newImage)
    const user = await axiosAPI.user.getUserInfo()
    await axiosAPI.user.uploadUserAvatar(formData)
    const uploadedImage = await axiosAPI.user.getUserAvatar(user.data._id)
  	setNewImageURL(uploadedImage)
    setNewImageAdded(false)
    setLoading(false)
  }

  function handleCancel() {
    setNewImageAdded(false)
    setLoading(false)
  }

  return (
    <>
      <StepWrapper>
        <Title>Let’s Get Started</Title>
        <SubTitle>
          Upload a photo to display on your profile and add some basic
          information to introduce yourself.
        </SubTitle>
        <ProfilePhotoWrapper>
          <ImageWrapper>
            {newImageAdded ? (
              <AvatarEditor
                ref={(editor) => setEditor(editor)}
                image={newImageAdded ? newImage : avatarLink}
                width={250}
                height={250}
                border={10}
                color={[255, 255, 255, 0.5]} // RGBA
                rotate={0}
                borderRadius={500}
                scale={parseFloat(scale)}
                position={position}
                onPositionChange={handlePositionChange}
              />
            ) : (
              <Image src={newImageURL || avatarLink} alt='avatar big' />
            )}
          </ImageWrapper>

          <UploadButtonWrapper newImageAdded={newImageAdded} loading={loading}>
            <UploadInput
              id='upload-photo'
              type='file'
              accept='image/*'
              onChange={(event) => handleNewImageSelect(event)}
            />
            <UploadLabel htmlFor='upload-photo'>
              <CameraButton
                color='primary'
                aria-label='upload picture'
                component='span'
                size='medium'
              >
                <CameraIcon />
              </CameraButton>
            </UploadLabel>
          </UploadButtonWrapper>

          <Spinner loading={loading} src='/images/spinner.gif' />

          <ZoomWrapper newImageAdded={newImageAdded} loading={loading}>
            <ZoomLabel>Zoom:</ZoomLabel>
            <ZoomBar
              name='scale'
              type='range'
              onChange={handleZoomBar}
              min='1'
              max='2'
              step='0.01'
              value={scale}
              defaultValue={1}
            />
          </ZoomWrapper>

          <ButtonsWrapper newImageAdded={newImageAdded} loading={loading}>
            <CancelButton
              variant='contained'
              color='secondary'
              onClick={handleCancel}
            >
              Cancel
            </CancelButton>
            <SaveImageButton
              variant='contained'
              onClick={(event) => handleSave(event)}
            >
              Save
            </SaveImageButton>
          </ButtonsWrapper>
        </ProfilePhotoWrapper>
      </StepWrapper>
    </>
  )
}

/*---> Styles <---*/
export const FixedWrapper = styled.div`
  /* border: 1px solid red; */
  min-height: calc((100vh) * 0.8);
`

export const StepWrapper = styled.div`
  /* border: solid yellow; */
  width: 460px;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 520px) {
    width: 84%;
  }
`

export const BackIcon = styled(LeftArrowAlt)`
  /* border: 1px solid red; */
  width: 42px;
  height: 41px;
  margin-left: -10px;
  margin-bottom: 20px;
  margin-top: 30px;
  cursor: pointer;
`

export const Title = styled.p`
  /* border: solid yellow; */
  font-size: 18px;
  font-weight: bold;
  line-height: 1.11;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 20px;
`

export const SubTitle = styled.p`
  /* border: solid yellow; */
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  margin-bottom: 40px;
`

export const ProfilePhotoWrapper = styled.div`
  /* border: 1px solid red; */
  margin-right: auto;
  margin-left: auto;
  text-align: center;

  @media (max-width: 1024px) {
    width: 90%;
  }
`

export const ImageWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin-bottom: 0px;
  display: inline-block;
  margin-left: 60px;

  @media (max-width: 515px) {
    margin-left: initial;
    display: flex;
    justify-content: center;
  }
`

export const Image = styled.img`
  /* border: 1px solid red; */
  width: 128px;
  height: 128px;
  border-radius: 50%;
`

export const CameraButton = styled(IconButton)`
  /* border: 1px solid red !important; */
  border: 1px solid #ced4da !important;
  background: white !important;
`

export const CameraIcon = styled(PhotoCamera)`
  /* width: 50px !important; */
  color: gray !important;
  font-size: 30px !important;
`

export const UploadButtonWrapper = styled.div`
  /* border: 1px solid black; */
  display: inline;

  position: relative;
  bottom: ${(props) => (props.newImageAdded ? '230px' : '95px')};
  right: 40px;

  @media (max-width: 515px) {
    left: ${(props) =>
      props.loading ? '225px' : props.newImageAdded ? '125px' : '55px'};
    bottom: ${(props) =>
      props.loading ? '431px' : props.newImageAdded ? '263px' : '128px'};
  }
`
export const UploadInput = styled.input`
  /* border: 1px solid yellow; */
  display: none;
`

export const UploadLabel = styled.label`
  /* border: 1px solid yellow; */
`

export const Spinner = styled.img`
  /* border: 1px solid green; */
  width: 200px;
  position: relative;
  bottom: 260px;
  display: ${(props) => (props.loading ? 'initial' : 'none')};

  @media (max-width: 515px) {
    right: 30px;
    bottom: 235px;
  }
`

export const ButtonsWrapper = styled.div`
  /* border: 1px solid yellow; */
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  display: ${(props) => (props.newImageAdded ? 'flex' : 'none')};
`

export const CancelButton = styled(Button)`
  /* background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important; */
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
  margin-right: 20px !important;
`

export const SaveImageButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 125px !important;
  height: 36px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
`

export const ZoomWrapper = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 20px;
  text-align: center;
  margin-top: ${(props) => (props.loading ? '-205px' : 'initial')};
  display: ${(props) => (props.newImageAdded ? 'block' : 'none')};

  @media (max-width: 515px) {
    margin-top: ${(props) => (props.loading ? '-203px' : '-35px')};
  }
`

export const ZoomLabel = styled.p`
  /* border: 1px solid yellow; */
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const ZoomBar = styled.input`
  /* border: 1px solid yellow; */
  cursor: grab;
  width: 200px;
`
