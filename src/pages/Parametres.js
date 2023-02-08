import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Parametres() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [state, setState] = useState({mail_user: "", password_user: ""});
    const [showPassword, setShowPassword] = useState(false);

    async function logIn() {
        const res = await axios.post(`https://gamoo.alwaysdata.net/login/`, state);
        if (res.data.length > 0 && res.data[0].verified === 1) {
            localStorage.setItem("userId", res.data[0].id_user)
            navigate(`/`);
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

    return (
        <div>
            <Navbar/>
            <div className="inscription-card text-center">
                    <h1 className="text-decoration-underline mx-auto mt-2">Parametres</h1>
                    <div className="row">
                        <div className="col-sm">
                            <h2 className="text-decoration-underline mx-auto fs-3">Mail*</h2>
                            <div className="mb-3">
                                <input onChange={handleChange} className="input mx-auto" type="email" name="mail_user" required/>
                            </div>
                            <h2 className="text-decoration-underline mx-auto fs-3">nouveau Mail</h2>
                            <div className="mb-3">
                                <input onChange={handleChange} className="input mx-auto" type="email" name="mail_user" required/>
                            </div>
                        </div>

                        <div className="col-sm">
                            <h2 className="text-decoration-underline fs-3">mot de passe</h2>
                            <div className="mb-3">
                            <input onChange={handleChange} className="input" type={showPassword ? "text" : "password"} name="password_confirm" minLength="8" required/>
                                
                            </div>
                            <h2 className="text-decoration-underline fs-3">nouveau Mot de passe</h2>
                            <div className="mb-3">
                                <input onChange={handleChange} className="input" type={showPassword ? "text" : "password"} name="password_confirm" minLength="8" required/>
                            </div>
                        </div>
                    </div> 
                    <div>
                    <button>Valider</button>     
                </div> 
                </div>
            </div>
    )
}

export default Parametres;