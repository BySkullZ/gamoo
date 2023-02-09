import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Messagerie() {
    const id = localStorage.getItem("userId")
    const [user, setUser] = useState([]);
    const [friend, setFriend] = useState([]);
    const [content, setContent] = useState("");
    const [friends, setFriends] = useState([]);
    const [messagesInfos, setMessageInfos] = useState([]);

    useEffect(() => {
        axios.get(`https://gamoo.alwaysdata.net/profil/${id}`).then(res => {setUser(res.data[0]);});
        axios.get(`https://gamoo.alwaysdata.net/friends/${id}`).then(res => {setFriends(res.data);});
    }, [messagesInfos]);

    function handleChange(e) {
        setContent(e.target.value);
    }

    async function getMessages(user1, user2) {
        await axios.post(`https://gamoo.alwaysdata.net/get_messages`, {"user1": user1, "user2": user2})
        .then(res => {setMessageInfos(res.data.reverse());});
    }
    
    async function sendMessages(user1, user2, messageContent) {
        if (user2 && user2 !== 0 && messageContent !== "") {
            console.log("envoyé")
            await axios.post(`https://gamoo.alwaysdata.net/post_message`, {"sender": user1, "recipient": user2, "content": messageContent}).then(getMessages(user1, user2));
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="vh-100">
                <div className="row">
                    <div className="col-3">
                        <ul>
                            {friends.map((friend, index) => {
                                return (
                                    <li key={index}>
                                        <button onClick={() => {
                                            getMessages(friend.u1id, friend.u2id);
                                            setFriend({
                                                userId: parseInt(id) === friend.u1id ? friend.u2id : friend.u1id,
                                                username: parseInt(id) === friend.u1id ? friend.u2name : friend.u1name
                                            });
                                        }} className="text-decoration-none text-align-center">
                                            <p>{parseInt(id) === friend.u1id ? `${friend.u2name}` : `${friend.u1name}`}
                                            </p>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-7">
                        <ul>
                            {(messagesInfos && messagesInfos.length > 0) ? messagesInfos.map((message, index) => {
                                return (
                                    <li key={index}>
                                        <p>{message.u1name}</p>
                                        <p>{message.content}</p>
                                    </li>
                                )
                                
                            }) : <div>Vous n'avez aucun message en commun. Envoie le premier message !</div>}
                        </ul>
                        {friend.userId && friend.userId !== 0 && <div className="input-group">
                            <textarea id="MessageArea" onChange={handleChange} type="text" className="form-control" placeholder={`Envoyer un message à ${friend.username}`}/>
                            <button onClick={() => {
                                sendMessages(user.id_user, friend.userId, content)
                                document.getElementById("MessageArea").value = ""
                            }}>Envoyer</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messagerie;