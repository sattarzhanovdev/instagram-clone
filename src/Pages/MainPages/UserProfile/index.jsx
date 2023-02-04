import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../API'
import UsersFollowers from '../../../Components/UsersFollowers'
import cls from './UserProfile.module.scss'

const UserProfile = () => {
  const { username } = useParams()
  const [ user, setUser ] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState(null)
  const [ posts, setPost ] = React.useState(null)
  const [ subscriptionsActive, setSubscriptionsActive ] = React.useState(null)
  const [ subscriptions, setSubscriptions ] = React.useState(null)

  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const Navigate = useNavigate()

  React.useEffect(() => {
    if(username === currentUser.username) {
      Navigate('/profile')
    }

    API.getUser(username)
      .then(res => {
        setUser(res.data[0])
        setTimeout(() => {
          API.getUsersPosts(res.data[0].id)
          .then(res => {
            setPost(res.data)
          })
        }, 1000)

      API.getUsersSubscriptions(currentUser?.id)
        .then(res => res.data.filter(item => {
          if(item.to_user === user?.id){
            setSubscriptions(item)
            setSubscriptionsActive(true)
          }
        }))
      })
    
      setTimeout(() => {
        setRefresh(`refresh!`)
      }, 1000)
  }, [refresh, username])

  const unfollow = (id) => {
    API.unfollow(accessToken, id)
    setRefresh('unfollowed yuhu!')
    setTimeout(() => {
      setSubscriptions(false)
    }, 1000)
  }

  const follow = (id) => {
    API.follow(accessToken, {to_user: id})
    setRefresh('followed yuhu!')
  }

  return (
    <div className={cls.profile_container}>
      <div className={cls.profile}>
        <div className={cls.profile_info}>
          <div className={cls.up_profile}>
            <div className={cls.left_profile}>
              <img
                src={user?.avatar ? user.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'}
                alt="profile"
              />
            </div>
            <div className={cls.right_profile}>
              <div className={cls.user}>
                <h3>{user?.username}</h3>
                {
                  subscriptions ?
                  <button
                    onClick={() => {
                      unfollow(subscriptions?.id) 
                      setRefresh('UPDATE')
                    }}
                    className={cls.unfollow}  
                  >
                    Unfollow
                  </button> :
                  <button
                    onClick={() => {
                      follow(user?.id) 
                      setRefresh('UPDATE')
                    }}
                  >
                    Follow
                  </button> 
                }
              </div>
              <div className={cls.followers}>
                <p><span>{user?.subscribers}</span> followers</p>
                <p><span>{user?.subscriptions}</span> following</p>
              </div>
            </div>
          </div>
          <div className={cls.down_profile}>
            <div className={cls.bio}>
              <p>
                {user?.bio}
              </p>
            </div>
          </div>
        </div>
        <div className={cls.posts}>
          {
            posts?.length === 0 ?
              <h3>
                NO POSTS
              </h3>:
              posts?.length !== 0 ?
              posts?.map(item => (
                <div className={cls.post}>
                  {
                    item.post_images.map(val => (
                      <Link 
                        to={`/p/${item.id}`}
                        onClick={() => localStorage.setItem('userId', user?.id)}
                      >
                        <img 
                          src={`https://cryxxxen.pythonanywhere.com${val.image}`}
                          alt={item.title}
                        /> 
                      </Link>
                    ))
                  }
                </div>
              )) :
              console.log(user)
          }
        </div>
      </div>

      <UsersFollowers 
        item={user}
      />
    </div>
  )
}

export default UserProfile