import React, { useState, useContext } from 'react'
import ErrorMessage from './ErrorMessage'
import useErrorHandler from '../utils/custom-hooks/ErrorHandler'
import { apiRequest, validateLoginForm } from '../utils/Helpers'
import { authContext } from "../contexts/AuthContext"
import '../App.css';

const LogInForm = () => {

  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useContext(authContext)
  const { error, showError } = useErrorHandler(null)

  const authHandler = async () => {
    try {
      setLoading(true)
      const userData = await apiRequest(
        "/.netlify/functions/user-login",
        "post",
        { username: userName, password: userPassword }
      )
      setLoading(false)
      const { id, name } = userData
      auth.setAuthStatus({ id, name })
    } catch (err) {
      setLoading(false)
      showError(err.message)
    }
  }

  return (
      <form onSubmit={e => {
        e.preventDefault()
        if (validateLoginForm(userName, userPassword, showError)) {
          authHandler()
        }
      }}>
        <h1>Log in to see the lists...</h1>
        <br />
          <input
            type="name"
            name="name"
            value={userName}
            placeholder="Name"
            onChange={e => setUserName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={userPassword}
            placeholder="Password"
            onChange={e => setUserPassword(e.target.value)}
          />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log in"}
        </button>
        <br />
        {error && <ErrorMessage errorMessage={error} />}
    </form>
  )
}

export default LogInForm