import react, { useState, useEffect } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Job from './jobs/job'
import PublicJob from './publicjob'

const Home = () => {
   

    const [state, setState] = useState([])

    const addJobs = (NewJob) => {
        setState((prevJobs) => {
            return [...prevJobs, NewJob]
        })
    }


    useEffect(() => {
        axios.get('http://localhost:7000/api/v1')
            .then((response) => {
                // console.log(response)
                // console.log(response.data.jobs)
                console.log('testing 0')
                let job = response.data.jobs

                console.log(job)

                job.map((item) => {

                    var jobDetail= {
                        company:'',
                        position:''
                    }
                    
                    jobDetail.company = item.company
                    jobDetail.position = item.position

                    addJobs(jobDetail)
                 

                })

            })
            .catch((error) => console.error(error))
    }, [])

    console.log('testing 1')
    console.log(state)

    return (<div>
        <header className ='publicheader'>
            <Link to='./login'><button>Log In</button></Link>
        </header>
       
        {
            state.map(item => {
                return (
                    <PublicJob
                        company={item.company}
                        position={item.position}
                    />
                    )
            })
        }

    </div>)
}

export default Home



