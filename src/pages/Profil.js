import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import BouttonMessagerie from "./BouttonMessagerie";

function Profil() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [userProfil, setUserProfil] = useState([]);
    const [medias, setMedias] = useState([]);
    const [friends, setFriends] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [about, setAbout] = useState("");
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingAbout, setEditingAbout] = useState(false);

    useEffect(() => {
        axios.get(`https://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId")}`).then(res => {setUser(res.data[0]);});
		axios.get(`https://gamoo.alwaysdata.net/profil/${id}`).then(res => {setUserProfil(res.data[0]);});
        axios.get(`https://gamoo.alwaysdata.net/medias/${id}`).then(res => {setMedias(res.data);});
        axios.get(`https://gamoo.alwaysdata.net/friends/${id}`).then(res => {setFriends(res.data);});
    }, [id, user]);

    if (userProfil === undefined) {
        return (
            <div>
                <Navbar/>
                <h1 className="text-center mt-5">Utilisateur inexistant</h1>
            </div>
        )
    }
    
    function changeUsername(e) {
        setNewUsername(e.target.value);
    }

    function changeAbout(e) {
        setAbout(e.target.value);
    }

    async function updateUsername() {
       await axios.post(`https://gamoo.alwaysdata.net/update_username/`, {id_user: id, new_username: newUsername});
        setEditingUsername(false);
        document.getElementById("username").innerHTML = newUsername
    }

    async function updateAbout() {
        await axios.post(`https://gamoo.alwaysdata.net/update_about/`, {id_user: id, new_about: about});
        setEditingAbout(false);
    }

    return (
        <div>
            <Navbar/>
            <div className="text-light font-gugi">
                <div className="profil-banner d-flex vw-100 py-5" style={{backgroundImage: `url(${userProfil.profil_banner_user})`}}>
                    <img className="profil-picture mx-5" src={userProfil.profil_picture_user || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
                    {!editingUsername && <h1 className="text-shadow-yellow my-auto" id="usernae">{userProfil.name_user}</h1>}
                    {editingUsername && <input onChange={changeUsername} className="profil-name fs-1" defaultValue={userProfil.name_user}/>}
                    {editingUsername && <button onClick={updateUsername}>Valider</button>}
                        {user && user.id_user === parseInt(id) && <button onClick={() => setEditingUsername(!editingUsername)} className="edit-about-button">
                            <img src="https://www.pngmart.com/files/15/Vector-Feather-PNG-HD.png" alt=""/>
                        </button>}
                </div>
                <div className="container text-center mt-5">
                    <div className="row align-items-start">
                        <div className="col-md pe-3">
                            <h2 className="bg-blue rounded-3">
                                A propos de moi {user && user.id_user === parseInt(id) && <button onClick={() => setEditingAbout(!editingAbout)} className="edit-about-button">
                                    <img src="https://www.pngmart.com/files/15/Vector-Feather-PNG-HD.png" alt=""/>
                                </button>}
                            </h2>
                            {editingAbout && 
                                <div>
                                    <textarea className="text-blue bg-light w-100 text-center" defaultValue={userProfil?.about_user || "Cet utilisateur n'a pas d'à propos."} onChange={changeAbout} maxLength="200"/>
                                    <button onClick={updateAbout}>Valider</button>
                                </div>
                            } 
                            {!editingAbout && <p className="text-blue bg-light">{userProfil?.about_user || "Cet utilisateur n'a pas d'à propos."}</p>}
                            <h2 className="bg-blue rounded-3 mt-4">Photos</h2>
                            <div className="row text-blue bg-light">
                                {medias.map((media, index) => {
                                    return (
                                        <div key={index} className="col">
                                            <img className="profil-media" src={media.url_media} alt=""></img>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md text-blue bg-light rounded-3 pe-3">
                            <h2 className="">Mes niveaux</h2>
                        </div>
                        <div className="col-md rounded-3">
                            <h2 className="bg-blue rounded-3">Liste d'amis</h2>
                            <ul className="bg-light text-blue profil-friend-list ps-0">
                                {friends.map((friend, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={parseInt(id) === friend.u1id ? `/profil/${friend.u2id}` : `/profil/${friend.u1id}`} className="text-decoration-none d-flex align-items-center mx-2 py-2">
                                                <img src={parseInt(id) === friend.u1id ? `${friend.u2pfp}` : `${friend.u1pfp}`} alt="" className="message-profil-picture"/>
                                                <p className="ms-4 text-black">{parseInt(id) === friend.u1id ? `${friend.u2name}` : `${friend.u1name}`}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <BouttonMessagerie/>
        </div>
    )
}

export default Profil;