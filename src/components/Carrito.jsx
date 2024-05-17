import React, { useState, useEffect } from "react";
import { NavBar } from "./navBar";
import ItemCarrito from "./itemCarrito";
import { obrass as obrasIniciales } from "./obrass";
import { Link } from "react-router-dom";

function Carrito() {
  const [data, setData] = useState(obrasIniciales.map((obra)=>({...obra, cantidad: 1})));
  const [totalCarrito, setTotalCarrito] = useState(
    obrasIniciales.reduce((acu, obra) => acu + obra.precioObra, 0)
  );

  function eliminarObra(index) {
    const obraEliminada = data[index];
    const newObras = data.filter((_, i) => i !== index);
    setData(newObras);
    setTotalCarrito((precTotal) => precTotal - (obraEliminada.precioObra*obraEliminada.cantidad));
  }

  function actualizarTotalCarrito(precioObra, cambioCantidad) {
    setTotalCarrito((precTotal) => precTotal + (precioObra * cambioCantidad));
    console.log(cambioCantidad)
  } 

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <NavBar />
      <div className="px-28 pb-9 flex flex-col">
        <div className="border-b-4 border-Naranja pb-7">
          {data.map((obra, index) => (
            <ItemCarrito
              key={index}
              data={obra}
              onRemove={() => eliminarObra(index)}
              actualizarTotalCarrito={actualizarTotalCarrito}
            />
          ))}
        </div>
        <div className="flex flex-row mt-14 justify-between">
          <div className="text-4xl">Total:</div>
          <div className=" text-4xl font-semibold">${totalCarrito.toFixed(2)}</div>
        </div>
        <Link className="flex self-center" to="/">
          <button className=" mt-11 bg-Azul px-12 py-7 text-white w-min font-semibold text-2xl rounded-3xl">Pagar</button>
        </Link>
      </div>
    </div>
  );
}

export { Carrito };
