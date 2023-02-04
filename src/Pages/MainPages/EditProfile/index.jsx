import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../API'
import cls from './Profile.module.scss'

const EditProfile = () => {
  const [ posts, setPosts ] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState(null)
  const [ file, setFile ] = React.useState(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const accessToken = localStorage.getItem('accessToken')

  const Navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const edit = (data) => {
    const formData = new FormData()
    formData.append('username', data?.username ? data?.username : user?.username)
    formData.append('first_name', data?.first_name ? data.first_name : user?.first_name)
    formData.append('last_name', data?.last_name ? data.last_name : user?.last_name)
    formData.append('bio', data?.bio ? data.bio : user?.bio)
    formData.append('email', data?.email ? data.email : user?.email)
    if(file !== null){
      formData.append('avatar', file) 
    }
    API.editUser(accessToken, user?.id, formData)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user.data))
      })

    setRefresh('refreshing!' + Math.random(0, 10))
    Navigate('/profile')
    reset()
    
  }

  const getUser = async () => {
    await API.getUsersPosts(user?.id)
      .then(res => {
        setPosts(res.data)
    })
  }

  React.useEffect(() => {
    getUser()
  }, [refresh])

  return (
    <div className={cls.profile_container}>
      <form 
        className={cls.profile}
        onSubmit={handleSubmit(data => edit(data))}
      >
        <div className={cls.profile_info}>
          <div className={cls.up_profile}>
            <div className={cls.left_profile}>
              <input 
                type="file" 
                id='select'
                onChange={e => setFile(e.target.files[0])}
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
                <input 
                  defaultValue={user?.username}
                  placeholder={'Ваш username'}
                  {...register('username')}
                />
              </div>
              <div className={cls.followers}>
                <p><span>{user?.subscribers}</span> followers</p>
                <p><span>{user?.subscriptions}</span> following</p>
              </div>
            </div>
          </div>
          <div className={cls.down_profile}>
            <div className={cls.bio}>
              <textarea
                placeholder='Ваш bio'
                defaultValue={user?.bio}
                {...register('bio')}
              ></textarea>
            </div>
            <button>
              Complete
            </button>
          </div>
        </div>
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
                      {
                        val.image?.slice(val.image?.length - 4) === '.png' && '.jpg' ? 
                        <img 
                          src={`https://cryxxxen.pythonanywhere.com${val.image}`}
                        /> :
                        val.image?.slice(val.image.length - 5) === '.jpeg' ?
                        <img 
                          src={`https://cryxxxen.pythonanywhere.com${val.image}`}
                        /> : 
                        val.image?.slice(val.image?.length - 4) === '.mp4' && '.mov' ?   
                        <video controls>
                          <source src={`https://cryxxxen.pythonanywhere.com${val.image}`}/>
                        </video>
                        :
                        <img 
                          src={`https://cryxxxen.pythonanywhere.com${val.image}`}
                          alt={''}
                        />
                      }
                    </Link >
                  ))
                }
              </div>
            )) 
          }
        </div>
      </form>
    </div>
  )
}

export default EditProfile