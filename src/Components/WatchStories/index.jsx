import React from 'react'
import cls from './WatchStories.module.scss'
import {FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { API } from '../../API'

const WatchStories = ({item, setStories, setActive}) => {
  const [ storyId, setStoryId ] = React.useState(0)
  const [ users, setUsers ] = React.useState(null)

  React.useEffect(() => {
    API.getUsers()
      .then(res => setUsers(res.data))
  }, [])

  const user_info = []

  item?.filter(item => {
    users?.filter(val => {
      return val.id === item.user ? user_info.push(val) : null
    }) 
  })

  console.log(user_info);

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
      <div>
        <div className={cls.user_info}>
          <img 
            src={user_info[0]?.avatar !== null ? user_info[0]?.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'}
            alt="user"
          />
          <p>{user_info[0]?.username}</p>
        </div>
        <img 
          src={item[storyId]?.file}
        />
      </div>
    </div>
  )
}

export default WatchStories