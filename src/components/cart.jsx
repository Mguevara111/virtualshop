import React from "react";
import { useContext,useEffect,useRef } from "react";
import { Catalogcontext } from "./generalcontext";
import { Link } from "react-router-dom";
import { deletefromlocalstorage } from "./addlocalstorage";
import { useState } from "react";
import { changeqty } from "./addlocalstorage";

const tax=0.15;     //valor impuesto

const initialeditvalues={
    id:'',
    qty:''
}

export function Cart(){
const valscart=useRef(false);       //evita que el primer renderizado se ejecute cangeqty
const [editvalues,setEditvalues]=useState(initialeditvalues);    //valores a editar
const [edit,setEdit]=useState(false);       //activa edicion


const {generalstate,dispatch}=useContext(Catalogcontext);
const {scart}=generalstate;

useEffect(()=>{
    if(!valscart.current){
        valscart.current=true;
    }

    if(scart.length !==0){
        changeqty(scart)
    }
    
},[scart])

const handledelete=(e)=>{
    let ale=confirm('Delete item?')

    if(!ale){
        return;
    }
    dispatch({
        type:'remove_from_cart',
        payload:Number(e.target.dataset.id)
    })
    let searched=scart.find(el=>el.id == e.target.dataset.id)

    if(searched){
       // console.log('actualizo en cart')
        deletefromlocalstorage(searched)
    }
    
    const initialmessage={
            text:'The product was successfully deleted',
            color:'green'
        }
    dispatch({
        type:'set_message',
        payload:initialmessage
    })
   
}



const handleedit=(e)=>{
    //console.log(e.target)
    const searched=scart.find(el=>el.id === Number(e.target.dataset.id));

    let ev={
            id:Number(e.target.dataset.id),
            qty:''
        }

    if(searched){
        ev={
            id:Number(e.target.dataset.id),
            qty:searched.quantity
        }
    }

    setEdit(true)    
    setEditvalues(ev)

    
}

const handlechange=(e)=>{
    let ev={
        ...editvalues,
        qty:e.target.value
    }
    setEditvalues(ev)
}

const handlesubmit=()=>{
    dispatch({
        type:'edit_cart',
        payload:editvalues
    })

     const initialmessage={
            text:`The product was successfully edited`,
            color:'green'
        }
    dispatch({
        type:'set_message',
        payload:initialmessage
    })

    
    setEdit(false)
    setEditvalues(initialeditvalues)
}

if(scart.length === 0 || !scart){
    return(
        <section>
            <div>
                <Link to='/'>
                    <button>X</button>
                </Link>
            </div>
            <h2>The card is empty</h2>
        </section>
    );
}

function calctotal(){
    const totalprice=scart.reduce((acum,el)=>{
        let partial=parseInt(el.quantity) * parseFloat(el.unit_amount.value)
        acum+=partial;

        return acum;
    },0)

    return totalprice;
}

    return(
        <section className="cart">
            <div>
                <Link to='/'>
                    <button>X</button>
                </Link>
            </div>
            <h2>Shopping Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>QTY</th>
                        <th>UNIT PRICE</th>
                        <th>TOTAL PRICE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {scart.map(el=>
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            {edit&&editvalues.id===el.id?
                            <td>
                                <input type="number" onChange={handlechange} value={editvalues.qty}></input>
                            </td>
                            :
                            <td>{el.quantity}</td>}
                            <td>${el.unit_amount.value}</td>
                            <td>${String((parseInt(el.unit_amount.value) * parseInt(el.quantity)).toFixed(2))}</td>
                            <td><button data-id={el.id} onClick={handleedit}>
                                <svg data-id={el.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path data-id={el.id}  d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                </button></td>
                            <td><button data-id={el.id}  onClick={handledelete}>
                                <svg data-id={el.id} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path data-id={el.id} d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {edit&&<button onClick={handlesubmit}>Submit changes</button>}
                <p><b>SUBTOTAL</b>${calctotal().toFixed(2)}</p>
                <p><b>TAX:</b>{(calctotal() * tax).toFixed(2)}</p>
                <p><b>TOTAL:</b>${((calctotal() * tax) + calctotal()).toFixed(2)}</p>
            </div>
        </section>
        
    );
}