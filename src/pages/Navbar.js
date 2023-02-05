import React, { useEffect, useState } from "react";
import axios from "axios";
import logo_navbar from "../images/logo_navbar.png"

function Navbar() {
    const [user, setUser] = useState([]);

    // localStorage.removeItem("userId")

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId")}`);
            setUser(res.data[0]);
        }
        if (localStorage.getItem("userId")) {
            getData();
        }
    }, [user]);

    function logOut() {
        localStorage.removeItem("userId");
        setUser([]);
        window.location.reload(false)
    }

    return (
        <div className="navc">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a href="/"><img className="logonav" src={logo_navbar} alt=""/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="me-auto"></div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" id="button" aria-current="page" href="/">Accueil</a>
                            </li>
                            {user.length !== 0 &&
                            <li className="nav-item">
                                <a className="nav-link active" id="button" aria-current="page" href="/">Notifications</a>
                            </li>
                            }
                            {user.length === 0 &&
                                <li className="nav-item">
                                    <a className="nav-link active" id="button" aria-current="page" href="/connexion">Se connecter</a>
                                </li>
                            }
                            {user.length === 0 &&
                                <li className="nav-item">
                                    <a className="nav-link active" id="button" aria-current="page" href="/inscription">S'inscrire</a>
                                </li>
                            }
                            {user.length !== 0 && <ul>
                                <li className="menu-deroulant d-block me-4" style={{width: "50px"}}>                                
                                    <img className="pp" src={user.profil_picture_user || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
                                    <ul className="sous-menu position-absolute translate-middle-x">
                                        <li><a href={`/profil/${user.id_user}`}>profil</a></li>
                                        <li><a href="pc">paramètres et confidentialité</a></li>
                                        <li><a href="aa">aide et assistance</a></li>
                                        <li><a href="afac">affichage et accessibilite</a></li>
                                        <li><p onClick={logOut}>se déconecter</p></li>
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
