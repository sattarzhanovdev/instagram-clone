import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../API'
import { sidebarDesktop_list, sidebarPhone_list } from '../../Utils'
import AddPost from '../AddPost'
import SearchBar from '../SearchBar'
import cls from './Sidebar.module.scss'

const SideBar = () => {
  const [ searchBarActive, setSearchBarActive ] = React.useState('')
  const [ active, setActive ] = React.useState(1)
  const [ more_active, setMore_active ] = React.useState(false)
  const [ activePost, setActivePost ] = React.useState(0)
  
  const user = JSON.parse(localStorage.getItem('user'))
  const accessToken = localStorage.getItem('accessToken')
  
  const Navigate = useNavigate()

  const deleteUser = () => {
    let ans = alert("You're actually deleting your account?")
    if(ans){
      API.deleteUser(accessToken, user?.id)
      localStorage.clear()
      window.location.reload()
    }
  }
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
                  src={user?.avatar !== null ? user.avatar : "https://i0.wp.com/alternative.me/images/avatars/default.png"}
                  alt="" 
                />
                {searchBarActive === 'Search' ? null : <span>Profile</span> }
              </Link>
            </li>
          </div>
        </ul>
        <ul className={cls.bars}>
          <li
            onClick={() => setMore_active(!more_active)}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" 
              alt="bars" 
            />
            {searchBarActive === 'Search' ? null : <span>More</span> }
          </li>
        </ul>
      </div>
      <div className={cls.sideBar_phone}>
        {
          sidebarPhone_list.map(item => (
            <li 
              key={item.id}
              className={item.id === active ? cls.active : null}
              onClick={() => {
                setActive(item.id)
                setSearchBarActive(item.title)
              }}
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
                src={user?.avatar !== null ? user.avatar : "https://i0.wp.com/alternative.me/images/avatars/default.png"}
                alt="" 
              />
            </Link>
          </li>
        </div>
      </div>

      <SearchBar 
        searchBarActive={searchBarActive}
        setSearchBarActive={setSearchBarActive}
      />

      {activePost === 6 ? <AddPost active={activePost} setActive={setActivePost} /> : null}

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
          <button
            onClick={() => deleteUser()}
          >
            Delete account
          </button>
        </div>
        : null
      }
    </div>
  )
}

export default SideBar