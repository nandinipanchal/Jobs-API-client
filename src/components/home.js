import react, { useState, useEffect } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Job from './jobs/job'

const Home = () => {
    const [state, setstate] = useState({
        company : '',
        position :''
    })
   

    useEffect(() => {
        axios.get('http://localhost:7000/api/v1')
            .then((response) => {
                console.log(response)
                console.log(response.data.jobs)
                let job = response.data.jobs
          
                job.map((item,index)=>{
                    console.log(item.company)
                    console.log(item.position)

                }) 
        
            }) 
            .catch((error) => console.error(error))
    }, [])

    return (<div>
        <header>
            <Link to='./login'><button>Log In</button></Link>
        </header>
        <h1>This is a home page</h1>
        <p>Company :{state.company}</p>
        <p>Position :{state.position}</p>
    </div>)
}

export default Home

//http://localhost:7000/api/v1

// fetch('http://localhost:7000/api/v1', {
//             method: 'GET'
//           })
//           .then((res) => res.json())
//           .then( (data) => console.log(data ))
//           .catch((error) => {
//             console.error('Error:', error);
//           })