export const emptylocalstorage=()=>{
    
    localStorage.removeItem('scartreact')
    
}

export const deletefromlocalstorage=(data)=>{
    let prov=JSON.parse(localStorage.getItem('scartreact'))

    const searched=prov.filter(el=>el.id !== data.id)

    if(searched.length === 0){
        emptylocalstorage();
        return;
    }
    localStorage.setItem('scartreact',JSON.stringify(searched))
}

export const changeqty=(newcart)=>{
    //paso todo scart con nuevos datos, nuevos cantidades
    if(!localStorage.getItem('scartreact')){
        return;
    }
    
    localStorage.setItem('scartreact',JSON.stringify(newcart))
}

export const updatelocalstorage=(data)=>{
    //data un elemento, el objeto del array
    if(!localStorage.getItem('scartreact')){
        localStorage.setItem('scartreact',JSON.stringify([data]))
        return;
    }
    let prov=JSON.parse(localStorage.getItem('scartreact'))
    localStorage.removeItem('scartreact')
    
    const p=prov.find(el=>el.id === data.id);

    if(!p){
        prov=[...prov,data];
        localStorage.setItem('scartreact',JSON.stringify(prov))
        return;
    }

    const newinsert=prov.map(el=>{
        if(el.id === data.id){
            return {
                ...el,
                quantity:String(parseInt(el.quantity) + parseInt(data.quantity))
            }
        }else{
            return el;
        }
    })
    
    localStorage.setItem('scartreact',JSON.stringify(newinsert))
}