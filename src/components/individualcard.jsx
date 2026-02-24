import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./skeleton";
import { useState,useEffect } from "react";
import './individualcard.css';

export function Individualcard({data}){
const [image,setImage]=useState('');        //aqui ponemos la imagen si demora 
    if(!data){
        //console.log('no hay data')
        return;
    }

    const navigate=useNavigate();

    const gotoseemore=(e)=>{
        //console.log(e.target.dataset.id)
        navigate(`product/:${e.target.dataset.id}`,{
            state:e.target.dataset.id
        })
    }

    useEffect(()=>{
        if(image === ''){
            setImage(data.image)
        }
    },[data.image])
    

   // console.log(data.image)
    return(
        <figure className="individualcard">
            {image?<img src={data.image} alt={data.title}/>:<Skeleton></Skeleton>}
            <figcaption>
                <p>{data.title}</p>
                <p><span><b>Price:</b></span>${data.price}</p>
                <button data-id={data.id} className="individualcard__seemorebtn" onClick={gotoseemore}>See more...</button>
            </figcaption>
            
        </figure>
    );
}