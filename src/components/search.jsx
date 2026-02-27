import React from "react";
import { useContext } from "react";
import { Catalogcontext } from "./generalcontext";
import { useState } from "react";

export function Search(){
const [datatofind,setDatatofind]=useState('');          //dato que se mandara a context, dato a buscar

const {generalstate,dispatch}=useContext(Catalogcontext);
const {base}=generalstate;

const handlechangesearch=(e)=>{
    setDatatofind(e.target.value)
    //console.log(e.target.value)
    const searchdata=base.find(el=>el.title.trim() === String(e.target.value))

        dispatch({
            type:'put_for_search',
            payload:searchdata?searchdata.id:''
        })
    
}



    return(
        <section>
            <input type="text" list="options" placeholder="search product" onChange={handlechangesearch} value={datatofind}/>
            <datalist id="options">
                {base.map(el=>
                    <option key={el.id}>{el.title}</option>
                )}
            </datalist>
        </section>
    );
}