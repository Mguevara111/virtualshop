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
    const searchdata=base.find(el=>el.title === String(e.target.value))

    if(searchdata){

        dispatch({
            type:'put_for_search',
            payload:searchdata.id
        })
    }else{
        console.log('no search')
        dispatch({
            type:'put_for_search',
            payload:''
        })
    }
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