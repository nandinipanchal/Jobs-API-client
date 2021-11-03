import '../../index.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {  getToken } from '../../common'

const Job =(props)=>{
    const history = useHistory()

    const token = getToken()

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    const HandleEdit = () =>{
        history.push('/editjob')
    }

    const HandleDelete = () =>{
        
        // axios.delete(`http://localhost:7000/api/v1/jobs/${id}`)
        // .then(console.log('deleted'))
        // .catch(err=> console.log(err))

    }

    return (<div className="jobdiv-main">
        <div className="jobdiv">
            <h3>Company : {props.company}</h3>
            <h3>Position : {props.position}</h3>
            <p className="edit"><a onClick={HandleEdit}><ion-icon  name="create"></ion-icon></a></p>
            <p><a onClick={HandleDelete}><ion-icon name="trash"></ion-icon></a></p>
        </div>
    </div>
        )
}

export default Job