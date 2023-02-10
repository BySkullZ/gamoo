import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import Navbar from './pages/Navbar.js';
import BouttonMessagerie from "./pages/BouttonMessagerie";

import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
	const [user, setUser] = useState([]);
  	const [posts, setPosts] = useState([]);
	const [content, setContent] = useState("");

	useEffect(() => {
		axios.get(`https://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId") || 0}`).then(res => {setUser(res.data[0]);});
    	axios.get(`https://gamoo.alwaysdata.net/posts`).then(res => {setPosts(res.data.reverse());});
	}, [posts]);

	function handleChange(e) {
        setContent(e.target.value);
    }

    function handleKeydown(e, id, content) {
        if (e.keyCode === 13 && content !== "") {
            sendPost(id, content)
            document.getElementById("post-content").value = ""
        }
    }

	async function getPostUsername(index, postUserId) {
		await axios.get(`https://gamoo.alwaysdata.net/profil/${postUserId}`)
			.then(res => {
				document.getElementById(`User${index}`).innerHTML = res.data[0].name_user;
				document.getElementById(`UserImg${index}`).src = res.data[0].profil_picture_user;
		});
    }

	async function sendPost(id, content) {
		await axios.post(`https://gamoo.alwaysdata.net/post`, {content_post: content, media_post: "", id_user: id})
	}

  return (
    <div className="main vh-100 overflow-auto">
		<Navbar/>
		<div className="mt-5 w-75 mx-auto font-gugi">
			<div className="d-flex w-100 py-5">
				<img className="profil-picture mx-5" src={(user && user?.profil_picture_user) || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
				<input id="post-content" className="home-post"
					placeholder={(user && user.length === 0) || user === undefined ? 
						"Tu n'es pas inscrit, c'est dommage :(...	Rejoins-nous pour discuter avec nous! ;)" : 
						"Partage avec nous quelque chose ! ..."
					}
					maxLength={(user && user.length === 0) || user === undefined ? "0" : "200"}
					style={{caretColor: (user && user.length === 0) || user === undefined ? "transparent" : "auto"}}
					onChange={handleChange} onKeyDown={(e) => handleKeydown(e, user.id_user, content)}
				/>
				<button className="button-send" onClick={() => {
					sendPost(user.id_user, content)
					document.getElementById("post-content").value = ""
				}}>Poster</button>
			</div>
			<ul className="px-0 w-100">
				{posts && posts.map((post, index) => {
					getPostUsername(index, post.id_user)
					return (
						<div key={index} className="post-shadow mb-4">
							<div className="d-flex">
								<img id={`UserImg${index}`} className="profil-picture my-2 mx-3" src="" alt=""/>
								<h2 id={`User${index}`} className="text-white mx-3 my-4">Pseudo</h2>
							</div>
							<li className="post">
								<img src={post.media_post} alt=""/>
								<p className="ms-5">{post.content_post}</p>
							</li>
							<h3 className="text-white mx-3 my-3">Commentaire</h3>
						</div>
					)
				})}
			</ul>
		</div>
		<BouttonMessagerie/>
    </div>
  );
}

export default Home;
