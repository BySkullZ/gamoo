import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import BouttonMessagerie from "./BouttonMessagerie";
import oeil_ouvert from "../images/oeil_ouvert.png"
import oeil_ferme from "../images/oeil_ferme.png"

function Notifications() {
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
            <div className="inscription-card">
                <div className="font-gugi">
                    <div className="py-2 mb-4 rounded-2">
                        <p className="text-decoration-underline mx-auto mt-2 titre">Notifications</p>
                    </div>
                    <div className="col-md-8 offset-md-2 py-4 notif">
                        <p>Aucune notifications</p>
                    </div>
                    <div className="col-md-8 offset-md-2 py-4 notif">
                        <p>Aucune notifications</p>
                    </div>
                </div>
            </div>
            <BouttonMessagerie/>
        </div>
    )
}

export default Notifications;