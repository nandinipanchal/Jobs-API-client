import react, { useEffect, useState } from 'react'
import { Link} from "react-router-dom";
import '../index.css'

const Register = () => {
    const [registerstate, setRegisterState] = useState({
        name : " ",
        mail : " ",
        pass : " ",
    })

    useEffect (()=>{
        getRegistered()       
    },[])

    const {name, mail,pass} = registerstate

    const getRegistered =()=>{
        fetch('http://localhost:7000/api/v1/user/register',{
            'method':'POST',
            'body':JSON.stringify({
                name : name,
                email : mail,
                password : pass
            })
        })
        .then(res => res.json())
        .then((res) => console.log(res))
        .catch((error)=> console.log('Cant register user',error))
    }

    const handleChange = (e) =>{
        const {name,value }= e.target
        setRegisterState((prevState)=>{
            return {
                ...prevState, [name] :value
            }
        })
    }
   

    const submitBtn = (e)=>{
        console.log('clicked')
        e.preventDefault()
        setRegisterState({...registerstate,error:false})
        console.log(registerstate)
        if(name === ' ' || mail === ' ' || pass===' '){
            console.log('missing')
        }
        else{
            getRegistered()
        }
      
    }

    return (
        <div className="main">
            <form className="register-from">
                <p><input type="text" className="register-name" id="namefield" placeholder="Name" name="name" onChange={handleChange}></input></p>
                <p> <input type="text" className="register-mail" placeholder="Email" name="mail" onChange={handleChange}></input></p>
                <p> <input type="password" className="register-pass" placeholder="Password" name="pass" onChange={handleChange}></input></p>
                <button onClick={submitBtn}>Register</button>
                <p className="result">Already registerd? <Link to ="./login">Login here</Link></p>
            </form>
        </div>
    )
}

export default Register