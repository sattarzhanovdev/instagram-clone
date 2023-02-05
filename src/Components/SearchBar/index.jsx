import React from 'react'
import { AiFillCloseCircle, AiFillCloseSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { API } from '../../API'
import cls from './Search.module.scss'

const SearchBar = ({searchBarActive, setSearchBarActive}) => {
  const [ users, setUsers ] = React.useState(null)
  const [ inp, setInp ] = React.useState('')

  React.useEffect(() => {
    API.getUsers()
      .then(res => setUsers(res.data))
  }, [])

  const searchedBase = users?.filter(item => item.username.includes(inp.toLowerCase()))

  return (
    <div className={searchBarActive === 'Search' ? cls.search_active : cls.search_none}>
      <h3>Search</h3>
      <div className={cls.inp}>
        <input 
          type="text"
          placeholder='Search'  
          onChange={e => setInp(e.target.value)}
        />
      </div>
      <div className={cls.results}>
        {
          searchedBase ?
          searchedBase.map(item => (
            <Link 
              to={`/profile/${item.id}`}
              onClick={() => setSearchBarActive(false)}
            >
              <div>
                <img 
                  src={item.avatar ? item.avatar : 'https://i0.wp.com/alternative.me/images/avatars/default.png'} 
                  alt="profile" 
                />
                <div className={cls.bio}>
                  <li>{item.username}</li>
                  <p>{item.bio}</p>
                </div>
              </div>
            </Link>
          ))
          :
          null
        }
      </div>
    </div>
  )
}

export default SearchBar