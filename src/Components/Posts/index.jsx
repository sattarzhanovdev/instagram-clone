import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { FaBookmark, FaRegBookmark, } from 'react-icons/fa'
import { API } from '../../API'
import cls from './Posts.module.scss'

const Posts = () => {
  const [ posts, setPosts ] = React.useState(null)
  const [ users, setUsers ] = React.useState(null)
  const [ likes, setLikes ] = React.useState(null)
  const [ saves, setSaves ] = React.useState(null)
  const [ count, setCount ] = React.useState(0)
  const [ refresh, setRefresh ] = React.useState('')
  const accessToken = localStorage.getItem('accessToken')

  const currentUser = JSON.parse(localStorage.getItem('user'))

  React.useEffect(() => {
    API.getPosts(accessToken)
      .then(res => {
        setPosts(res.data);
      })

    API.getUsers()
      .then(res => {
        setUsers(res.data)
      })

    API.getLikes(currentUser?.id)
      .then(res => {
        setLikes(res.data)
      })

    API.getSaves(accessToken, currentUser.id)
      .then(res => {
        setSaves(res.data)
      })

    setTimeout(() => {
      setRefresh('ОБНОВЛЯЙСЯ')
    }, 1000)
  }, [refresh])

  const doubleClickLike = (id) => {
    setCount(count => count + 1)
    if(count === 2){
      API.like(accessToken, {post: id})
      setRefresh('REFRESH!')
      setTimeout(() => {
        setCount(0)
      }, 1000)
    }
    setTimeout(() => {
      setCount(0)
    }, 1000)
  }

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

  return (
    <div className={cls.posts}>
      {
        posts ? 
        posts.map((item, i) => (
          <div 
            key={i}
            className={cls.post}
          >
            <div className={cls.up}>
              <img 
                src={
                  users?.map(
                    val => val.id === item.user ?
                    val.avatar !== null
                    ? 
                    val.avatar 
                    :
                    'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : 
                    null
                  ).join(' ')
                }
                alt="photo"
              />
              <p>
                {users?.map(val => val.id === item.user ? val.username : null)}
              </p>
            </div>
            <div 
              className={cls.post_image}
              onClick={() => doubleClickLike(item.id)}
            >
              {
                item.post_images.length !== 0 ?
                item.post_images.map((image, index) => (
                  <img 
                  key={index}
                    src={image.image}
                    alt=""
                  />
                )) : 
                <img 
                  src={'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'}
                  alt=""
                />
              }
                {
                  count === 2 ?
                  <div className={cls.like}>
                    <li>
                      <AiFillHeart />
                    </li> 
                  </div>:
                  null
                }
            </div>
            <div className={cls.post_buttons}>
              <div className={cls.left}>
              {
                    likes?.map(val => val.post === item.id ?
                      <li 
                        key={val.post}
                        onClick={() => {
                          likes.length !== 0 ?
                          likes?.map(val => val.post === item.id ? dislike(val.id) : like(item.id)) :
                          like(item.id)
                        }}
                      >
                        <AiFillHeart />
                      </li> :
                      <li 
                        key={val.post}
                        onClick={() => {
                          likes.length !== 0 ?
                          likes?.map(val => val.post === item.id ? dislike(val.id) : like(item.id)) :
                          like(item.id)
                        }}
                      >
                        <AiOutlineHeart />
                      </li> 
                    ) 
                }
                <li>
                  <FiMessageCircle />
                </li>
                <li>
                  <FiSend />
                </li>
              </div>
              <div className={cls.right}>
                <li
                  onClick={() => {
                    saves?.map(val => val.post === item.id ? unsave(val.id) : save(item.id)) 
                  }}
                >
                  {
                    saves?.length !== 0 ?
                    saves?.map(val => val.post === item.id ? <FaBookmark /> : <FaRegBookmark />) :
                    <FaRegBookmark />
                  }
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
                <span>{users?.map(val => val.id === item.user ? val.username : null)}</span> {item.title}
              </p>
            </div>
            <div className={cls.post_comments}>
              
            </div>
          </div>
        )) :
        null
      }
    </div>
  )
}

export default Posts