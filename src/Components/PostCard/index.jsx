import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { API } from '../../API'
import cls from './PostCard.module.scss'
import { Link } from 'react-router-dom'

const PostCard = ({item, posts, liked, allUser, saved, setRefresh, refresh}) => {
  const [ likedStatus, setLikedStatus ] = React.useState(false)
  const [ savedStatus, setSavedStatus ] = React.useState(false)
  const [ avatar, setAvatar ] = React.useState('')
  const [ savedId, setSavedId ] = React.useState('')
  const [ likedId, setLikedId ] = React.useState('')

  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const savedPosts = []


  const like = (id) => {
    API.like(accessToken, {post: id})
    setRefresh('REFRESH YUHUUc!')
  }

  const dislike = (id) => {
    API.dislike(accessToken, id)
    setRefresh('REFRESHING!')
  }

  const save = (id) => {
    API.save(accessToken, {post: id})
    setRefresh('REFRESH yuhuu!')
  }

  const unsave = (id) => {
    API.unsave(accessToken, id)
    setRefresh('unsaved!')
  }

  React.useEffect(() => {
    const likedState = liked?.find(likes => likes.post === item.id ? setLikedStatus(true) : '')
    const savedState = saved?.find(saves => saves.post === item.id ? setSavedStatus(true) : '') 
    const savedId = saved?.find(saves => saves.post === item.id ? setSavedId(saves.id) : '') 
    const likedId = liked?.find(likes => likes.post === item.id ? setLikedId(likes.id) : '') 

    const avatar = allUser?.map(user => user.id === item.user ? setAvatar(user.avatar) : '')

  }, [refresh])

  return (
    <div 
      className={cls.post}
    >
      <Link
        className={cls.up}
        to={`/profile/${allUser?.map(user => user.id === item.user ? user.id : '').join('')}`}
      >
        <img 
          src={avatar ? avatar : 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'}
          alt="photo"
        />
        <p>
          {allUser?.map(user => user.id === item.user ? user.username : '')}
        </p>
      </Link>
      <div className={cls.post_image}>
        {
          item.post_images.length !== 0 ?
          <img 
            src={
              item.post_images[0].image ?
              item.post_images[0].image :
              'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'
            }
            alt=''
            />  : 
          <img 
            src={'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'}
            alt=""
          />
        }
      </div>
      <div className={cls.post_buttons}>
        <div className={cls.left}>
          <li 
            onClick={() => {
              likedStatus ? dislike(likedId) : like(item.id)
            }}
          >
            {
              likedStatus ? <AiFillHeart /> : <AiOutlineHeart />
            }
          </li>
          <li>
            <Link to={`/p/${item.id}`}>
              <FiMessageCircle />
            </Link>
          </li>
          <li>
            <FiSend />
          </li>
        </div>
        <div className={cls.right}>
          <li
            onClick={() => {
              savedStatus ? unsave(savedId) : save(item.id)
            }}
          >
            {savedStatus ? <FaBookmark /> : <FaRegBookmark />}
          </li>
        </div>
      </div>
      <div className={cls.likes}>
        <p>
          {item.liked.length} likes
        </p>
      </div>
      <div className={cls.post_title}>
        <p>
          <span>{allUser?.map(user => user.id === item.user ? user.username : '')}</span> {item.title}
        </p>
      </div>
    </div>
  )
}

export default PostCard