import '../../index.css'

const Job =(props)=>{
    return (<div className="jobdiv-main">
        <div className="jobdiv">
            <h3>Company : {props.company}</h3>
            <h3>Position : {props.position}</h3>
            <p className="edit"><a href="#"><ion-icon  name="create"></ion-icon></a></p>
            <p><a href="#"><ion-icon name="trash"></ion-icon></a></p>
        </div>
    </div>
        )
}

export default Job