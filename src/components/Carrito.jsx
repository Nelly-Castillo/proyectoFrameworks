import React, { useState, useEffect } from "react";
import { NavBar } from "./navBar";
import ItemCarrito from "./itemCarrito";
import { obrass as obrasIniciales } from "./obrass";
import { Link } from "react-router-dom";

function Carrito() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("carrito");
    return savedData ? JSON.parse(savedData) : obrasIniciales;
  });

  const [totalCarrito, setTotalCarrito] = useState(()=>{
    const totalStorage = localStorage.getItem("totalCarrito");
    return totalStorage ? JSON.parse(totalStorage) : obrasIniciales.reduce((acu, obra) => acu + obra.precioObra, 0)});

  function eliminarObra(index) {
    const obraEliminada = data[index];
    const newObras = data.filter((_, i) => i !== index);  
    setData(newObras);
    setTotalCarrito((precTotal) => precTotal - (obraEliminada.precioObra * obraEliminada.cantidad));
  }

  function actualizarTotalCarrito(precioObra, cambioCantidad) {
    setTotalCarrito((precTotal) => precTotal + (precioObra * cambioCantidad));
  }

  function actualizarCantidad(index, nuevaCantidad) {
    const nuevaData = [...data];
    nuevaData[index].cantidad = nuevaCantidad;
    setData(nuevaData);
    actualizarTotalCarrito(nuevaData[index].precioObra, nuevaCantidad - data[index].cantidad);
  }

  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(data.map((obra) => ({ id: obra.id, nombreObra: obra.nombreObra, descripcionObra: obra.descripcionObra, precioObra: obra.precioObra, cantidad: obra.cantidad })))
    );
    localStorage.setItem("totalCarrito", JSON.stringify(totalCarrito));
  }, [data]);

  // Este es para cuando vuelve a iniciar, jala lo de local storage
  useEffect(() => {
    const savedData = localStorage.getItem("carrito");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

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
              actualizarCantidad={(nuevaCantidad) => actualizarCantidad(index, nuevaCantidad)}
            />
          ))}
        </div>
        <div className="flex flex-row mt-10 justify-between">
          <div className="text-3xl">Total:</div>
          <div className="text-3xl font-semibold">${totalCarrito}</div>
        </div>
        <Link className="flex self-center" to="/">
          <button className="mt-5 bg-Azul px-10 py-4 text-white text-lg rounded-xl">Pagar</button>
        </Link>
      </div>
    </div>
  );
}

export { Carrito };
