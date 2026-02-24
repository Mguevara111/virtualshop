import React from "react";
import { useContext } from "react";
import { Catalogcontext } from "./generalcontext";
import logo from '../assets/images/logonobg.png';
import './filterbar.css';

export function Filterbar({showmenu}){

const {generalstate,dispatch}=useContext(Catalogcontext);

const {base}=generalstate;
const {filters}=generalstate;


const categories=base.map(el=>el.category).sort();
const catref=new Set(categories);
const cats=Array.from(catref);

const addfilterstostate=(e)=>{
    console.log(e.target.value)
    const searcher=filters.find(el=>el === e.target.value)
    if(filters.length === 0 || !searcher){
        dispatch({
            type:'addfilters',
            payload:e.target.value
        })
        return;
    }

    if(searcher){
        dispatch({
            type:'deletefilters',
            payload:e.target.value
        })
    }
}

    return(
        <section className={`filterbar ${showmenu?'filterbar--show':''}`}>
            <h2 className="filterbar__title">Menu</h2>
            {cats.map((el,i)=>
                <div key={i} className="filterbar__option">
                    <input type="checkbox" name={el} onChange={addfilterstostate} value={el}/>
                    <span>{String(el).toUpperCase()}</span>
                </div>
            )}
            <div>
                <img className="filterbar__logo" src={logo} alt="logo" />
            </div>
        </section>
    );
}