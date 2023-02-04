import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { API } from '../../API'
import cls from './PostCard.module.scss'
import { Link } from 'react-router-dom'

const PostCard = ({item, posts, liked, allUsers, saved, setRefresh}) => {
  const [ likedStatus, setLikedStatus ] = React.useState(false)
  const [ savedStatus, setSavedStatus ] = React.useState(false)

  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('user'))

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
    setRefresh('REFRESHing!')
  }

  const follow = (id) => {
    API.follow(accessToken, {to_user: id})
    setRefresh('followed!')
  }

  const unfollow = (id) => {
    API.unfollow(accessToken, id)
    setRefresh('unfollowed!')
  }


  return (
    <div 
      className={cls.post}
    >
      <li
        className={cls.up}
        to={`/profile/${allUsers?.map(users => item?.user === users.id ? users.username : '').join(' ')}`}
      >
        <img 
          src={
            allUsers?.map(users => item?.user === users.id ? users.avatar : '').join(' ')
          }
          alt="photo"
        />
        <p>
          {allUsers?.map(users => item?.user === users.id ? users.username : '').join(' ')}
        </p>
      </li>
      <div className={cls.post_image}>
        {
          item.post_images.length !== 0 ?
          item.post_images.map((image, index) => (
            <img 
              src={
                image.image ?
                image.image :
                'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'
              }
              alt=''
            /> 
          )) : 
          <img 
            src={'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'}
            alt=""
          />
        }
      </div>
      <div className={cls.post_buttons}>
        <div className={cls.left}>
          {
            liked?.length !== 0 ?
            liked?.map(likes => (
              likes.user === currentUser?.id ?
              <li
                onClick={() => dislike(likes.id)}
              >
                <AiFillHeart />
              </li> :
              <li 
                onClick={() => like(item.id)}
              >
                <AiOutlineHeart /> 
              </li>
            )) :
            <li 
              onClick={() => like(item?.id)}
            >
              <AiOutlineHeart /> 
            </li>
          }
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
          {
            saved ?
            <li
              onClick={() => {
                unsave('savedId')
              }}
            >
              <FaBookmark />
            </li>
            :
            <li
              onClick={() => {
                save(item.id)
              }}
            >
              <FaRegBookmark />
            </li>
          }
        </div>
      </div>
      <div className={cls.likes}>
        <p>
          {item.liked.length} likes
        </p>
      </div>
      <div className={cls.post_title}>
        <p>
          {/* <span>{username}</span> {item.title} */}
        </p>
      </div>
      <div className={cls.post_comments}>
        
      </div>
    </div>
  )
}

export default PostCard