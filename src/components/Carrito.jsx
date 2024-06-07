import React, { useState, useEffect } from "react";
import { NavBar } from "./navBar";
import ItemCarrito from "./itemCarrito";
import { obrass as obrasIniciales } from "./obrass";
import { Link } from "react-router-dom";

function Carrito() {

  const token = sessionStorage.getItem("token");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("carrito");
    // return savedData ? JSON.parse(savedData) : obrasIniciales;
    return JSON.parse(savedData) || [];
  });

  const [totalCarrito, setTotalCarrito] = useState(
    // ()=>{
    // const totalStorage = localStorage.getItem("totalCarrito");
    // return totalStorage ? JSON.parse(totalStorage) : obrasIniciales.reduce((acu, obra) => acu + obra.precioObra, 0)}
    0
  );

  async function handlePay(e) {
    e.preventDefault();

    const formatedData = {
      purchases: data.map((product) => (
        {
          id_work: product.id,
          quantity: product.cantidad,
          total: product.precioObra * product.cantidad
        }
      )),
      total_ammount: totalCarrito
    }

    console.log(formatedData);

    try {
      const response = await fetch("http://localhost:3000/sales/purchase", {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formatedData)
      })

      if (!response.ok) {
        alert("Error al realizar la orden")
      }

      const body = await response.json()

      console.log(body);

      alert("Compra realizada con exito")
      
    } catch (error) {
      console.log(error);
      alert("Error al realizar la orden")
    }
  }

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
    // actualizarTotalCarrito(nuevaData[index].precioObra, nuevaCantidad - data[index].cantidad);
  }

  function agregarObra(obra) {
    const nuevaData = [...data];
    nuevaData.push(obra);
    setData(nuevaData);
  }

  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(data.map((obra) => ({ id: obra.id, nombreObra: obra.nombreObra, descripcionObra: obra.descripcionObra, precioObra: obra.precioObra, cantidad: obra.cantidad, image: obra.image })))
    );
    // localStorage.setItem("totalCarrito", JSON.stringify(totalCarrito));
    let total = 0
    data.forEach(product => {
      total += product.precioObra * product.cantidad
    });

    setTotalCarrito(total)
    
    // setTotalCarrito(data.map((product) => product.precioObra * product))

  }, [data]);

  // Este es para cuando vuelve a iniciar, jala lo de local storage
  useEffect(() => {
    const savedData = localStorage.getItem("carrito");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data])
  

  return (
    <div>
      <NavBar />
      <div className="px-28 pb-9 flex flex-col">
        <div className="border-b-4 border-Naranja pb-7">
          {data.map((obra, index) => (
            <ItemCarrito
              key={obra.id_work}
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
        <div className="flex self-center">
          <button onClick={handlePay} className="mt-5 bg-Azul px-10 py-4 text-white text-lg rounded-xl">Pagar</button>
        </div>
      </div>
    </div>
  );
}

export { Carrito };
