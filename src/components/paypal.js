// paypal-module.js
import { emptylocalstorage } from "./addlocalstorage";

export function initPayPalButton(listaProductos,totalAmount,tax, containerId,dispatch,navigate) {
    console.warn('dato que llegan',listaProductos,totalAmount,tax)
    //totalamoun es el total que se envia
    //containerId es el contenedor donde estaran los botones '#paypal-button-container'

    // item_total: La suma de (precio × cantidad) de todos los productos sin impuestos.

    // tax_total: El monto total de impuestos.

    // value (el de arriba): Debe ser exactamente la suma de item_total + tax_total.
    let totafinal=(parseFloat(totalAmount) + parseFloat(tax)).toFixed(2);

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: totafinal.toString(),  //total final + impuestos
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalAmount.toString()   //total suma de productos sin impuestos
                            },
                            //impuestos poner aqui
                            tax_total: {
                                currency_code: "USD",
                                value: tax         //"15.00" // El 15% de impuesto
                            },
                            // shipping: {
                            //     currency_code: "USD",
                            //     value: "10.00" // El 10% de envío
                            // }
                        }
                    },
                    // Mapeo directo sin divisiones
                    items: listaProductos.map(item => ({
                        name: item.name,
                        unit_amount: {
                            currency_code: "USD",
                            value: item.unit_amount.value // Ya viene con 2 decimales desde index.js
                        },
                        quantity: item.quantity.toString()
                    }))
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Aquí podrías disparar un evento personalizado o una función de éxito
                console.log("Pago exitoso:", details);
                
                emptylocalstorage();
                navigate('/');   //para que vaya a la /

                dispatch({
                    type:'empty_cart'
                })

                let sendmessage={ 
                        text: 'Payment successfull.', 
                        color: 'green' 
                }
                dispatch({
                    type:'set_message',
                    payload:sendmessage
                })
                
                
            })
            
            .catch(function(error) {
                let sendmessage={ 
                        text: 'Were sorry, there was a technical problem processing your payment. Please try again.', 
                        color: 'red' 
                }
                dispatch({
                    type:'set_message',
                    payload:sendmessage
                })
                  
                });
        },
        onCancel: function (data) {
            let sendmessage={
                text: 'The payment was cancelled. Your items are still in the cart.',
                color: 'orange'
            };
            dispatch({
                type:'set_message',
                payload:sendmessage
            })
                    
                        
                    
        },
        onError: function(err) {
            console.error("Error en el flujo de PayPal:", err);
            let sendmessage={
                text: 'The transaction was interrupted or could not be completed. Please verify your payment method or try again.',
                color: 'red'
            };
            dispatch({
                type:'set_message',
                payload:sendmessage
            })
        }
    }).render(containerId);
}