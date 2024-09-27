import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/sucessPayment.css'
const SucessPayment: React.FC = () => {
    return (
        <div id="modal-container">
            <div id="modal">
                <p>the payment has been made correctly</p>
                <Link to='/' className="custom-btn btn-2">go home</Link>
            </div>
        </div>
    );

}

export default SucessPayment