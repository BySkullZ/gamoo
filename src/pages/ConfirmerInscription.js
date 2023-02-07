import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";

function ReinitialiserMdp() {
    const { token } = useParams();
    const [wToken, setWToken] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`https://gamoo.alwaysdata.net/tokens/${token}`).then((res) => {
                if (res.data.length > 0) {
                    setWToken(res.data[0]);
                    confirmUser(res.data[0]);
                }
            });
        }
        getData();
    }, []);

    async function confirmUser(data) {
        const res = await axios.post(`https://gamoo.alwaysdata.net/confirm-signup/`, {id_user: data.id_user, token: data.token_value});
        console.log(res.data);
        if (res.data) {
            setSuccess(true);
        }
    }

    if (wToken && wToken.length === 0 || wToken.type !== "signup" || !success) {
        return (
            <div>
                <Navbar/>
                <h1 className="mt-5 text-center font-gugi">Lien non valide !</h1>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="connexion-card mx-auto w-50 font-gugi">
                <div className="py-2 rounded-2">
                    <h1 className="text-decoration-underline mx-auto mt-5">Bienvenue <br/>sur Gamoo</h1>
                    <div className="mx-auto w-75 font-gugi">
                        <div className="bg-yellow py-2 rounded-2 text-start ps-5">
                            <p className="fs-3 mx-3 my-3">Inscription validée !</p>
                            <p className="fs-3 mx-3 mb-3">Tu peux désormais te connecter à ton compte !</p>
                            <p className="fs-3 mx-3 mb-3">A très vite sur Gamoo !</p>
                        </div>
                    </div>
                    <Link to="/connexion" className="ms-auto text-blue">
                        <p className="me-3 mt-5 mb-2 fs-4">Connexion <Icon.CaretRightFill color="gray"/></p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ReinitialiserMdp;