import React from 'react'
import cls from './WatchStories.module.scss'
import {FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { API } from '../../API'
import { BiTrash } from 'react-icons/bi'

const WatchStories = ({item, setStories, setActive, setRefresh, refresh}) => {
  const [ storyId, setStoryId ] = React.useState(0)
  const [ users, setUsers ] = React.useState(null)

  React.useEffect(() => {
    API.getUsers()
      .then(res => setUsers(res.data))

    if(item.length === 0){
      setActive(false)
    }
  }, [refresh])


  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')
  const user = JSON.parse(localStorage.getItem('user'))

  const user_info = []

  item?.filter(item => {
    users?.filter(val => {
      return val.id === item.user ? user_info.push(val) : null
    })
  })

  const delete_story = (id) => {
    API.deleteStories(accessToken, id)
    setRefresh('ref')
    if(storyId === item.length){
      setActive(false)
    }
  }

  const nextStory = () => {
    if(storyId + 1 === item.length){
      setActive(false)
      setStories([])
    }else{
      setStoryId(storyId + 1)
    }
  }
  const prevStory = () => {
    if(storyId === 0){
      setActive(false)
      setStories([])
    }else{
      setStoryId(storyId - 1)
    }
  }

  return (
    <div className={cls.watch}>
      <div className={cls.close}>
        <li
          onClick={() => setActive(false)}
        >
          <AiOutlineClose />
        </li>
      </div>
      <div className={cls.btns}>
        <button
          onClick={() => prevStory()}
        >
          <FiArrowLeftCircle />
        </button>
        <button
          onClick={() => nextStory()}
        >
          <FiArrowRightCircle/>
        </button>
      </div>
      <div className={cls.watchStory}>
        <div className={cls.user_info}>
          <div className={cls.left}>
            <img 
              src={user_info[0]?.avatar !== null ? user_info[0]?.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'}
              alt="user"
            />
            <p>{user_info[0]?.username}</p>
          </div>
          <div className={Number(userId) === user.id ? cls.right : cls.none}>
            <li
              onClick={() => delete_story(item[storyId]?.id)}
            >
              <BiTrash />
            </li>
          </div>
          <div className={cls.media}>
            <div>
              {
                item[storyId]?.file.slice(item[storyId]?.file.length - 4) === '.png' || item[storyId]?.file.slice(item[storyId]?.file.length - 4) === '.jpg' ? 
                <img 
                  src={item[storyId]?.file}
                  alt={'image'}
                  className={cls.post_photo}
                /> :
                item[storyId]?.file.slice(item[storyId]?.file.length - 5) === '.jpeg' ? 
                <img 
                  src={item[storyId]?.file}
                  alt={'image'}
                  className={cls.post_photo}
                /> :
                <video autoPlay loop>
                  <source src={item[storyId]?.file}/>
                </video> 
              }
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default WatchStories