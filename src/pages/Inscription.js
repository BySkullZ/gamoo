import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";
import oeil_ouvert from "../images/oeil_ouvert.png"
import oeil_ferme from "../images/oeil_ferme.png"

function Inscription() {
    const [error, setError] = useState("");
    const [state, setState] = useState({
        mail_user: "",
        password_user: "",
        id_question: 1,
        mail_confirm: "",
        password_confirm: "",
        answer_user: "",
        mail_backup_user: "",
        name_user: "",
        gender_user: "Homme",
        date_user: "0000-00-00",
        styles: [],
        id_country: 1,
        id_region: 1,
        language1: "",
        language2: "",
        language3: ""
    });
    const [step, setStep] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownGVisible, setDropdownGVisible] = useState(false);
    const [dropdownSVisible, setDropdownSVisible] = useState(false);
    const [dropdownPVisible, setDropdownPVisible] = useState(false);
    const [dropdownRVisible, setDropdownRVisible] = useState(false);

    const [dropdownL1Visible, setDropdownL1Visible] = useState(false);
    const [dropdownL2Visible, setDropdownL2Visible] = useState(false);
    const [dropdownL3Visible, setDropdownL3Visible] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [styles, setStyles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        async function getData() {
            const qres = await axios.get(`https://gamoo.alwaysdata.net/questions`);
            const sres = await axios.get(`https://gamoo.alwaysdata.net/styles`);
            const pres = await axios.get(`https://gamoo.alwaysdata.net/countries`);
            const rres = await axios.get(`https://gamoo.alwaysdata.net/regions/1`);
            const lres = await axios.get(`https://gamoo.alwaysdata.net/languages`);
            setQuestions(qres.data);
            setStyles(sres.data);
            setCountries(pres.data);
            setRegions(rres.data);
            setLanguages(lres.data);
        }
        getData();
    }, []);

    async function registerUser() {
        const res = await axios.post(`https://gamoo.alwaysdata.net/register/`, state);
        console.log(res.data);
        if (res.data.length > 0) {
            
        } else {
            setError("Inscription échouée. Veuillez réessayer.");
        }
    }

    async function updateRegions(id_country) {
        const rres = await axios.get(`https://gamoo.alwaysdata.net/regions/${id_country}`);
        setRegions(rres.data);
    }

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function handleStyles(e, i) {
        if (!state["styles"].includes(e)) {
            state["styles"].push(e);
        } else if (state["styles"].includes(e)) {
            const styleIndexToRemove = state["styles"].findIndex((el) => el === e);
            state["styles"].splice(styleIndexToRemove, 1);
        }
        document.getElementById("styles").innerHTML = (state["styles"].length > 0 && state["styles"].join(", ")) || "Selectionnez des styles de jeux"
    }

    function nextStep(currStep) {
        if (currStep === 1) {
            if (state["mail_user"] !== state["mail_confirm"]) {
                setError("Les mails ne correspondent pas.");
            } else if (state["password_user"] !== state["password_confirm"]) {
                setError("Les mots de passe ne correspondent pas.");
            } else if (state["password_user"].length < 8) {
                setError("Le mot de passe doit contenir 8 caractères au minimum.")
            } else {
                setStep(step+1);
                setError("");
            }
        } else if (currStep === 2) {
            if (state["name_user"].length < 2) {
                setError("Le pseudo est trop court.");
            } else if (state["name_user"].length > 32) {
                setError("Le pseudo est trop long.");
            } else {
                setStep(step+1);
                setError("");
            }
        } else if (currStep === 3) {
            registerUser();
            setStep(step+1);
        }
    }

    if (step === 1) {
        return (
            <div>
                <Navbar/>
                <div className="inscription-card text-center">
                    <h1 className="text-decoration-underline mx-auto mt-2">Inscription</h1>
                    <div className="card w-75 mx-auto py-5">
                        <div className="row">
                            <div className="col-sm">
                                <h2 className="text-decoration-underline mx-auto fs-3">Mail*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input mx-auto" type="email" name="mail_user" required/>
                                </div>
                                <h2 className="text-decoration-underline mx-auto fs-3">Mot de passe*</h2>
                                <div className="mb-3 mx-auto">
                                    <input onChange={handleChange} className="password-input ms-auto" type={showPassword ? "text" : "password"} id="password" name="password_user" minLength="8" required/>
                                    <img className="me-auto" src={showPassword ? oeil_ferme : oeil_ouvert} alt="" id="eye" onClick={() => setShowPassword(!showPassword)}/>
                                </div>
                                <h2 className="text-decoration-underline mx-auto fs-3">Question secrète*</h2>
                                <div>
                                    <button onClick={() => setDropdownVisible(!dropdownVisible)} className="dropdown-button w-75" type="text">{questions.length > 0 && questions[state["id_question"]-1].content_question}</button>
                                </div>
                                <ul className={`dropdown mb-5 ${!dropdownVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                    {questions.map((question, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {setState({...state, "id_question": index+1}); setDropdownVisible(false)}} name="select">{question.content_question}</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="col-sm">
                                <h2 className="text-decoration-underline fs-3">Vérification Mail*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input" type="email" name="mail_confirm" required/>
                                    
                                </div>
                                <h2 className="text-decoration-underline fs-3">Vérification Mot de passe*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input" type={showPassword ? "text" : "password"} name="password_confirm" minLength="8" required/>
                                </div>
                                <h2 className="text-decoration-underline fs-3">Réponse*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input" type="text" name="answer_user" minLength="8" required/>
                                </div>
                                <h2 className="text-decoration-underline fs-3">Mail de récupération*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input" type="email" name="mail_backup_user" minLength="8" required/>
                                </div>
                                <button onClick={() => nextStep(step)} className="next-button"><Icon.CaretRightFill color="gray"/></button>
                            </div>
                        </div>
                        {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                    </div>
                </div>
            </div>
        )
    } else if (step === 2) {
        return (
            <div>
                <Navbar/>
                <div className="inscription-card text-center">
                    <h1 className="text-decoration-underline mx-auto mt-2">Inscription</h1>
                    <div className="card w-75 mx-auto py-5">
                        <div className="row">
                            <div className="col-sm">
                                <h2 className="text-decoration-underline mx-auto fs-3">Nom d'utilisateur*</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input mx-auto" type="text" name="name_user" required/>
                                </div>
                                <h2 className="text-decoration-underline mx-auto fs-3">Genre</h2>
                                <div>
                                    <button onClick={() => setDropdownGVisible(!dropdownGVisible)} className="dropdown-button w-75" type="text">{state["gender_user"]}</button>
                                </div>
                                <ul className={`dropdown mb-5 ${!dropdownGVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {setState({...state, "gender_user": "Homme"}); setDropdownGVisible(false);}}>Homme</button>
                                    </li>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {setState({...state, "gender_user": "Femme"}); setDropdownGVisible(false);}}>Femme</button>
                                    </li>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {setState({...state, "gender_user": "Autre"}); setDropdownGVisible(false);}}>Autre</button>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-sm">
                                <h2 className="text-decoration-underline fs-3">Date de naissance</h2>
                                <div className="mb-3">
                                    <input onChange={handleChange} className="input" type="date" name="date_user" required/>
                                </div>
                                <h2 className="text-decoration-underline fs-3">Styles de jeux</h2>
                                <div>
                                    <button onClick={() => setDropdownSVisible(!dropdownSVisible)} className="dropdown-button w-75" type="text" id="styles">Selectionnez des styles de jeux</button>
                                </div>
                                <ul className={`dropdown mb-5 ${!dropdownSVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                    {styles.map((style, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => handleStyles(style.name_style, index)} name="select">{style.name_style}</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <button onClick={() => nextStep(step)} className="next-button"><Icon.CaretRightFill color="gray"/></button>
                            </div>
                        </div>
                        {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                    </div>
                </div>
            </div>
        )
    } else if (step === 3) {
        return (
            <div>
                <Navbar/>
                <div className="inscription-card text-center">
                    <h1 className="text-decoration-underline mx-auto mt-2">Inscription</h1>
                    <div className="card w-75 mx-auto py-5">
                        <div className="row">
                            <div className="col-sm">
                                <h2 className="text-decoration-underline mx-auto fs-3">Pays / Région</h2>
                                <div>
                                    <button onClick={() => setDropdownPVisible(!dropdownPVisible)} className="dropdown-button w-75" type="text">{[countries.length > 0 && countries[state["id_country"]-1].name_en_country]}</button>
                                </div>
                                <ul className={`dropdown mb-2 ${!dropdownPVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                    {countries.map((country, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {
                                                    setState({...state, "id_country": index+1});
                                                    setDropdownPVisible(false);
                                                    updateRegions(country.id_country);
                                                    setDropdownRVisible(false);
                                                }}
                                                name="select">{country.name_en_country}</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div>
                                    <button onClick={() => setDropdownRVisible(!dropdownRVisible)} className="dropdown-button w-75 mt-4" type="text">{(regions.length > 0 && regions[state["id_region"]-1].name_region) || (regions.length > 0 && regions[0].name_region) || "Aucune région disponible."}</button>
                                </div>
                                <ul className={`dropdown mb-2 ${!dropdownRVisible && "dropdown-hidden"} w-75 mx-auto`}>
                                    {regions.map((region, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {setState({...state, "id_region": index+1}); setDropdownRVisible(false);}} name="select">{region.name_region}</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="col-sm">
                                <h2 className="text-decoration-underline fs-3">Langues</h2>
                                {/* L1 */}
                                <div>
                                    <button onClick={() => setDropdownL1Visible(!dropdownL1Visible)} className="dropdown-button w-75" type="text">{state["language1"] || "Aucune"}</button>
                                </div>
                                <ul className={`dropdown mb-2 ${!dropdownL1Visible && "dropdown-hidden"} w-75 mx-auto`}>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {
                                                    setState({...state, "language1": ""});
                                                    setDropdownL1Visible(false);
                                                }} name="select">Aucune</button>
                                    </li>
                                    {languages.map((language, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {
                                                    setState({...state, "language1": language.name_fr_language});
                                                    setDropdownL1Visible(false);
                                            }} name="select">{language.name_fr_language}</button>
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* L2 */}
                                <div>
                                    <button onClick={() => setDropdownL2Visible(!dropdownL2Visible)} className="dropdown-button w-75 mt-4" type="text">{state["language2"] || "Aucune"}</button>
                                </div>
                                <ul className={`dropdown mb-2 ${!dropdownL2Visible && "dropdown-hidden"} w-75 mx-auto`}>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {
                                                    setState({...state, "language2": ""});
                                                    setDropdownL2Visible(false);
                                                }} name="select">Aucune</button>
                                    </li>
                                    {languages.map((language, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {
                                                    setState({...state, "language2": language.name_fr_language});
                                                    setDropdownL2Visible(false);
                                            }} name="select">{language.name_fr_language}</button>
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* L3 */}
                                <div>
                                    <button onClick={() => setDropdownL3Visible(!dropdownL3Visible)} className="dropdown-button w-75 mt-4" type="text">{state["language3"] || "Aucune"}</button>
                                </div>
                                <ul className={`dropdown mb-2 ${!dropdownL3Visible && "dropdown-hidden"} w-75 mx-auto`}>
                                    <li className="dropdown-button-select">
                                        <button onClick={() => {
                                                    setState({...state, "language3": ""});
                                                    setDropdownL3Visible(false);
                                                }} name="select">Aucune</button>
                                    </li>
                                    {languages.map((language, index) => {
                                        return (
                                            <li key={index} className="dropdown-button-select">
                                                <button onClick={() => {
                                                    setState({...state, "language3": language.name_fr_language});
                                                    setDropdownL3Visible(false);
                                            }} name="select">{language.name_fr_language}</button>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <button onClick={() => nextStep(step)} className="next-button"><Icon.CaretRightFill color="gray"/></button>
                            </div>
                        </div>
                        {error && <div className="w-75 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
                    </div>
                </div>
            </div>
        )
    } else if (step === 4) {
        return (
            <div>
                <Navbar/>
                <div className="inscription-card text-center">
                    <h1 className="text-decoration-underline mx-auto mt-5">Bienvenue <br/>sur Gamoo</h1>
                    <div className="mx-auto w-75 font-gugi">
                        <div className="bg-yellow py-2 rounded-2 text-start ps-5">
                            <p className="fs-3 mx-3 my-3">Tu as bien réussi ton inscription !</p>
                            <p className="fs-3 mx-3 mb-3">Il ne te reste plus qu'à regarder tes mails pour valider le lien d'inscription !</p>
                            <p className="fs-3 mx-3 mb-3">A très vite sur Gamoo !</p>
                        </div>
                        <Link to="/" className="ms-auto text-blue">
                            <p className="me-3 mt-5 mb-2 fs-4">Retourner sur la page d'accueil <Icon.CaretRightFill color="gray"/></p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default Inscription;