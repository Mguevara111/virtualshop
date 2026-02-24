import React from "react";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Catalogcontext } from "./generalcontext";
import { Link } from "react-router-dom";
import { updatelocalstorage } from "./addlocalstorage";
import './viewproduct.css';

export function Viewproduct(){

const [singleprod,setSingleprod]=useState('');      //producto traido fakeapi
const [showmodal,setShowmodal]=useState(false);
const [qty,setQty]=useState(1);                     //cantidad del producto
const [pricecalc,setPricecalc]=useState('');

const location=useLocation();
const {state}=location;

const {dispatch}=useContext(Catalogcontext);


const handleaddtocart=(e)=>{
    setShowmodal(true)
    setPricecalc(Number(e.target.dataset.price))
}

const changeqty=(val)=>{
    if(val === '+'){
        setQty(prev=>prev+1)
        return;
    }
    
    setQty(prev=>(prev >1 ? prev-1 : 1))
    
}

const handlereset=()=>{
    setQty(1);
    setShowmodal(false);
    setPricecalc('');
}

const handleaddtoshoppingcart=(e)=>{
    if(!singleprod){
        const initialmessage={
                text:'We cant find the product, reload the page',
                color:'red'
            }

        dispatch({
            type:'set_message',
            payload:initialmessage
        })
    }

    // ******************formato paypal***********************
    let selecprod={
      id:singleprod.id,           
      name:singleprod.title,
      unit_amount:{
              currency_code: "USD",
              value: singleprod.price.toFixed(2)
            },
      quantity:String(qty)
    }

    dispatch({
        type:'add_to_cart',
        payload:selecprod
    })

    updatelocalstorage(selecprod)

    const initialmessage={
                text:`Product ${singleprod.title} added to cart`,
                color:'green'
            }

        dispatch({
            type:'set_message',
            payload:initialmessage
    })

    handlereset();
}

useEffect(()=>{
    if(singleprod){
        setPricecalc(Number(singleprod.price * qty).toFixed(2))
    }
    
},[qty])

useEffect(()=>{
    const callsingleprod=async()=>{
        try {
            let res=await fetch(`https://fakestoreapi.com/products/${state}`)
            if(res.status !== 200){
                throw new Error(`Can't load product.There was an error ${res.status}`)
            }

            let data=await res.json();
            setSingleprod(data)
        } catch (error) {
            const errmessage={
                            text:error.message,
                            color:'red'
                            }
            dispatch({
                type:'set_message',
                payload:errmessage
            })
        }
    }

    if(state){
        callsingleprod()
    }
},[])

if(singleprod === ''){
    return(
        <section className="viewproduct__loader">
            <span className="vploader"></span>
        </section>
    );
}

    return(
        <>
        <section className={`viewproduct ${showmodal?"viewproduct--blur":""}`}>
            <article className="viewproduct__inner">
            <div className="viewproduct__closec">
                <Link to='/'>
                    <button onClick={handlereset}>Return main catalog</button>
                </Link>
            </div>
            <article className="viewproduct__content">
                <h2>{singleprod.title}</h2>
                
                <div className="viewproduct__settings">
                    <p><b>Price:</b>${singleprod.price}</p>
                    <p><b>Category:</b>{singleprod.category}</p>
                </div>
                <div className="viewproduct__container">
                    <img className="viewproduct__image" src={singleprod.image} alt={singleprod.title} />
                    <div>
                    <button className="viewproduct__buybtn" data-price={singleprod.price} onClick={handleaddtocart}>Buy now!</button>
                    <p className="viewproduct__text">{singleprod.description}</p>
                    </div>
                </div>
            </article>
            </article>
        </section>
        {showmodal&&<aside className="viewproduct__modal">
                <section className="modal__content">
                    <div>
                        <button onClick={handlereset}>X</button>
                    </div>
                    <h3>{singleprod.title}</h3>
                    <p>Select the quantity:</p>
                    <div className="modal__qty">
                        <input type="number" min={1} value={qty} disabled/>
                        <div className="modal__buttons">
                            <button onClick={()=>changeqty('+')}>+</button>
                            <button onClick={()=>changeqty('-')}>-</button>
                        </div>
                        
                    </div>
                    <p><b>Price:</b>${pricecalc}</p>
                    <button data-id={singleprod.id} onClick={handleaddtoshoppingcart}>Add to cart</button>
                    <button>Go to Cart</button>
                </section>
                
            </aside>}
        </>
    );
}