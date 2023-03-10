import React from 'react'
import { API } from '../../API'
import WatchStories from '../WatchStories'
import cls from './Stories.module.scss'

const Stories = () => {
  const [ refresh, setRefresh ] = React.useState('')
  const [ storiesBase, setStoriesBase ] = React.useState(null)
  const [ stories, setStories ] = React.useState([])
  const [ users, setUsers ] = React.useState(null)
  const [ active, setActive ] = React.useState(false)

  const access = localStorage.getItem('accessToken') 

  let usersBase = []
  
  React.useEffect(() => {
    API.getStories(access)
      .then(r => {
        setStoriesBase(r.data)
      })
      
    API.getUsers()
      .then(res => {
        setUsers(res.data)
      })
      
    setTimeout(() => {
      setRefresh('hello')
    }, 1000)
  }, [refresh])

  users?.filter(item => {
    return storiesBase?.filter(val => {
      return val.user === item.id ? usersBase.unshift(item) : null
    })
  })

  const table = {};
  const newBase = usersBase.filter(({username}) =>(!table[username] && (table[username] = 1)))
    
  const postStories = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    API.postStories(access, formData)
    setRefresh('ref')
  };
  
  const getStory = (id) => {
    storiesBase?.filter(val => {
      if(val.user === id){
        stories.unshift(val)
        localStorage.setItem('userId', val.user)
      } 
    })
    setActive(true)
  }

  return (
    <div className={cls.stories_container}>
      <div className={cls.stories}>
        <input 
          type="file" 
          onChange={e => postStories(e.target.files[0])}
          id={'postStory'}
        />
        <label htmlFor="postStory">
          <div
            className={cls.users}
          >
            <div className={cls.avatar1}>
              <img src={'https://i0.wp.com/alternative.me/images/avatars/default.png'} alt="" />
            </div>
            <p>Add story</p>
          </div>
        </label>
        {
          users ? 
          newBase.map((item, index) => (
            <div
              key={index}
              className={cls.users}
              onClick={() => {
                getStory(item.id)
              }}
            >
              <div className={cls.avatar}>
                <img src={item.avatar ? item.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'} alt="" />
              </div>
              <p>{item.username.length > 8 ? `${item.username.slice(0, 8)}...` : item.username}</p>
            </div>
          ))
          :
          null
        }
        {
          active ?
          <WatchStories
            item={stories.reverse()}
            setStories={setStories}
            setActive={setActive}
            setRefresh={setRefresh}
            refresh={refresh}
          />
          : 
          null
        }
      </div>
    </div>
  )
}

export default Stories