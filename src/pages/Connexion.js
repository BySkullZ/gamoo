import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import oeil_ouvert from "../images/oeil_ouvert.png"
import oeil_ferme from "../images/oeil_ferme.png"

function Connexion() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [state, setState] = useState({mail_user: "", password_user: ""});
    const [showPassword, setShowPassword] = useState(false);

    async function logIn() {
        const res = await axios.post(`http://gamoo.alwaysdata.net/user/`, {mail_user: state["mail_user"], password_user: state["password_user"]});
        if (res.data.length > 0) {
            localStorage.setItem("userId", res.data[0].id_user)
            navigate(`/`);
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect.")
        }
    }

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function handleClick(){
        if(!showPassword) {
            document.getElementById("password").setAttribute("type", "text");
        }
        else{
            document.getElementById("password").setAttribute("type", "password");
        }
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <Navbar/>
            <div className="mh-100">
                <div className="card w-25 position-absolute mx-auto translate-middle top-50 start-50">
                    <span className="text-decoration-underline mx-auto mt-2"><h1>CONNEXION</h1></span>
                    {/* ajouter le span underline sur le css */}
                    <span className="text-decoration-underline mx-auto"><h3>Mail*</h3></span>
                    <div className="input-group mb-3">
                        <input onChange={handleChange} className="mx-auto" type="email" id="mail" name="mail_user" required/>
                    </div>
                    <span className="text-decoration-underline mx-auto"><h3>Mot de passe*</h3></span>
                    <div className="input-group mb-3">
                        <input onChange={handleChange} className="ms-auto" type="password" id="password" name="password_user" minLength="8" required/>
                        <img className="me-auto" src={showPassword ? oeil_ferme : oeil_ouvert} id="eye" onClick={handleClick}/>
                    </div>
                    <button onClick={logIn} className="btn btn-secondary w-50 mx-auto mb-3" type="submit">Connexion</button>
                    {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Connexion;