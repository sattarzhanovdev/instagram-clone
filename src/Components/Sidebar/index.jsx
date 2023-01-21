import React from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../API'
import { sidebarDesktop_list, sidebarPhone_list } from '../../Utils'
import AddPost from '../AddPost'
import SearchBar from '../SearchBar'
import cls from './Sidebar.module.scss'

const SideBar = () => {
  const [ searchBarActive, setSearchBarActive ] = React.useState('')
  const [ active, setActive ] = React.useState(1)
  const [ activePost, setActivePost ] = React.useState(0)
  
  const user = JSON.parse(localStorage.getItem('user'))

  React.useEffect(() =>{ 
    API.getUser(user?.username)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
      })
  }, [])
  
  return (
    <div className={cls.sideBar_container}>
      <div className={cls.sideBar_desk}>
        <div className={cls.logo}>
          <li>
            <Link to={'/'}>
              <img 
                src="/img/icons/instagram.png" 
                alt="instagram" 
              />
            </Link>
          </li>
        </div>
        <ul className={cls.list}>
          {
            sidebarDesktop_list.map(item => (
              <li 
                key={item.id}
                className={item.id === active ? cls.active : null}
                onClick={() => {
                  setActive(item.id)
                  setSearchBarActive(item.title)
                  setActivePost(item.id)
                }}
              >
                <Link to={item.path}>
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                  /> 
                  {
                    searchBarActive === 'Search' ? '' : <span>{item.title}</span>
                  }
                </Link>
              </li>
            ))
          }
          <div className={cls.profile}>
            <li 
              onClick={() => setActive(8)}
              className={active === 8 ? cls.active : null}
            >
              <Link to={'/profile'}>
                <img 
                  src={user?.avatar !== null || undefined ? user.avatar : "https://i0.wp.com/alternative.me/images/avatars/default.png"}
                  alt="" 
                />
                <span>Profile</span>
              </Link>
            </li>
          </div>
        </ul>
        <ul className={cls.bars}>
          <li>
            <svg aria-label="Settings" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>

            <span>More</span>
          </li>
        </ul>
      </div>
      <div className={cls.sideBar_phone}>
        {
          sidebarPhone_list.map(item => (
            <li 
              key={item.id}
              className={item.id === active ? cls.active : null}
              onClick={() => setActive(item.id)}
            
            >
              <Link to={item.path}>
                <img 
                  src={item.icon} 
                  alt={item.title} 
                /> 
              </Link>
            </li>
          ))
        }
        <div className={cls.profile}>
          <li>
            <Link to={'/profile'}>
              <img 
                src={user?.avatar !== null || undefined ? user.avatar : "https://i0.wp.com/alternative.me/images/avatars/default.png"}
                alt="" 
              />
            </Link>
          </li>
        </div>
      </div>

      <SearchBar 
        searchBarActive={searchBarActive}
      />

      {activePost === 6 ? <AddPost active={activePost} setActive={setActivePost} /> : null}

    </div>
  )
}

export default SideBar