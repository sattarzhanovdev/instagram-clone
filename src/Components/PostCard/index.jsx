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

  const savedPosts = []

  const isLiked = liked?.filter(likes => likes.id === item.id ? true : false)
  const isSaved = saved?.filter(saves => saves.user === currentUser?.id ? savedPosts.push(saves) : false)

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
    savedPosts?.length !== 0 ?
    savedPosts?.map(saves => (
      liked?.map(likes => (
        <div 
          className={cls.post}
        >
          <li
            className={cls.up}
            to={`/profile/${allUsers?.map(users => item?.user === users.id ? users.username : '').join(' ')}`}
          >
            <img 
              src={
                allUsers?.map(users => item?.user === users.id ? users.avatar : '')
              }
              alt="photo"
            />
            <p>
              {allUsers?.map(users => item?.user === users.id ? users.username : '')}
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
                likes.post === item.id ?
                <li
                  onClick={() => dislike('likes.id')}
                >
                  <AiFillHeart />
                </li> :
                <li 
                  onClick={() => like(item.id)}
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
                saves.post === item.id ?
                <li
                  onClick={() => {
                    unsave(saves.id)
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
      ))
    )) :
    <div 
      className={cls.post}
    >
      <li
        className={cls.up}
        to={`/profile/${allUsers?.map(users => item?.user === users.id ? users.username : '').join(' ')}`}
      >
        <img 
          src={
            allUsers?.map(users => item?.user === users.id ? users.avatar : '')
          }
          alt="photo"
        />
        <p>
          {allUsers?.map(users => item?.user === users.id ? users.username : '')}
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
          <li 
            onClick={() => like(item.id)}
          >
            <AiOutlineHeart /> 
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
              save(item.id)
            }}
          >
            <FaRegBookmark />
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
          {/* <span>{username}</span> {item.title} */}
        </p>
      </div>
      <div className={cls.post_comments}>
        
      </div>
    </div>
  )
}

export default PostCard