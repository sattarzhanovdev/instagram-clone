import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { FaBookmark, FaPage4, FaRegBookmark, } from 'react-icons/fa'
import { API } from '../../API'
import cls from './Posts.module.scss'
import { Link } from 'react-router-dom'
import PostCard from '../PostCard'

const Posts = () => {
  const [ posts, setPosts ] = React.useState(null)
  const [ users, setUsers ] = React.useState(null)
  const [ saves, setSaves ] = React.useState(null)
  const [ likes, setLikes ] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState('')

  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('user'))

  React.useEffect(() => {
    API.getPosts(accessToken)
      .then(res => {
        setPosts(res.data.reverse());
      })

    API.getUsers()
      .then(res => {
        setUsers(res.data)
      })

    API.getSaves(accessToken, currentUser.id)
      .then(res => {
        setSaves(res.data)
      })
      
    API.getLikes(currentUser.id)
      .then(res => {
        setLikes(res.data)
      })

    setInterval(() => {
      setRefresh('ОБНОВЛЯЙСЯ')
    }, 6000)

  }, [refresh])

  return (
    <div className={cls.posts}>
      {
        posts ? 
        posts?.map((item, i) => (
          <PostCard 
            item={item}
            posts={posts}
            liked={likes}
            allUser={users}
            saved={saves}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ))
        :
        null
      }
    </div>
  )
}

export default Posts