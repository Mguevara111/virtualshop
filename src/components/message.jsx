import React from "react";
import { useContext } from "react";
import { Catalogcontext } from "./generalcontext";
import './message.css';

export function Message(){

    const {generalstate}=useContext(Catalogcontext);

    if(!generalstate.message){
        return;
    }

    return(
        <section style={{backgroundColor:generalstate.message.color}} className="message">
            <h2>{generalstate.message.text}</h2>
        </section>
    );
}