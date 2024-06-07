import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import editar from "../assets/images/editar.svg";
import iconUsuario from "../assets/images/iconUsuario.svg";
import ItemCompras from "../components/ItemCompras";
import iconNombre from "../assets/images/iconNombre.svg";
import mail from "../assets/images/Mail.jpg";
import guardar from "../assets/images/guardar.svg";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import fotoDefault from '../assets/images/person-circle.svg';

export function PerfilComprador() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorSales, setErrorSales] = useState(null);
  const [edicion, setEdicion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadSales, setLoadSales] = useState(true);
  const [sales, setSales] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const getProfile = async () => {
    try {
      const response = await fetch("/api/user/perfil", {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud de perfil: " + response.statusText
        );
      }

      const data = await response.json();
      setProfileData(data);
    } catch (errorPerfil) {
      console.error("Error al obtener el perfil:", errorPerfil);
      setErrorPerfil(errorPerfil.message);
    } finally {
      setIsLoading(false);
    }
  };

  const mySales = async () => {
    try {
      const response = await fetch("/api/sales/history-purchases", {
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
    } catch (errorSales) {
      console.error("Error al obtener las compras:", errorSales);
      setErrorSales(errorSales.message);
    } finally {
      setLoadSales(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    mySales();
  }, []);

  if (isLoading || loadSales) {
    return (
      <div className="w-full h-full flex self-center justify-center text-4xl text-Azul ">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorPerfil) {
    return <div>ErrorPerfil: {errorPerfil}</div>;
  }

  if (errorSales) {
    return <div>ErrorSales: {errorSales}</div>;
  }

  const editProfile = () => {
    setEdicion(!edicion);
  };

  const removeEmptyFields = (data) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null || data[key].length === 0) {
        delete data[key];
      }
    });
    return data;
  };

  const onSubmit = async (data) => {
    const cleanedData = removeEmptyFields(data);
    if (cleanedData.correo) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = regexEmail.test(cleanedData.correo);
      if (!isValid) {
        alert("El correo es inválido");
        return;
      }
    }

    try {
      const response = await fetch("/api/user/perfil-buyer", {
        method: "PUT",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error(
          "Error en la actualización del perfil: " + response.statusText
        );
      }

      reset();
      const result = await response.json();
      console.log("Perfil actualizado:", result);
      await getProfile();
      setEdicion(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const determineProfilePhoto = () => {
    if (profileData.message.photo) {
      return profileData.message.photo;
    } else {
      return fotoDefault;
    }
  };

  const enviarDatos = () => {
    const rawData = getValues();
    onSubmit(rawData);
  };

  return (
    <>
      <NavBar />
      <div className="flex p-2.5 my-8">
        <div className="w-screen">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3 gap-4 min-w-60 lg:min-w-72 mx-6">
              <div className="w-full flex flex-col items-center">
                <div className="flex h-52 bg-portadaHome w-full rounded-3xl justify-between items-end p-2">
                  <button className="p-1">
                    <img
                      className="justify-start w-14 h-14"
                      src={editar}
                      onClick={editProfile}
                    />
                  </button>
                  <button
                    type="submit"
                    onClick={enviarDatos}
                    className={`p-1 ${edicion ? "" : "hidden"}`}
                  >
                    <img className="justify-start w-14 h-14" src={guardar} />
                  </button>
                </div>
                <div className="flex relative bg-white h-20 w-20 lg:h-36 lg:w-36 rounded-full place-content-center place-items-center -top-20 lg:-top-36">
                  <img
                    className="rounded-full h-16 w-16 lg:h-32 lg:w-32"
                    src={determineProfilePhoto()}
                  />
                </div>
              </div>
              <div className="flex items-center flex-col relative -top-20 lg:-top-36">
                <div className="flex flex-row py-3 place-items-center"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={iconUsuario} />
                    <input
                      className="font-medium w-full text-start text-lg p-1 placeholder:text-black"
                      readOnly
                      placeholder={
                        profileData ? profileData.message.user_name : "..."
                      }
                    />
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={iconNombre} />
                    <input
                      className="font-medium w-full text-start text-lg p-1 placeholder:text-black"
                      readOnly
                      placeholder={
                        profileData ? profileData.message.full_name : "..."
                      }
                    />
                  </div>
                  <form>
                    {(profileData?.message?.correo || edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img className="flex self-center justify-center h-7 w-7" src={mail} />
                        <input
                          className={`font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${edicion ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500": "outline-none"}`}
                          readOnly={!edicion}
                          placeholder={profileData.message.correo}
                          name="correo"
                          {...register("correo")}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full w-v">
                <h1>Mis compras</h1>
                {sales && sales.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-7 justify-start">
                            {sales.slice(0, 2).map((sale) => (
                                <ItemCompras
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
                <div className="flex justify-center">
                    <button>
                        <Link to="/Mis-Compras">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down fill-Azul w-8 h-8" viewBox="0 0 16 16" >
                                <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
          <div className="flex justify-center">
            <Link to="/Login">
              <Button text="Cerrar sesion" onClick={() => sessionStorage.clear()}></Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}