import React, { useState, useEffect } from "react";
import { NavBar } from '../components/navBar';
import ItemCompras from "../components/ItemCompras";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import fotoDefault from '../assets/images/person-circle.svg';

export function Compras() {
  const navigate = useNavigate();
  const [errorSales, setErrorSales] = useState(null);
  const [loadSales, setLoadSales] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
  const [sales, setSales] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);


  const mySales = async () => {
    try {
      const response = await fetch("/api/sales/history-purchases/", {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud del historial: " + response.statusText
        );
      }
      const data = await response.json();
      setSales(data.message);
      console.log(data.message);
    } catch (errorSales) {
      console.error("Error al obtener las compras:", errorSales);
      setErrorSales(errorSales.message);
    } finally {
      setLoadSales(false);
    }
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
  }
  };

  useEffect(() => {
    mySales();
  }, []);

  if (loadSales) {
    return (
      <div className="w-full h-full flex self-center justify-center text-4xl text-Azul ">
        <Spinner size="lg" />
      </div>
    );
  }


  if (errorSales) {
    return <div>ErrorSales: {errorSales}</div>;
  }




  return  (
    <>
      {token ? <NavBar image={profilePhoto} /> : <NavBarNotAuth/>}
        <div className="flex p-2.5 my-8">
            <div className="w-screen">
                <div className="flex flex-col justify-center items-center w-full w-v">
                    <h1>Mis compras</h1>
                    {sales && sales.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start">
                            {sales.map((sale) => (
                            <ItemCompras
                                id_work={sale.id_work}
                                id_purchase={sale.id_purchase}
                                title={sale.title}
                                artist={sale.artist}
                                description={sale.description}
                                total={sale.total}
                                foto={sale.mainImageUrl}
                            />
                            ))}
                        </div>
                        ) : (
                        <div className="text-center text-gray-500">
                            <h2>No has realizado ninguna compra</h2>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </>
  );
} 