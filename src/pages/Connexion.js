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

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            navigate("/");
        }
    });

    async function logIn() {
        const res = await axios.post(`https://gamoo.alwaysdata.net/login/`, state);
        if (res.data.length > 0 && res.data[0].verified === 1) {
            localStorage.setItem("userId", res.data[0].id_user)
            navigate("/");
        } else if (res.data.length > 0 && res.data[0].verified === 0) {
            setError("Compte non validé par mail. Veuillez verifier vos mails !")
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
            <div className="d-flex">
                <div className="connexion-card ms-auto w-50 font-gugi">
                    <div className="bg-light-yellow py-2 mb-4 rounded-2">
                        <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Connexion</h1>
                        {/* ajouter le span underline sur le css */}
                        <h2 className="text-decoration-underline mx-auto fs-3">Mail*</h2>
                        <div className="mb-5">
                            <input onChange={handleChange} className="mail-input" type="email" id="mail" name="mail_user" required/>
                        </div>
                        <h3 className="text-decoration-underline mx-auto fs-3">Mot de passe*</h3>
                        <div className="mb-5">
                            <input onChange={handleChange} className="password-input" type="password" id="password" name="password_user" minLength="8" required/>
                            <img id="eye" src={showPassword ? oeil_ferme : oeil_ouvert} alt="" onClick={handleClick}/>
                        </div>
                        {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                    </div>
                    <Link to="/mdp-oublie" className="text-yellow fs-3">
                        <p>Mot de passe oublié ?</p>
                    </Link>
                    <Link to="/mail-oublie" className="text-yellow fs-3">
                        <p>Mail oublié ?</p>
                    </Link>
                </div>
                <button onClick={logIn} className="me-auto ms-2 mt-auto login-button" type="submit">Connexion<span className="text-yellow">&gt;</span></button>
            </div>
        </div>
    )
}

export default Connexion;