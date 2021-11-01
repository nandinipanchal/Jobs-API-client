import '../../index.css'

const Job =(props)=>{
    return (<div>
        <div className="jobdiv">
            <h3>{props.company}</h3>
            <h3>{props.position}</h3>
        </div>
    </div>
        )
}

export default Job