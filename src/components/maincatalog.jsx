import React from "react";
import { useContext,useRef,useState } from "react";
import { Catalogcontext } from "./generalcontext";
import { Individualcard } from "./individualcard";
import { Filterbar } from "./filterbar";
import './maincatalog.css';

export function Maincatalog(){

const [showmenu,setShowmenu]=useState(false);
const {generalstate}=useContext(Catalogcontext);    //destructuro el estado
const {base,isloaded,filters}=generalstate;      //destructuro solo base

const categories=base.map(el=>el.category).sort();
const cat=new Set(categories)
const cats=Array.from(cat)
//console.log(cats)
const hamburgerbtn=useRef();

const handleburger=()=>{
    if(!hamburgerbtn.current.classList.contains('is-active')){
        hamburgerbtn.current.classList.add('is-active')
        setShowmenu(true)
        return;
    }
    hamburgerbtn.current.classList.remove('is-active')
    setShowmenu(false)
}


if(isloaded){
    return(
    <section className="mainloader">
        <span className="loader"></span>
        <p>Loading data.....</p>
    </section>
    );
}

if(base.lenght === 0){
    return(
        <section>
            <h2>Base empty</h2>
        </section>
    );
}

return(
        <section className="maincatalog">
            <Filterbar showmenu={showmenu}></Filterbar>
            <article className="maincatalog__filterspace"></article>
            
            <div className="hamburger__container" >
            <button ref={hamburgerbtn} className="hamburger hamburger--collapse" type="button" onClick={handleburger}>
                <span className="hamburger-box" onClick={handleburger}>
                <span className="hamburger-inner" onClick={handleburger}></span>
                </span>
            </button>
            </div>
            
            <section>
            {cats.map((el,ind)=>{
                
                if(filters.length === 0){
                       return <article key={ind} >
                        <h2>{String(el).toUpperCase()}</h2>
                        <div className="maincatalog__products">
                        {base.map((ele,i)=>{
                            if(ele.category === el){
                                return <Individualcard key={i} data={ele}></Individualcard>
                            }
                
                        })}
                        </div>
                        </article>
                
                }else if(filters.includes(el)){

                    return <article key={ind} >
                        <h2>{String(el).toUpperCase()}</h2>
                        <div className="maincatalog__products">
                        {base.map((ele,i)=>{
                            if(ele.category === el){
                                return <Individualcard key={i} data={ele}></Individualcard>
                            }
                
                        })}
                </div>
                </article>

                }
                
                
            })}
            </section>
        </section>
    );
}