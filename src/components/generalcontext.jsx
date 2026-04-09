import React, { useContext } from "react";
import { useReducer } from "react";
import { appreducer } from "./appreducer";
import { createContext } from "react";
import { useEffect } from "react";


const initialmessage={
    text:'',
    color:''
}

/////////////////recomendacion gemini lazy carga y lo quitas del reducer y del effect
// scart:JSON.parse(localStorage.getItem('scartreact')) || []
const initialgeneralstate={
    base:[],
    message:initialmessage,
    isloaded:false,     //si aparece el spinner de carga o no mientras carga
    filters:[],     //los filtros
    scart:JSON.parse(localStorage.getItem('scartreact')) || [],        //el lo que guarda shopping cart
    seepoint:!localStorage.getItem('scartreact')?false:true,
    datatosearch:''             //dato que busca datalist
};

export const Catalogcontext=createContext();

export function CatalogcontextProvider({children}){
const [generalstate,dispatch]=useReducer(appreducer,initialgeneralstate)

useEffect(()=>{
    const timer=setTimeout(()=>{
        dispatch({
            type:'set_message',
            payload:initialmessage
        })
    },4000)

   return ()=>clearTimeout(timer)
},[generalstate.message.text])

//////////////////////////////////////////////////////////////////////////////
//****************otra opcion manejar message */
// const showTemporaryMessage = (msgData) => {
//     // 1. Mostrar el mensaje
//     dispatch({ type: 'set_message', payload: msgData });

//     // 2. Programar la limpieza
//     setTimeout(() => {
//         dispatch({ type: 'set_message', payload: { text: '', color: '' } });
//     }, 3000);
// };
///////////////////////////////////////////////////////////////////////////////

useEffect(()=>{
    //trae la info de fakeapistore
    const controller=new AbortController()
    const {signal}=controller
    let tu;

    const getdata=async ()=>{
        try {
            tu=setTimeout(()=>{
                controller.abort()
            },10000)

            dispatch({
                type:'loadedtrue'
            })
            let res=await fetch('https://fakestoreapi.com/products',{signal});
            console.log(res)
            if(!res.ok){
                // const errorproduced={
                //     text:res.statusText || `There was an error  ${res.status} reading api fakestore`,
                //     color:'red'
                // }
                let err=new Error(`There was an error  ${res.status} reading api fakestore`)
                throw err
            }

            let dataforload=await res.json()
            dispatch({
                type:'load_base',
                payload:dataforload
            })
            dispatch({
                type:'loadedfalse'
            })
            
        } catch (error) {
            let message=error.message==='Failed to fetch'&&'There was an error reading api fakestore'
            let errosend={
                text:message,
                color:'red'
            }

            dispatch({
                type:'set_message',
                payload:errosend
            })
            dispatch({
                type:'loadedfalse'
            })
           
            
        }
    }

    if(generalstate.base.length === 0){
        
        getdata();
    }

    return ()=>{
        controller.abort()
        clearTimeout(tu)
    }

},[])

useEffect(()=>{
 
    if(localStorage.getItem('scartreact')){
            dispatch({
                type:'changeicon',
                payload:true
             })
    }
    
    if(generalstate.scart.length === 0){
        dispatch({
                type:'changeicon',
                payload:false
             })
    
    }
    
},[generalstate.scart])



    return (
        <Catalogcontext.Provider value={{generalstate,dispatch}}>
            {children}
        </Catalogcontext.Provider>
    );
}