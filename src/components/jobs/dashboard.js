import react, { useState } from 'react'
import Dashboardform from './dashboardform'
import Job from './job'
import ReactPaginate from 'react-paginate'

const Dashboard = () => {
    const [jobs, setJobs] = useState([])
    const [pageNumber, setPageNUmber] = useState(0)


    const addJobs = (NewJob) => {
        setJobs((prevJobs) => {
            return [...prevJobs, NewJob]
        })
    }


    const jobperpage = 4
    const pagesVisited = pageNumber * jobperpage

    const DisplayJobs = jobs
        .slice(pagesVisited, pagesVisited + jobperpage)
        .map((jobitem, index) => {
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

        const pagecount = Math.ceil(jobs.length/jobperpage)

        const changePage =({selected})=>{
            setPageNUmber(selected)
        }
    return (<div>
        <Dashboardform onAdd={addJobs} />
        {DisplayJobs}
        <div className="paginate">
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pagecount}
        onPageChange={changePage}
        containerClassName={"paginationbtns"}
        previousLinkClassName={'previousbtn'}
        nextLinkClassName={'nextbtn'}
        disabledClassName={'disable'}
        activeClassName={'active'}
        />
       </div>
    </div>)
}

export default Dashboard