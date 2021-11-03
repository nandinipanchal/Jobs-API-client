
const Editjob = () => {
    return (<div className="jobs-main">
        <form className="job-form">
            <p><input className="company" type="text" name="cname" placeholder="Company Name " ></input></p>
            <p><input className="position" type="text" name="pname" placeholder="Position" ></input></p>
            <p id="status">Status :<select className="status">
                <option>Interview</option>
                <option>Declined</option>
                <option>Pending</option>
            </select></p>
            <button className="jobs-button" >Edit Job</button>
        </form>
    </div>
    )
}

export default Editjob