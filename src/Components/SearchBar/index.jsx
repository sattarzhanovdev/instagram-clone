import React from 'react'
import { AiFillCloseCircle, AiFillCloseSquare } from 'react-icons/ai'
import cls from './Search.module.scss'

const SearchBar = ({searchBarActive}) => {
  return (
    <div className={searchBarActive === 'Search' ? cls.search_active : cls.search_none}>
      <h3>Search</h3>
      <div className={cls.inp}>
        <input 
          type="text"
          placeholder='Search'  
        />
        <div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar