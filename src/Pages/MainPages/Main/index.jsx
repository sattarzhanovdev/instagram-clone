import React from 'react'
import { API } from '../../../API'
import Navbar from '../../../Components/Navbar'
import Posts from '../../../Components/Posts'
import Stories from '../../../Components/Stories'
import cls from './Main.module.scss'

const Main = () => {
  const [ refresh, setRefresh ] = React.useState(0)
  const refreshToken = localStorage.getItem('refreshToken')

  React.useEffect(() => {
    API.refreshToken({refresh: refreshToken})
      .then(r => localStorage.setItem('accessToken', r.data.access))

      setTimeout(() => {
        setRefresh(refresh + 1)
      }, 60000)
  }, [refresh])

  return (
    <div className={cls.main}>
      <Navbar />
      <div className={cls.left}>
        <Stories />
        <Posts />
      </div>
    </div>
  )
}

export default Main