import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo_navbar from "../images/logo_navbar.png"

function Navbar() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`https://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId")}`);
            setUser(res.data[0]);
        }
        if (localStorage.getItem("userId")) {
            getData();
        }
    }, []);

    function logOut() {
        localStorage.removeItem("userId");
        setUser([]);
        window.location.reload(false)
    }

    return (
        <div className="navc">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="">
                        <img className="logonav" src={logo_navbar} alt=""/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="me-auto"></div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="text-decoration-none">
                                    <p className="nav-link active mb-0" id="button" aria-current="page">Accueil</p>
                                </Link>
                            </li>
                            {user.length !== 0 &&
                                <li className="nav-item">
                                    <Link to="/notifications" className="text-decoration-none">
                                            <p className="nav-link active mb-0" id="button" aria-current="page">Notifications</p>
                                        </Link>
                                </li>
                            }
                            {user.length === 0 &&
                                <li className="nav-item">
                                    <Link to="/connexion" className="text-decoration-none">
                                        <p className="nav-link active mb-0" id="button" aria-current="page">Se connecter</p>
                                    </Link>
                                </li>
                            }
                            {user.length === 0 &&
                                <li className="nav-item">
                                    <Link to="/inscription" className="text-decoration-none">
                                        <p className="nav-link active mb-0" id="button" aria-current="page">S'inscrire</p>
                                    </Link>
                                </li>
                            }
                            {user.length !== 0 && <ul>
                                <li className="menu-deroulant d-block me-4" style={{width: "50px"}}>                                
                                    <img className="pp" src={user.profil_picture_user || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
                                    <ul className="sous-menu position-absolute translate-middle-x">
                                        <li>
                                            <Link to={`/profil/${user.id_user}`} className="text-decoration-none text-black">
                                                <p>Profil</p>
                                            </Link>    
                                        </li>
                                        <li><p>Paramètres et confidentialité</p></li>
                                        <li><p>Aide et assistance</p></li>
                                        <li><p>Affichage et accessibilité</p></li>
                                        <li><p onClick={logOut}>Se déconnecter</p></li>
                                    </ul>
                                </li>
                            </ul>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
