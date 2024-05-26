import React, { useState, useEffect } from 'react';
import foto from '../assets/images/esculturas.jpg';

export default function ItemCarrito({ data, onRemove, actualizarTotalCarrito }) {
  const [cantidad, setCantidad] = useState(data.cantidad);
  const [totalItem, setTotalItem] = useState(data.precioObra);

  useEffect(() => {
    const nuevoTotal = cantidad * data.precioObra;
    setTotalItem(nuevoTotal);
  }, [cantidad]);

  function handleIncrease (){
    setCantidad((prevCantidad) => {
      return prevCantidad + 1;
    });
    actualizarTotalCarrito(data.precioObra, 1);
  };

  function handleDecrease () {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => {
        return prevCantidad - 1;
      });
      actualizarTotalCarrito(data.precioObra, -1);
    }
  };

  return (
    <div className='flex w-full flex-row justify-between p-5 shadow-lg rounded-md'>
      <div className='flex flex-row gap-11 '>
        <img className="rounded-2xl h-44 w-60" src={foto} alt="obra" />
        <div className='flex h-full flex-col gap-1'>
          <div className='font-semibold'>{data.nombreObra}</div>
          <div>{data.descripcionObra}</div>
          <div className='flex flex-row py-2'>
            <button onClick={handleDecrease} className='bg-Naranja rounded-tl-xl rounded-bl-xl px-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16" className='h-5 w-5'>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
              </svg>
            </button>
            <div className='bg-NaranjaTrans20 py-2 px-5 place-self-center flex text-gl font-semibold text-'>{cantidad}</div>
            <button onClick={handleIncrease} className='bg-Naranja rounded-tr-xl rounded-br-xl px-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" className='h-5 w-5'>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='flex gap-20 flex-row self-center'>
        <div className='font-semibold text-lg'>${totalItem.toFixed(2)}</div>
        <button onClick={onRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" className='fill-Azul w-8 h-8 hover:fill-Red'>
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
