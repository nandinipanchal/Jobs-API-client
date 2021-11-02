import react, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../index.css'
import axios from 'axios'
import {setUserSession} from '../common'

const Register = () => {
    var msg =''
    const [registerstate, setRegisterState] = useState({
        name: '',
        mail: '',
        pass: '',
    })

    const { name, mail, pass } = registerstate

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterState((prevState) => {
            return {
                ...prevState, [name]: value
            }
        })
    }


    const submitBtn = (e) => {
        console.log('clicked')
        e.preventDefault()
        setRegisterState({ ...registerstate, error: false })
        if (name === '' || mail === '' || pass === '') {
            console.log('missing')
            msg ='Please fill all the credentials'
        }
        else {
            axios.post('http://localhost:7000/api/v1/user/register',{
                name : name ,
                email : mail,
                password : pass
            })
            .then(res=>{
                console.log('registration successful')
                msg =' Registration Successful'
            })
            .catch(error => console.error(error))
        }
    }

    return (
        <div className="main">
            <form className="register-from">
                <p><input type="text" className="register-name" id="namefield" placeholder="Name" name="name" onChange={handleChange}></input></p>
                <p> <input type="text" className="register-mail" placeholder="Email" name="mail" onChange={handleChange}></input></p>
                <p> <input type="password" className="register-pass" placeholder="Password" name="pass" onChange={handleChange}></input></p>
                <button onClick={submitBtn}>Register</button>
                <p className="result">Already registerd? <Link to="./login">Login here</Link></p>
                <p className="error">{msg}</p>
            </form>
        </div>
    )
}

export default Register