import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import Navbar from './pages/Navbar.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
	const [user, setUser] = useState([]);
  	const [posts, setPosts] = useState([]);
	const [formVisible, setFormVisible] = useState(false);

	useEffect(() => {
		axios.get(`https://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId") || 0}`).then(res => {setUser(res.data[0]);});
    	axios.get(`https://gamoo.alwaysdata.net/posts`).then(res => {setPosts(res.data);});
	}, []);

	console.log(posts);
    
	function openForm() {
		if (user) {
			setFormVisible(true);
		}
    }
    
	function closeForm() {
		setFormVisible(false);
    }

  return (
    <div className="main">
		<Navbar/>
		<div className="mt-5 w-75 mx-auto font-gugi">
			<div className="d-flex w-100 py-5">
				<img className="profil-picture mx-5" src={(user && user?.profil_picture_user) || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
				<input className="home-post" onClick={() => openForm()}
					placeholder={(user && user.length === 0) || user === undefined ? 
						"Tu n'es pas inscrit, c'est dommage :(...       Rejoins-nous pour discuter avec nous! ;)" : 
						"Partage avec nous quelque chose ! ..."
				}
				maxlength={(user && user.length === 0) || user === undefined ? "0" : "200"}
				style={{caretColor: (user && user.length === 0) || user === undefined ? "transparent" : "auto"}}/>
			</div>
			<ul className="px-0 w-100">
				{posts && posts.map((post, index) => {
					return (
						<div className="post-shadow">
							<li key={index} className="post">
								<img src={post.media_post}/>
								<p className="ms-5">{post.content_post}</p>
							</li>
							<h3 className="text-white mx-3 my-3">Commentaire</h3>
						</div>
					)
				})}
			</ul>
		</div>
    </div>
  );
}

export default Home;
