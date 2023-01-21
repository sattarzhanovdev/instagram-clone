import React from 'react'
import AddPost from '../AddPost'
import cls from './Navbar.module.scss'

const Navbar = () => {
  const [active, setActive] = React.useState(false)

  const addPost = (file) => {
    const formData = new FormData()
    formData.append('images', file)
  }
  
  return (
    <div className={cls.navbar_container}>
      <div className={cls.navbar_desk}>

      </div>
      <div className={cls.navbar_phone}>
        <div className={cls.logo}></div>
        <ul className={cls.list}>
          <li
            onClick={() => setActive(true)}
          >
            <img 
              src="/img/icons/Add.png" 
              alt="" 
            />
          </li>
        </ul>
      </div>

      {active ? <AddPost active={active} setActive={setActive} /> : null}
    </div>
  )
}

export default Navbar