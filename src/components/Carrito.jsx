import React from 'react';
import { useState } from 'react';
import foto from '../assets/images/esculturas.jpg';
import { NavBar } from './navBar';

const itemCarrito = () => {
  const [cantidad, setCantidad] = useState(0);
  return(
    <div className='flex flex-row justify-stretch'>
      <div className=' gap-11 '>
        <img className=" h-44 w-60" src={foto}/>
        <div className=' h-full flex-col gap-1'>
          <div>{nombreObra}</div>
          <div>{descripcionObra}</div>
          <div className=' p-2'>
            <button className=' bg-Naranja rounded-tl-2xl rounded-bl-2xl'>-</button>
            <div>{cantidad}</div>
            <button className='bg-Naranja rounded-tr-2xl rounded-br-2xl '>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Carrito(){
  return(
    <>
      <NavBar/>
      <div className=' px-7 flex'>
      <itemCarrito/>
      </div>
    </>
  );
}

export {Carrito};