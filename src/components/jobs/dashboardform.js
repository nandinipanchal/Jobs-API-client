import react, { useState } from 'react'

const Dashboardform = (props) => {
    const [jobstate , setJobState] = useState({
        cname : "",
        pname : ""
    })

    const Handlechange = (e)=>{
        const {name,value}=e.target
        setJobState((prevJobState) =>{
            return {
                ...prevJobState , [name] : value
            }
        })
    }

    const {cname , pname} =jobstate

    const Handlesubmit =(e)=>{
        if( cname === "" || pname=== ""){
            console.log('Please fill all credentials')
        }
        else{
            props.onAdd(jobstate)
            setJobState({
            cname :"",
            pname :""
        })
        }
        
        e.preventDefault()
        
    }

    return (
        <div>
            <header>
                <div className="main-nav clearfix">
                    <nav>
                        <div class="dash">Dashboard</div>
                        <ul>
                            <li>Log Out</li>
                            <li>Hello, user</li>

                        </ul>
                    </nav>
                </div>
            </header>
            <section>
                <div className="jobs-main">
                    <form className="job-form">
                        <p><input className="company" type="text" value={jobstate.cname} name="cname" placeholder="Company Name " onChange={Handlechange}></input></p>
                        <p><input className="position" type="text" value={jobstate.pname} name="pname" placeholder="Position" onChange={Handlechange}></input></p>
                        <p id="status">Status :<select className="status">
                            <option>Interview</option>
                            <option>Declined</option>
                            <option>Pending</option>
                        </select></p>
                        <button className="jobs-button" onClick={Handlesubmit}>Create Job</button>
                    </form>
                </div>
            </section>
            <section className="show-jobs">
                <div className="show"> </div>
            </section>
        </div>
    )
}

export default Dashboardform