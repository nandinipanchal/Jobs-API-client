 import react, { useState } from 'react'
import Dashboardform from './dashboardform'
import Job from './job'

const Dashboard = () => {
    const [jobs, setJobs] = useState([])

    console.log('componet job',jobs)
    const addJobs = (NewJob) => {
        setJobs((prevJobs) => {
            return [...prevJobs, NewJob]
        })
    }

    return (<div>
        <Dashboardform onAdd={addJobs} />
        {jobs.map((jobitem, index) => {
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
    </div>)
}

export default Dashboard