import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { API } from '../../API'
import cls from './Subscriptions.module.scss'

const Subscribers = ({setActive}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [ subscribers, setSubscribers ] = React.useState(null)
  const [ allUsers, setAllUsers ] = React.useState(null)

  React.useEffect(() => {
    API.getUsersSubscribers(user?.id)
      .then(res => setSubscribers(res.data))

    API.getUsers()
      .then(res => setAllUsers(res.data))
  }, [])
  return (
    <div className={cls.subscriptions_container}>
      <div className={cls.subscriptions}>
        <div className={cls.close}>
          <li onClick={() => setActive(false)}>
            <AiOutlineClose />
          </li>
        </div>
        {
          allUsers?.map(users => (
            subscribers?.map(subs => (
              users.id === subs.from_user ? 
              <Link 
                to={`/profile/${users?.id}/`}
                className={cls.user}
              >
                <img src={users.avatar} alt="" />
                <p>{users?.username}</p>
              </Link>
              :
              null
            ))
          ))
        }
      </div>
    </div>
  )
}

export default Subscribers