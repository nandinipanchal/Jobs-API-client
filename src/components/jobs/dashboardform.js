import { useState, useEffect } from 'react'
import { getUser, getToken , removeUserSession} from '../../common'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Dashboardform = (props) => {
    const [jobstate, setJobState] = useState({
        cname: '',
        pname: ''
    })

    const user = getUser()
    const token = getToken()
    console.log(user, token)

    const history = useHistory()

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    useEffect(() => {
        showjobs() 
    }, [])

    const showjobs = () =>{
        axios.get('http://localhost:7000/api/v1/job')
        .then(res => {
            console.log(res.data.jobs)
            let job = []
            job = res.data.jobs
            job.map((item) => {
                
                var jobvar ={
                    cname :'',
                    pname :'',
                    jobId :''
                }
                jobvar.cname = item.company
                jobvar.pname = item.position
                jobvar.jobId = item._id

                props.onAdd(jobvar)

            })
            console.log('job list', job)
      
        })
        .catch(error => console.log(error))
    }
   

    const Handlechange = (e) => {
        const { name, value } = e.target
        setJobState((prevJobState) => {
            return {
                ...prevJobState, [name]: value
            }
        })
    }

    const { cname, pname } = jobstate

    const Handlesubmit = (e) => {
        if (cname === '' || pname === '') {
            console.log('Please fill all credentials')
        }
        else {
            axios.post('http://localhost:7000/api/v1/job', {
                company: cname,
                position: pname
            })
                .then(res => {
                    console.log('success')
                    showjobs()
                })
                .catch(err => console.log(err))
            props.onAdd(jobstate)
            setJobState({
                cname: '',
                pname: ''
            })
        }

        e.preventDefault()

    }

    const HandlelogOut = () =>{
        console.log('log out')
        removeUserSession()
        history.push('/home')

    }

    return (
        <div>
            <header>
                <div className="main-nav clearfix">
                    <nav>
                        <div class="dash">Dashboard</div>
                        <ul>
                            <li className="logout" onClick={HandlelogOut}>Log Out</li>
                            <li>Hello, {user.name}</li>

                        </ul>
                    </nav>
                </div>
            </header>
            <section>
                <div className="jobs-main">
                    <form className="job-form">
                        <p><input className="company" type="text" name="cname" placeholder="Company Name " onChange={Handlechange}></input></p>
                        <p><input className="position" type="text" name="pname" placeholder="Position" onChange={Handlechange}></input></p>
                        <p id="status">Status :<select className="status">
                            <option>Interview</option>
                            <option>Declined</option>
                            <option>Pending</option>
                        </select></p>
                        {/* <p>Private<input type="checkbox" value="private"></input></p>
                        <p>Public<input type="checkbox" value="public"></input></p> */}
                        <button className="jobs-button" onClick={Handlesubmit}>Create Job</button>
                    </form>
                </div>
            </section>
            
        </div>
    )
}

export default Dashboardform



