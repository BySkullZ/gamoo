import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import Navbar from './pages/Navbar.js';

import 'bootstrap/dist/css/bootstrap.min.css';




function Home() {
	const [user, setUser] = useState([]);
	const [formVisible, setFormVisible] = useState(false);

	useEffect(() => {
		axios.get(`https://gamoo.alwaysdata.net/profil/${localStorage.getItem("userId") || 0}`).then(res => {setUser(res.data[0]);});
	}, []);
    
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
      <div className="container mt-5">
        <div className="d-flex vw-100 py-5">
          <img className="profil-picture mx-5" src={(user && user?.profil_picture_user) || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8aff023-57ed-49e6-982a-b0cdb786956e/d4z5h7j-5a6ceb7b-95c6-4cd6-8aa4-aaf759249d0b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4YWZmMDIzLTU3ZWQtNDllNi05ODJhLWIwY2RiNzg2OTU2ZVwvZDR6NWg3ai01YTZjZWI3Yi05NWM2LTRjZDYtOGFhNC1hYWY3NTkyNDlkMGIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.icigU0Tv0i34PGz2npT9Hov5HlIBjMmeDv27JmGCn74"} alt=""/>
          <button className="home_post" onClick={() => openForm()}>
          {(user && user.length === 0) || user === undefined ? 
            "Tu n'es pas inscris quel dommage !" : 
            "Partage avec nous quelque chose ! ..."
            }
          </button>
        </div>
		    <div className={`messagepopup ${formVisible ? "d-block" : "d-none"}`} id="myForm">
              <p>votre message :</p>
              <input type="texte" placeholder="votre message" name="message" required></input>
              <button type="submit" className="btn" onClick={closeForm}>poster</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
