import Navbar from "./Navbar";

function Messagerie() {
    return (
        <div>
            <Navbar/>
            <div className="vh-100">
                <div className="row">
                    <div className="col-3">
                        <ul>
                            <li>Youssouf</li>
                            <li>Madre mia</li>
                        </ul>
                    </div>
                    <div className="col-7">
                        <ul>
                            <li>Salut</li>
                            <li>Salut</li>
                            <li>Comment ca va</li>
                        </ul>
                        <div className="input-group">
                            <textarea type="text" className="form-control" placeholder="Message" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messagerie;