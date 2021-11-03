import react, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../index.css'
import {setUserSession} from '../common'
import axios from 'axios'

const Login = () => {
  const [state, setState] = useState({
    mail: '',
    pass: '',
  })

  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => {
      return {
        ...prevState, [name]: value
      }
    })
  }

  const { mail, pass } = state

  const submitEvent = (e) => {
    e.preventDefault();
    setState({ ...state, error: false })
    console.log(state)
    if (mail === '' || pass === '') {
      console.log('missing values')

    }
    else {
      axios.post('http://localhost:7000/api/v1/user/login',{
        email : mail,
        password : pass
      })
      .then( res=>{
        setUserSession(res.data.token , res.data.user)
        console.log('Log in Sucessful')
        console.log(res.data.user)
        history.push('/dashboard')
      })
      .catch(err => {
        console.error(err)
      })
    }

  }


  return (
    <div className="main">
      <form className="login-form">
        <p><input className="user-login" type="text" placeholder="Username" name="mail" onChange={handleChange}></input></p>
        <p><input className="user-pass" type="password" placeholder="Password" name="pass" onChange={handleChange}></input></p>
        <button onClick={submitEvent}>Login</button>
        <p className="result">Not registerd? <Link to="./register" >Register here</Link></p>
      </form>

    </div>
  )
}

export default Login