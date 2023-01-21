import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../API'
import { AiFillFacebook } from 'react-icons/ai'
import cls from './SignUp.module.scss'

const SignUp = () => {
  const [showActive, setShowActive] = React.useState(false)
  const [error, setError] = React.useState('')
  const [fullname, setFullname] = React.useState('')
  const [refresh, setRefresh] = React.useState('')

  const Navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  React.useEffect(() => {
    accessToken ? Navigate('/') : Navigate('/signUp')
  }, [refresh])


  const {
    handleSubmit,
    register, 
    reset, 
  } = useForm() 

  function handleSignUp (data) {
    const names = fullname.split(' ')
    const newData = {
      ...data, 
      first_name: names[0],
      last_name: names[1], 
      bio: 'no bio yet',
      email: '',
      avatar: null  ,
      password_repeat: data.password
    }
    if(newData){
      API.register(newData)
      setError('Success')

      setTimeout(() => {
        API.login({username: data.username, password: data.password})
          .then(res => {
            const data = res.data
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            setRefresh('REFRESH!')
          })
        API.getUser(data.username)
          .then(res => localStorage.setItem('user', JSON.stringify(res.data[0])))
      }, 2000);
    }
    reset()
  }

  return (
    <div className={cls.signIn_container}>
      <div className={cls.signIn}>
        <div className={cls.logo}></div>
        <h4>
          Sign up to see photos and <br />
          videos from your friends.
        </h4>
        <button>
          <span><AiFillFacebook /></span> Log in with Facebook
        </button>
        <div className={cls.or}>
          <span></span>
          <p>OR</p>
          <span></span>
        </div>
        <form onSubmit={handleSubmit(data => handleSignUp(data))}>
          <div>
            <input 
              type="text"
              placeholder='Mobile number or Email'  
              {...register('phone_number')}
            />
          </div>
          <div>
            <input 
              type="text"
              placeholder='Full name'  
              onChange={e => setFullname(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="text"
              placeholder='Username'  
              pattern="^[\w.@+-]+$"
              {...register('username')}
            />
          </div>
          <div>
            <input 
              type={showActive ? "text" : "password"}
              placeholder='Password'  
              {...register('password')}
            />
            <p
              onClick={() => setShowActive(!showActive)}
            >
              {showActive ? 'Hide' : 'Show'}
            </p>
          </div>
          <div>
            <button
              type='submit'
            >
              Log in
            </button>
          </div>
          <p className={cls.error}>{error && error}</p>
        </form>
        <div className={cls.account}>
          <p>
            Have an account?
            <Link to={'/signIn'}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp