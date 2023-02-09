import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Navbar from "./Navbar";

function BouttonMessagerie() {
    return (
        <div id="messaging-button">
            <Link to="/messagerie">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/personal-image/leaving-a-message-14.png" alt=""/>
            </Link>
        </div>
    )
}

export default BouttonMessagerie;