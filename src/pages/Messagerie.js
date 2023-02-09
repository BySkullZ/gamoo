import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import BouttonMessagerie from "./BouttonMessagerie";

function Messagerie() {
    const id = localStorage.getItem("userId")
    const [user, setUser] = useState([]);
    const [friendInfos, setFriendInfos] = useState([]);
    const [content, setContent] = useState("");
    const [friends, setFriends] = useState([]);
    const [messagesInfos, setMessageInfos] = useState([]);

    useEffect(() => {
        axios.get(`https://gamoo.alwaysdata.net/profil/${id}`).then(res => {setUser(res.data[0]);});
        axios.get(`https://gamoo.alwaysdata.net/friends/${id}`).then(res => {setFriends(res.data);});
    }, [id]);

    function handleChange(e) {
        setContent(e.target.value);
        
    }

    function handleKeydown(e, self, friend, content) {
        if (e.keyCode === 13 && content !== "") {
            sendMessages(self, friend, content)
            document.getElementById("message-area").value = ""
        }
    }

    async function getLastMessage(user1, user2, index) {
        await axios.get(`https://gamoo.alwaysdata.net/last_message/?u1=${user1}&u2=${user2}`).then((res) => {
            if (res.data.length > 0) {
                document.getElementById(`LastMessage${index}`).innerHTML = res.data[0].content || ""
            }
        });
    }

    async function getMessages(user1, user2) {
        await axios.post(`https://gamoo.alwaysdata.net/get_messages`, {"user1": user1, "user2": user2})
        .then(res => {setMessageInfos(res.data);});
    }
    
    async function sendMessages(user1, user2, messageContent) {
        if (user2 && user2 !== 0 && messageContent !== "") {
            await axios.post(`https://gamoo.alwaysdata.net/post_message`, {"sender": user1, "recipient": user2, "content": messageContent}).then(getMessages(user1, user2));
        }
    }

    return (
        <div>
            <Navbar/>
            <div id="messaging">
                <div className="row h-100">
                    <div className="col-3">
                        <ul className="friend-list">
                            {friends.map((friend, index) => {
                                return (
                                    <li key={index}>
                                        <button onClick={() => {
                                            getMessages(friend.u1id, friend.u2id);
                                            setFriendInfos({
                                                userId: parseInt(id) === friend.u1id ? friend.u2id : friend.u1id,
                                                username: parseInt(id) === friend.u1id ? friend.u2name : friend.u1name,
                                                userImg: parseInt(id) === friend.u1id ? friend.u2pfp : friend.u1pfp
                                            });
                                        }} className="friend-button text-decoration-none text-align-center">
                                            <div className="d-flex">
                                                <img src={parseInt(id) === friend.u1id ? friend.u2pfp : friend.u1pfp} alt="" className="profil-picture"/>
                                                <div className="ms-4 text-start">
                                                    <p>{parseInt(id) === friend.u1id ? `${friend.u2name}` : `${friend.u1name}`}</p>
                                                    {getLastMessage(friend.u1id, friend.u2id, index) && <p id={`LastMessage${index}`}></p>}
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-9 bg-white">
                        <h1>{friendInfos.username}</h1>
                        <ul className="message-list">
                            {(messagesInfos && messagesInfos.length > 0) ? messagesInfos.map((message, index) => {
                                return (
                                    <li key={index} className={`message ${parseInt(id) === message.u1id ? "message-self" : "message-friend"}`}>
                                        {parseInt(id) !== message.u1id && <img src={friendInfos.userImg} alt="" className="message-profil-picture me-2"/>}
                                        <div>
                                            <h2 className="fs-5">{message.u1name}</h2>
                                            <p>{message.content}</p>
                                        </div>
                                        {parseInt(id) === message.u1id && <img src={user.profil_picture_user} alt="" className="message-profil-picture ms-2"/>}
                                    </li>
                                )
                                
                            }) : <div>Vous n'avez aucun message en commun. Envoie le premier message !</div>}
                        </ul>
                        {friendInfos.userId && friendInfos.userId !== 0 && <div className="input-group mb-auto">
                            <textarea id="message-area" onChange={handleChange} onKeyDown={(e) => handleKeydown(e, user.id_user, friendInfos.userId, content)} type="text" className="form-control" placeholder={`Envoyer un message à ${friendInfos.username}`}/>
                            <button onClick={() => {
                                sendMessages(user.id_user, friendInfos.userId, content)
                                document.getElementById("message-area").value = ""
                            }} className="button-send">Envoyer</button>
                        </div>}
                    </div>
                </div>
            </div>
            <BouttonMessagerie/>
        </div>
    )
}

export default Messagerie;