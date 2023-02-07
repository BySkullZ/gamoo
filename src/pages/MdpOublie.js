import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";

function MdpOublie() {
    const [success, setSuccess] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [state, setState] = useState({mail_user: "", id_question: 1, answer_user: ""});

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`https://gamoo.alwaysdata.net/questions`);
            setQuestions(res.data);
        }
        getData();
    }, [questions]);

    function sendMail() {

    }

    async function validate() {
        const res = await axios.post(`https://gamoo.alwaysdata.net/password-forgot/`, state);
        console.log(res);
        if (res.data.length > 0) {
            setSuccess(true);
            sendMail()
        } else {
            setError("Mail ou question secrète incorrect.");
        }
    }

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function handleClick(index){
        if (index !== undefined) {
            document.getElementById("question_button").innerHTML = questions[index].content_question;
            setState({...state, "id_question": index+1});
            setDropdownVisible(false);
        } else {
            validate()
        }
    }

    function showDropdown() {
        setDropdownVisible(!dropdownVisible);
    }

    if (success) {
        return (
            <div>
                <Navbar/>
                <div className="connexion-card mx-auto w-50 font-gugi">
                    <div className="bg-light-yellow py-2 rounded-2">
                        <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Mot de passe <br/>Oublié</h1>
                        <p className="fs-2 mx-3 mb-5">Jette un coup d'oeil à tes mails, tu vas recevoir une demande de réinitialisation ! :)</p>
                        <Link to="/connexion" className="text-decoration-none ms-auto">
                            <p className="me-3 mt-5 mb-1 login-button">Retour <Icon.CaretRightFill className="text-yellow"/></p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="connexion-card mx-auto w-75 font-gugi">
                <div className="bg-light-yellow py-2 rounded-2">
                    <h1 className="text-decoration-underline mx-auto mt-2 mb-5">Mot de passe <br/>Oublié</h1>
                    {/* ajouter le span underline sur le css */}
                    <h2 className="text-decoration-underline mx-auto fs-3">Mail*</h2>
                    <div className="mb-2">
                        <input onChange={handleChange} className="mail-input w-25 " type="email" name="mail_user" placeholder="Ecrire votre mail" required/>
                    </div>
                    <h3 className="text-decoration-underline mx-auto mb-3">ou</h3>
                    <div className="row">
                        <div className="col-sm">
                            <h2 className="text-decoration-underline mx-auto fs-3">Question secrète*</h2>
                            <div>
                                <button onClick={showDropdown} className="dropdown-button w-75" type="text" id="question_button">{questions.length > 0 && questions[0].content_question}</button>
                            </div>
                            <ul className={`dropdown mb-5 ${!dropdownVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                {questions.map((question, index) => {
                                    return (
                                        <li key={index} className="dropdown-button-select">
                                            <button onClick={() => handleClick(index)} name="select">{question.content_question}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="col-sm">
                            <h2 className="text-decoration-underline mx-auto fs-3">Réponse*</h2>
                            <input onChange={handleChange} className="input w-75" type="text" name="answer_user" placeholder="Ecrire votre Reponse"/>
                        </div>
                        <p className="mt-4">{error && `${error}`}</p>
                    </div>
                    <div className="d-flex">
                        <Link to="/connexion" className="text-decoration-none ms-auto">
                            <p className="me-3 mt-auto mb-1 login-button"><Icon.CaretLeftFill className="text-yellow"/>Retour</p>
                        </Link>
                        <button onClick={() => handleClick()} className="me-auto ms-3 mt-auto mb-1 login-button">Valider<Icon.CaretRightFill className="text-yellow"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MdpOublie;