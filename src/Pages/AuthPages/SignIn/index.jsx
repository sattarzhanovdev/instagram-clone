import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../API'
import cls from './SignIn.module.scss'

const SignIn = () => {
  const [showActive, setShowActive] = React.useState(false)
  const [error, setError] = React.useState('')
  const [refresh, setRefresh] = React.useState(null)

  const Navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  React.useEffect(() => {
    accessToken ? Navigate('/') : Navigate('/signIn')
  }, [refresh])

  const {
    handleSubmit,
    register, 
    reset, 
  } = useForm() 

  function handleSignIn (data) {
    if(data){
      API.login(data)
        .then(res => {
          const data = res.data
          localStorage.setItem('accessToken', data.access)
          localStorage.setItem('refreshToken', data.refresh)
          if(data.access){
            setError('Успешно!')
          }
          setTimeout(() => {
            setRefresh('REFRESH!')
          }, 1000);
        })
        .catch(e => setError(e.response.data.detail))

      API.getUser(data.username)
        .then(res => localStorage.setItem('user', JSON.stringify(res.data[0])))
    }
    reset()
  }

  return (
    <div className={cls.signIn_container}>
      <div className={cls.signIn}>
        <div className={cls.left}>
          <img 
            src={`img/screenshot1.png`}
            alt='photo'
          />
        </div>
        <div className={cls.right}>
          <div className={cls.logo}></div>
          <form onSubmit={handleSubmit(data => handleSignIn(data))}>
            <div>
              <input 
                type="text"
                placeholder='Phone number, username, or email'  
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
            <p 
              className={error === 'Успешно!' ? cls.success : cls.error}
            >
              {error && error}
            </p>
          </form>
          <div className={cls.or}>
            <span></span>
            <p>OR</p>
            <span></span>
          </div>
          <div className={cls.forgot}>
            <p>
              <Link to={'/forgot'}>
                Forgot password?
              </Link>
            </p>
          </div>
          <div className={cls.account}>
            <p>
              Don't have an account?
              <Link to={'/signUp'}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn