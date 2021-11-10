import {useRef ,useState, useEffect } from 'react'
import { getUser, getToken , removeUserSession} from '../../common'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Job from './job'

const Dashboardform = (props) => {
    const [jobstate, setJobState] = useState({
        cname: '',
        pname: '',
        searchkey: ''
    })

    const [checkbox , setCheckbox] = useState('private')

    const [selectVal , setSelectVal] = useState('')

    const [pageNumber ,setPageNumber] = useState(1)

    const [limit ,setLimit] = useState(4)

    const [total ,setTotal] = useState(0)
    
    const [jobs, setJobs] = useState([])

    const addJobs = (NewJob) => {
        setJobs((prevJobs) => {
            return [...prevJobs, NewJob]
        })
    }
   
  

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
    },[pageNumber])
   
    const showjobs = () =>{
        let joblimit = limit
        let page = pageNumber
        console.log('page',page)
        console.log('inside showjobs function',joblimit)
        axios.get(`http://localhost:7000/api/v1/job?page=${page}&limit=${joblimit}`)
        .then(res => {
           console.log('server',res.data.results)
           let job = []
            job = res.data.results.results
            let totaljobs = res.data.total
            setTotal(totaljobs)
            console.log('server jobs',totaljobs)
            job.map((item) => {

                var jobvar = {
                    cname: '',
                    pname: '',
                    jobId: '',
                    jobStatus: '',
                  

                }
                jobvar.cname = item.company
                jobvar.pname = item.position
                jobvar.jobId = item._id
                jobvar.jobStatus = item.status
                
                addJobs(jobvar)

                // props.onAdd(jobvar)
              

            })
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

    const { cname, pname , searchkey} = jobstate


    const HandleSearch = () =>{
        console.log(searchkey)
        let keyword = searchkey
        axios.get(`http://localhost:7000/api/v1/job/search/${keyword}`)
        .then( (res)=>{
            console.log('search success')
            console.log(res.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

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
                   
                })
                .catch(err => console.log(err))
            addJobs(jobstate)
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

    const HandleClick = (e) =>{
        console.log('test 1')
        let val = e.target.value
        console.log(val)
        setCheckbox(val)
        console.log('checkbox state :',checkbox)
        
    }

    const HandleSelect =(e) =>{
        let val = e.target.value
        console.log(val)
        setSelectVal(val)
        console.log('select state :',selectVal)
    }

    const HandlejobLimitchange = (e) =>{
        // console.log(e.target.value)
        let val = e.target.value
        setLimit(val) 
    }
   
    const HandlePagination = () =>{
        console.log('inside handlepagination',limit)
        showjobs()
    }

    console.log('total state',total)
    const totalpages = Math.ceil(total/limit)
    const pages = new Array(4).fill(null).map((v,i) => i)
    console.log('page array',pages)
    return (
        <div>
            <header>
                <div className="main-nav clearfix">
                    <nav>
                        <div className="dash">
                        <input type="text" className="search" name="searchkey" onChange={Handlechange} placeholder="Search by company or position"></input>
                        <ion-icon name="search" className="sicon" size="large" onClick={HandleSearch}></ion-icon>
                        <label className="showlabel">Show</label><input type="number" className="limit" min="4" name="joblimit" onChange={HandlejobLimitchange}></input><label className="joblabel">Jobs</label>
                        <label className="gobtn" onClick={HandlePagination}><a>Go</a></label>
                        </div>
                        
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
                        <p id="status">Status :<select className="status" onChange={HandleSelect}>
                            <option value="interview" selected>Interview</option>
                            <option value="declined">Declined</option>
                            <option value="pending">Pending</option>
                        </select></p>
                        <p id="check">Private<input type="checkbox" value="private" onClick={HandleClick}></input>
                        Public<input type="checkbox" value="public"  onClick={HandleClick}></input></p>
                        <button className="jobs-button"  onClick={Handlesubmit}>Create Job</button>
                    </form>
                </div>
            </section>
            <section>
               {
                   jobs.map((jobitem, index) => {
                    return (
                        <Job
                            key={1}
                            id={index}
                            company={jobitem.cname}
                            position={jobitem.pname}
                            jobId={jobitem.jobId}
                            status={jobitem.jobStatus}
                        />
                    )
                })
               }
               <div className="paginate">
               <button>Prev</button>
               {
                  
                   pages.map((pageIndex) =>{
                       return(
                            <button className="paginationsbtns" key={pageIndex} onClick={ () => setPageNumber(pageIndex)}>{pageIndex+1}</button>
                        )
                      
                   })
                   
               }
               <button>Next</button>
               </div>
            </section>
            
        </div>
    )
}

export default Dashboardform




