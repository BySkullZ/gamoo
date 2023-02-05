import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Profil() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [medias, setMedias] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
		axios.get(`http://gamoo.alwaysdata.net/profil/${id}`).then(res => {setUser(res.data[0]);});
        axios.get(`http://gamoo.alwaysdata.net/medias/${id}`).then(res => {setMedias(res.data);});
        axios.get(`http://localhost:3001/friends/${id}`).then(res => {setFriends(res.data);});
    }, [id]);

    if (user === undefined) {
        return (
            <div>
                <Navbar/>
                <h1 className="text-center mt-5">Utilisateur inexistant</h1>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="text-light font-gugi">
                <div className="profil_banner d-flex vw-100 py-5" style={{backgroundImage: `url(${user.profil_banner_user})`}}>
                    <img className="profil_picture mx-5" src={user.profil_picture_user || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
                    <h1 className="text-shadow-yellow my-auto">{user.name_user}</h1>
                </div>
                <div className="container text-center mt-5">
                    <div className="row align-items-start">
                        <div className="col-md pe-3">
                            <h2 className="bg-blue rounded-3">A propos de moi</h2>
                            <p className="text-blue bg-light">{user?.about_user || "Cet utilisateur n'a pas d'à propos."}</p>
                            <h2 className="bg-blue rounded-3 mt-4">Photos</h2>
                            <div className="row text-blue bg-light">
                                {medias.map((media, index) => {
                                    return (
                                        <div key={index} className="col">
                                            <img className="profil_media" src={media.url_media} alt=""></img>
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
                            <ul className="bg-light text-blue">
                                {friends.map((friend, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={parseInt(id) === friend.u1id ? `/profil/${friend.u2id}` : `/profil/${friend.u1id}`}>{parseInt(id) === friend.u1id ? `${friend.u2name}` : `${friend.u1name}`}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;