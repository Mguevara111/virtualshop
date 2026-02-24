import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import { Maincatalog } from './components/maincatalog';
import { Layout } from './components/layout';
import { Viewproduct } from './components/viewproduct';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';
import { Message } from './components/message';
import { E404 } from './components/E404';
import './App.css'

function App() {
  
  return (
    <>
    <Message></Message>
    <Routes>
        <Route path='/' element={<Layout></Layout>}>
            <Route index element={<Maincatalog></Maincatalog>}></Route>
            <Route path='product/:id' element={<Viewproduct></Viewproduct>}></Route>
        </Route>

        <Route path='cart' element={<Cart></Cart>}></Route>
        <Route path='checkout' element={<Checkout></Checkout>}></Route>
        <Route path='*' element={<E404></E404>}></Route>
    </Routes>
    </>
  )
}

export default App
