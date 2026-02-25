export function appreducer(state,action){
    switch(action.type){
        case 'add_to_cart':
        
        let searched=state.scart.find(el=>el.id === action.payload.id);
        if(!searched){
            
            return  {
                ...state,
                scart:[...state.scart,action.payload]
            }
        }
        
        const newscart=state.scart.map(el=>{
            if(el.id === action.payload.id){
                
                return {
                    ...el,
                    quantity:String(parseInt(el.quantity) + parseInt(action.payload.quantity))
                }
            }else{
                return el;
            }
        })

        return {
            ...state,
            scart:newscart
        }

        case 'remove_from_cart':
            //console.log(action.payload)        
            const newcart=state.scart.filter(el=>el.id !== action.payload)  //aqui cambie
            
            return {
                ...state,
                scart:newcart
            }
        

        case 'edit_cart':
            const newstatecart=state.scart.map(el=>{
                if(el.id === action.payload.id){
                    return{
                        ...el,
                        quantity:action.payload.qty
                    }
                }else{
                    return el;
                }
            })

        return {
            ...state,
            scart:newstatecart
        }

        case 'set_message':
            

        const otherstate={
            ...state,
            message:action.payload
        }
        
        return otherstate;

        case 'load_base':
        //console.log(action.payload)
        
        return{
            ...state,
            base:action.payload
        }

        case 'loadedtrue':
        //enciende y apaga la opcion de cargando, para el spinner de los productos
        return {
            ...state,
            isloaded:true
        }

        case 'loadedfalse':
        
        return {
            ...state,
            isloaded:false
        }

        case 'addfilters':

        return{
            ...state,
            filters:[...state.filters,action.payload]
        }

        case 'deletefilters':

        const newfilters=state.filters.filter(el=>el !== action.payload)

        return {
            ...state,
            filters:newfilters
        }

        case 'changeicon':
        // enciende o apaga el punto icono de carrito de compras
        return{
            ...state,
            seepoint:action.payload?true:false
        }

        case 'put_for_search':
        
        return {
            ...state,
            datatosearch:action.payload
        }

        default:
        return state;
    }
}