import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";

function ReinitialiserMdp() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [wToken, setWToken] = useState([]);
    const [error, setError] = useState("");
    const [state, setState] = useState({password: "", password_confirm: ""});

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`https://gamoo.alwaysdata.net/tokens/${token}`);
            if (res.data.length > 0) {
                setWToken(res.data[0]);
            }
        }
        getData();
    }, [token]);

    async function validate() {
        if (state["password"] === state["password_confirm"]) {
            await axios.post(`https://gamoo.alwaysdata.net/reset-password/`, {token, password: state["password"]});
            navigate(`/`);
        } else {
            setError("Les mots de passe ne correspondent pas.");
        }
    }

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    if ((wToken && wToken.length === 0) || wToken.type !== "reset_password") {
        return (
            <div>
                <Navbar/>
                <h1 className="mt-5 text-center">Lien non valide !</h1>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="connexion-card mx-auto w-50 font-gugi">
                <div className="bg-yellow py-2 rounded-2">
                    <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Réinitialiser <br/>Mot de Passe</h1>
                    {/* ajouter le span underline sur le css */}
                    <h2 className="text-decoration-underline text-start ms-5 fs-3">Nouveau mot de passe*</h2>
                    <div className="mb-5">
                        <input onChange={handleChange} className="mail-input w-75" type="password" name="password" placeholder="Ecrire votre mot de passe" minLength="8" required/>
                    </div>
                    <h3 className="text-decoration-underline text-start ms-5 fs-3">Nouveau mot de passe*</h3>
                    <div className="mb-5">
                        <input onChange={handleChange} className="password-input w-75" type="password" name="password_confirm" placeholder="Ecrire votre mot de passe" minLength="8" required/>
                    </div>
                    <button onClick={() => validate()} className="me-auto ms-3 mt-auto mb-4 login-button">Réinitialiser<Icon.CaretRightFill className="text-yellow"/></button>
                    {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default ReinitialiserMdp;