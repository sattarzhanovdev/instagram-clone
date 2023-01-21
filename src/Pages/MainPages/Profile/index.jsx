import React from 'react'
import { API } from '../../../API'
import cls from './Profile.module.scss'

const Profile = () => {
  const user = localStorage.getItem('user')
  const accessToken = localStorage.getItem('accessToken')

  const edit = (file) => {
    const formData = new FormData()
    formData.append('username', 'sattarzanov')
    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    formData.append('bio', user.bio)
    formData.append('email', 'sattarzanov@gmail.com')
    formData.append('avatar', file)
    API.editUser(accessToken, 24, formData)

    setTimeout(() => {
      API.getUser(user?.username)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data))
          window.location.reload()
        })
    }, 3000)
  }

  return (
    <div className={cls.profile_container}>
      <div className={cls.profile}>
        <input type="file" onChange={e => edit(e.target.files[0])} />
        <button 
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Profile