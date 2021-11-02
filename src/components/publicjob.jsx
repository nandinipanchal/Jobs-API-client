
const PublicJob =(props) =>{
return (<div>
    <div className="jobdiv clearfix">
            <h3>Company : {props.company}</h3>
            <h3>Position :{props.position}</h3>
    </div>
</div>)
}

export default PublicJob