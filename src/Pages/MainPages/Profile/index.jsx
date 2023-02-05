import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../API'
import Subscribers from '../../../Components/Subscribers'
import Subscriptions from '../../../Components/Subscriptions'
import cls from './Profile.module.scss'

const Profile = () => {
  const [ posts, setPosts ] = React.useState(null)
  const [ saves, setSaves ] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState(null)
  const [ more_active, setMore_active ] = React.useState(false)
  const [ subSideActive, setSubSideActive ] = React.useState(false)
  const [ subrsSideActive, setSubrsSideActive ] = React.useState(false)
  const [ active_filter, setActive_filter ] = React.useState('posts')

  const user = JSON.parse(localStorage.getItem('user'))
  const accessToken = localStorage.getItem('accessToken')

  const Navigate = useNavigate()

  const edit = (file) => {
    const formData = new FormData()
    formData.append('username', 'sattarzanov')
    formData.append('first_name', user?.first_name)
    formData.append('last_name', user?.last_name)
    formData.append('bio', user?.bio)
    formData.append('email', user?.email)
    formData.append('avatar', file)
    API.editUser(accessToken, user?.id, formData)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user.data))
      })

    setRefresh('refreshing!')
    
  }
  

  const getUser = async () => {
    await API.getUsersPosts(user?.id)
      .then(res => {
        setPosts(res.data.reverse())
    })
  }

  React.useEffect(() => {
    getUser()
    
    let savedPosts = []
    API.getSaves(accessToken, user?.id)
      .then(saves => {
        API.getPosts(accessToken)
          .then(res => {
            res.data.map(item => {
              return saves.data?.map(save => {
                return save.post === item.id ? savedPosts.push(item) : null
              })
            })
            setSaves(savedPosts.reverse())
          })
      })
  }, [refresh])



  return (
    <div className={cls.profile_container}>
      <div className={cls.profile}>
        <div className={cls.profile_info}>
          <div className={cls.up_profile}>
            <div className={cls.left_profile}>
              <input 
                type="file" 
                id='select'
                onChange={e => edit(e.target.files[0])}
              />
              <label htmlFor="select">
                <img 
                  src={user?.avatar ? user.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'}
                  alt="profile" 
                />
              </label>
            </div>
            <div className={cls.right_profile}>
              <div className={cls.user}>
                <h3>{user?.username}</h3>
              </div>
              <div className={cls.followers}>
                <p
                  onClick={() => setSubrsSideActive(true)}
                >
                  <span>{user?.subscribers}</span> followers
                </p>
                <p
                  onClick={() => setSubSideActive(true)}
                >
                  <span>{user?.subscriptions}</span> following
                </p>
              </div>
            </div>
            <div className={cls.more}>
              <li
                onClick={() => setMore_active(!more_active)}
              >
                <BiDotsHorizontalRounded />
              </li>
            </div>

            {
              more_active ?
              <div className={cls.side_more}>
                <div className={cls.close}>
                  <li
                    onClick={() => setMore_active(false)}
                  >
                    <AiOutlineClose />
                  </li>
                </div>
                <button
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                >
                  Log out
                </button>
                <button
                  onClick={() => Navigate('/editProfile/')}
                >
                  Edit profile
                </button>
                <button>
                  Delete account
                </button>
              </div> :
              null
            }
          </div>
          <div className={cls.down_profile}>
            <div className={cls.bio}>
              <p>
                {user?.bio}
              </p>
            </div>
          </div>
        </div>
        <div className={cls.users_posts}>
          <div className={cls.filteration}>
            <p
              className={active_filter === 'posts' ? cls.active : ''}
              onClick={() => setActive_filter('posts')}
            >
              Posts
            </p>
            <p
              className={active_filter === 'saved' ? cls.active : ''}
              onClick={() => setActive_filter('saved')}
            >
              Saved
            </p>
          </div>
          {
            active_filter === 'posts' ?
            <div className={cls.posts}>
              {
                posts?.length === 0 ?
                <h3>
                  NO POSTS
                </h3>
                :
                posts?.map(item => (
                  <div className={cls.post}> 
                    <Link 
                      to={`/p/${item.id}`}
                      onClick={() => localStorage.setItem('userId', user?.id)}
                    >
                      <img 
                        src={item.post_images[0]?.image ? `https://cryxxxen.pythonanywhere.com${item.post_images[0]?.image}` : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'}
                        alt={item.title}
                      /> 
                    </Link >
                  </div>
                )) 
              }
            </div> :
            <div className={cls.posts}>
              {
                saves?.length === 0 ?
                <h3>
                  NO SAVED POSTS
                </h3>
                :
                saves?.map(item => (
                  <div className={cls.post}> 
                    <Link 
                      to={`/p/${item.id}`}
                      onClick={() => localStorage.setItem('userId', user?.id)}
                    >
                      <img 
                        src={item.post_images[0]?.image ? item.post_images[0]?.image : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'}
                        alt={item?.title}
                      /> 
                    </Link >
                  </div>
                ))
              }
            </div>
          }
        </div>
      </div>
      {subSideActive ? <Subscriptions setActive={setSubSideActive}/> : null}
      {subrsSideActive ? <Subscribers setActive={setSubrsSideActive}/> : null}
    </div>
  )
}

export default Profile