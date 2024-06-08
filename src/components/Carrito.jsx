import React, { useState, useEffect } from "react";
import { NavBar } from "./navBar";
import ItemCarrito from "./itemCarrito";
import { useNavigate, Link } from "react-router-dom";
import {Spinner} from "@nextui-org/spinner";

import fotoDefault from '../assets/images/person-circle.svg';

function Carrito() {

  const navigate = useNavigate();

  

  const [waiting, setwaiting] = useState(false)
  const token = sessionStorage.getItem("token");
  const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("carrito");
    
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
    setwaiting(true)

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
      const response = await fetch("api/sales/purchase", {
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

      const thankyou = {
        total: totalCarrito,
        links: body.message
      }

      setwaiting(false)
      sessionStorage.setItem("compra", JSON.stringify(thankyou))
      alert("Compra realizada con exito")
      navigate('/thankyou')
      
    } catch (error) {
      console.log(error);
      setwaiting(false)
      alert("Error al realizar la orden")
    }
  }

  const getInfo = async () => {

    try {
        const response = await fetch("/api/user/perfil", {
            method: "GET",
            headers: {
            token: token,
            "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.statusText);
        }
        const data = await response.json();
        setProfilePhoto(data.message.photo)
    } catch (error) {
    console.error("Error al obtener el perfil:", error);
    setError(error.message);
    }finally {
        setIsLoading(false);
    }
};

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
    getInfo();
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
      <NavBar image={profilePhoto} />
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
          <button disabled={waiting} onClick={handlePay} className="mt-5 bg-Azul px-10 py-4 text-white text-lg rounded-xl">
            {waiting ? <Spinner color="warning" /> : "Pagar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { Carrito };
