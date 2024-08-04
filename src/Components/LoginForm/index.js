import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSuccessfulLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onFailedLogin = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      onSuccessfulLogin(data.jwt_token)
    } else {
      onFailedLogin(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg">
      <form onSubmit={onSubmitLogin} className="login-form">
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={onChangeUserName}
          value={username}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          onChange={onChangePassword}
          value={password}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg !== '' && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
