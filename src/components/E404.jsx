import React from "react";
import { Link } from "react-router-dom";
import './404.css';

export function E404(){
    return(
        <section className="E404">
            <h2>Oops! Page Not Found</h2>
            <Link to='/'>
                <button className="E404__backbtn">Back to main</button>
            </Link>
        </section>
    );
}