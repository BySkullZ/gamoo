import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";

function MailOublie() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [state, setState] = useState({mail_backup_user: "", password_user: ""});

    async function validate() {
        const res = await axios.post(`https://gamoo.alwaysdata.net/mail-forgot/`, state);
        if (res.data.length > 0) {
            setSuccess(true);
        } else {
            setError("Combinaison incorrecte.")
        }
    }

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        console.log(state);
    }

    if (success) {
        return (
            <div>
                <Navbar/>
                <div className="connexion-card mx-auto w-50 font-gugi">
                    <div className="bg-light-yellow py-2 rounded-2">
                        <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Mail <br/>Oublié</h1>
                        <p className="fs-2 mx-3 mb-5">Jette un coup d'oeil à tes mails, tu vas recevoir une demande pour te connecter ! :)</p>
                        <Link to="/connexion" className="text-decoration-none ms-auto">
                            <p className="me-3 mt-5 mb-1 login-button">Retour <Icon.CaretRightFill className="text-yellow"/></p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="connexion-card mx-auto w-50 font-gugi">
                <div className="bg-light-yellow py-2 rounded-2">
                    <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Mail Oublié</h1>
                    {/* ajouter le span underline sur le css */}
                    <h2 className="text-decoration-underline text-start ms-5 fs-3">Mail de secours*</h2>
                    <div className="mb-5">
                        <input onChange={handleChange} className="mail-input w-75" type="email" id="mail" name="mail_backup_user" placeholder="Ecrire votre mail" required/>
                    </div>
                    <h3 className="text-decoration-underline text-start ms-5 fs-3">Mot de passe*</h3>
                    <div className="mb-5">
                        <input onChange={handleChange} className="password-input w-75" type="password" id="password" name="password_user" placeholder="Ecrire votre mot de passe" minLength="8" required/>
                    </div>
                    {error && <div className="alert alert-danger w-75 mx-auto mb-5" role="alert">{error}</div>}
                    <button onClick={() => validate()} className="me-auto ms-3 mt-auto mb-4 login-button">Recherche<Icon.CaretRightFill className="text-yellow"/></button>
                </div>
            </div>
        </div>
    )
}

export default MailOublie;