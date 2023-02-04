import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../API'
import cls from './Profile.module.scss'

const Profile = () => {
  const [ posts, setPosts ] = React.useState(null)
  const [ saves, setSaves ] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState(null)
  const [ more_active, setMore_active ] = React.useState(false)
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
        setPosts(res.data)
    })
  }

  React.useEffect(() => {
    getUser()

    API.getSaves(accessToken, user?.id)
      .then(res => setSaves(res.data))
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
                <p><span>{user?.subscribers}</span> followers</p>
                <p><span>{user?.subscriptions}</span> following</p>
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
                        </Link >
                      ))
                    }
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
                posts?.map(post => (
                  saves?.map(save => (
                    <div className={cls.post}> 
                      {
                        post.id === save.post ?
                        (
                          post.post_images.length !== 0 ? 
                          post.post_images?.map(val => (
                            <Link 
                              to={`/p/${post.id}`}
                              onClick={() => localStorage.setItem('userId', user?.id)}
                            >
                              <img 
                                src={
                                  val.image ?
                                  `https://cryxxxen.pythonanywhere.com${val.image}`
                                  :
                                  'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg' 
                                }
                                alt={post.title} 
                              
                              /> 
                            </Link>
                          ))
                          :
                          <Link 
                            to={`/p/${post.id}`}
                            onClick={() => localStorage.setItem('userId', user?.id)}
                          >
                            <img 
                              src={
                                'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg' 
                              }
                              alt={post.title} 
                            
                            /> 
                          </Link>
                        )
                        :
                        null
                      }
                    </div>
                  ))
                )) 
              }
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile