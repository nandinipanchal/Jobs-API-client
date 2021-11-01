import react, { useEffect, useState } from 'react'
import {Link ,useHistory} from 'react-router-dom'
import '../index.css'

const Login = () => {
  const [ state ,setState] = useState({
    mail : " ",
    pass : " ",
  })

  useEffect(()=>{
      getLoggedin()
  },[])

  const getLoggedin =()=>{
    fetch('http://localhost:7000/api/v1/user/login',{
      'method':'POST',
       'body' : JSON.stringify({
         email : state.mail,
         password : state.pass
       })
    })
    .then((res)=> res.json())
    .then((res) => console.log(res))
    .catch((error)=> console.error(error))
  }

  const handleChange = (e)=>{
    const {name, value} = e.target
    setState((prevState)=>{
      return{
        ...prevState, [name] : value
      }
    })
  }

  const {mail,pass} = state

  const submitEvent =(e)=>{
    e.preventDefault();
    setState({...state,error:false})
    console.log(state)
    if(mail === ' ' || pass=== ' '){
      console.log('missing values')
     
    }
    else{
      getLoggedin()
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