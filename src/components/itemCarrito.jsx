import React, { useState, useEffect } from 'react';
import foto from '../assets/images/esculturas.jpg';
import basura from '../assets/images/eliminar.svg';
import mas from '../assets/images/mas.svg';
import menos from '../assets/images/menos.svg';

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
    <div className='flex w-full flex-row justify-between py-4'>
      <div className='flex flex-row gap-11 '>
        <img className="rounded-2xl h-44 w-60" src={foto} alt="obra" />
        <div className='flex h-full flex-col gap-1'>
          <div className='font-semibold'>{data.nombreObra}</div>
          <div>{data.descripcionObra}</div>
          <div className='flex flex-row p-2'>
            <button onClick={handleDecrease} className='self-center bg-Naranja rounded-tl-2xl rounded-bl-2xl p-3'>
              <img className="h-6 w-6" src={menos} alt="decrease" />
            </button>
            <div className='bg-Naranja py-2 px-8 place-self-center flex opacity-65 text-xl font-semibold'>{cantidad}</div>
            <button onClick={handleIncrease} className='bg-Naranja rounded-tr-2xl rounded-br-2xl p-3'>
              <img className="h-6 w-6" src={mas} alt="increase" />
            </button>
          </div>
        </div>
      </div>
      <div className='flex gap-20 flex-row self-center'>
        <div className='font-semibold text-4xl'>${totalItem.toFixed(2)}</div>
        <button onClick={onRemove}>
          <img className='h-14 w-14' src={basura} alt="delete" />
        </button>
      </div>
    </div>
  );
}
