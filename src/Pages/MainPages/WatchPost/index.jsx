import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../API'
import cls from './WatchPost.module.scss'

const WatchPost = () => {
  const [ item, setItem ] = React.useState(null)
  const [ saves, setSaves ] = React.useState(null)
  const [ users, setUsers ] = React.useState(null)
  const [ comments, setComments ] = React.useState(null)
  const [ popUpActive, setPopUpActive ] = React.useState(false)
  const [ refresh, setRefresh ] = React.useState('')
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = localStorage.getItem('userId')
  const accessToken = localStorage.getItem('accessToken')

  React.useEffect(() => {
    API.getPosts(accessToken)
      .then(res => {
        res.data.map(val => val.id === Number(id) ? setItem(val) : null )
      })

    API.getSaves(accessToken, user.id)
      .then(res => {
        setSaves(res.data)
      })

    API.getComments(Number(id))
      .then(res => {
        setComments(res.data)
      })

    API.getUsers()
      .then(res => {
        setUsers(res.data)
      })

    setInterval(() => {
      setRefresh('ОБНОВЛЯЙСЯ')
    }, 1000)

  }, [refresh])

  const like = () => {
    API.like(accessToken, {post: id})
    setRefresh('liked!')
  }

  const dislike = (likeId) => {
    API.dislike(accessToken, likeId)
    setRefresh('disliked!')
  }

  const save = () => {
    API.save(accessToken, {post: id})
    setRefresh('saved!')
  }

  const unsave = (savedId) => {
    API.unsave(accessToken, savedId)
    setRefresh('unsaved!')
  }

  const {
    register, 
    handleSubmit, 
    reset
  } = useForm()

  const comment = (data) => {
    if(data.body.length !== 0){
      API.postComments(accessToken, {...data, post: Number(id), parent: null})
      setRefresh('comment added!')
      reset()
    }
  }

  const delete_comment = (id) => {
    API.deleteComment(accessToken, id)
    setRefresh('comment deleted!')
  }

  const Navigate = useNavigate()

  const likedBase = item?.liked.find(val => val.user === user?.id ? true : false)
  const valId = item?.liked.find(val => val.user === user?.id ? val.id : '')
  const savedBase = saves?.find(val => val.post === Number(id) ? true : false)
  const savedId = saves?.find(val => val.post === Number(id) ? val.id : '')

  return (
    <div className={cls.post_container}>
      <div className={cls.post}>
        <div className={cls.up}>
          <div className={cls.left}>
            <img 
              src={
                users?.map(
                  val => val.id === item?.user ?
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
              {users?.map(val => val.id === item?.user ? val.username : null)}
            </p>
          </div>
          {
            Number(userId) === user?.id ? 
            <div 
              className={cls.right}
              onClick={() => setPopUpActive(!popUpActive)}
            >
              <li>
                <BiDotsHorizontalRounded />
              </li>
            </div> : 
            null
          }

          {
            popUpActive ? 
            <div 
              className={cls.popUp}
              onClick={() => {
                API.deletePost(accessToken, item.id)
                setRefresh('deleted!')
                Navigate('/profile')
              }}
            >
              <li>
                Delete post
              </li>
            </div> :
            null
          }
        </div>
        <div  
          className={cls.post_image}
        >
          {
            item?.post_images.length !== 0 ?
            item?.post_images.map((images, index) => (
              <img 
                key={index}
                src={images.image}
                alt=""
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
              likedBase ? 
              <li 
                key={valId?.id}
                onClick={() => {
                  dislike(valId?.id)
                }}
              >
                <AiFillHeart />
              </li> :
              <li 
                key={valId?.id}
                onClick={() => {
                  like(item?.id)
                }}
              >
                <AiOutlineHeart />
              </li> 
            }
            <li>
              <FiMessageCircle />
            </li>
            <li>
              <FiSend />
            </li>
          </div>
          <div className={cls.right}>
            {
              savedBase ?
              <li
                onClick={() => {
                  unsave(savedId) 
                }}
              >
                <FaBookmark />
              </li> :
              <li
                onClick={() => {
                  save(item?.id) 
                }}
              >
                <FaRegBookmark />
              </li>
            }
          </div>
        </div>
        <div className={cls.likes}>
          <p>
            {item?.liked.length} likes
          </p>
        </div>
        <div className={cls.post_title}>
          <p>
            <span>{users?.map(val => val.id === item?.user ? val.username : null)}</span> {item?.title}
          </p>
        </div>
        <form 
          className={cls.post_comments}
          onSubmit={handleSubmit(data => comment(data))}
        >
          <input 
            type="text" 
            placeholder='Type your comment...'
            {...register('body')}
          />
          <button>
            <img 
              src='/img/icons/Share.png'
              alt='send'
            />
          </button>
        </form>
        <div className={cls.allComments}>
          {
            comments?.length !== 0 ?
            comments?.map(item => (
              users?.map(allUsers => {
                return item.user === allUsers.id ? (
                  <div className={cls.comment}>
                    <div className={cls.user}>
                      <img 
                        src={
                          allUsers.avatar ? 
                          allUsers.avatar : 
                          'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                        } 
                        alt={allUsers.username}
                      />
                      <p>{allUsers.username}</p>
                    </div>
                    <div className={cls.comment_text}>
                      <p>{item.body}</p>
                      <div className={cls.right}>
                        {
                          Number(userId) === user?.id ? 
                            <li 
                              onClick={() => delete_comment(item.id)}
                            >
                              <BiTrash />
                            </li>
                          : 
                          null
                        }
                      </div>
                    </div>
                  </div> 
                ) :
                null
              })
            ))
            :
            <div className={cls.no_comments}>
              <h3>
                No comments
              </h3>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default WatchPost