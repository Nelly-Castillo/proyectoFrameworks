import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import star from "../assets/images/starFilled.svg";
import editar from "../assets/images/editar.svg";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/Mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import tw from "../assets/images/twitter.svg";
import guardar from "../assets/images/guardar.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useForm } from 'react-hook-form';

export function PerfilVendedor() {
  const [profileData, setProfileData] = useState("");
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorWorks, setErrorWorks] = useState(null);
  const [edicion, setEdicion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadWorks, setLoadWorks] = useState(true);
  const [obrasPublicadas, setObrasPublicadas] = useState(null);
  const token = sessionStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  async function getProfile() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token no proporcionado");
      setError("Token no proporcionado");
      setIsLoading(false);
      console.error("Token no proporcionado");
      setError("Token no proporcionado");
      setIsLoading(false);
      return;
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
  }

  async function myWorks() {
    try {
      const response = await fetch("/api/publications/publications-yours", {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud de las obras: " + response.statusText
        );
      }
      const data = await response.json();
      setObrasPublicadas(data.message);
    } catch (errorWorks) {
      console.error("Error al obtener las obras:", errorWorks);
      setErrorWorks(errorWorks.message);
    } finally {
      setLoadWorks(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [profileData]);

  useEffect(() => {
    myWorks();
  }, [obrasPublicadas]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex self-center justify-center text-4xl text-Azul ">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorPerfil) {
    return <div>ErrorPerfil: {errorPerfil}</div>;
  }

  if (loadWorks) {
    return (
      <div className="w-full h-full flex self-center justify-center text-4xl text-Azul ">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorWorks) {
  }

  function editProfile() {
    return edicion ? setEdicion(false) : setEdicion(true);
  }

  return (
    <>
      <NavBar />
      <div className="flex p-2.5 my-8">
        <div className=" w-screen">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3 gap-4 min-w-60 lg:min-w-72 mx-6">
              <div className="w-full flex flex-col items-center">
                <div className="flex h-52 bg-portadaHome w-full rounded-3xl justify-between items-end p-2">
                  <button className="p-1">
                    <img
                      className=" justify-start w-14 h-14"
                      src={editar}
                      onClick={editProfile}
                    />
                  </button>
                  <button
                    type="submit"
                    className={`p-1 ${edicion === true ? "" : "hidden"}`}
                  >
                    <img className=" justify-start w-14 h-14" src={guardar} />
                  </button>
                </div>
                <div className="flex relative bg-white h-20 w-20 lg:h-36 lg:w-36 rounded-full place-content-center place-items-center -top-20 lg:-top-36">
                  <img
                    className=" rounded-full h-16 w-16 lg:h-32 lg:w-32"
                    src={profileData.message.photo}
                  />
                </div>
              </div>
              <div className="flex items-center flex-col relative -top-20 lg:-top-36">
                <div className="flex flex-row py-3 place-items-center"></div>
                <div className="flex flex-col gap-2 w-full">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                      className={`p-2 flex flex-row gap-3 ${edicion ? "" : ""}`}
                    >
                      <img className="h-7 w-7" src={iconUsuario} />
                      <input
                        className=" font-bold w-full text-start text-lg"
                        readOnly={!edicion}
                        placeholder={
                          profileData ? profileData.message.user_name : "..."
                        }
                        name="user_name" 
                        {...register("user_name")}
                      />
                    </div>
                    <div
                      className={`p-2 flex flex-row gap-3 ${edicion ? "" : ""}`}
                    >
                      <img className="h-7 w-7" src={iconNombre} />
                      <input
                        className=" font-bold w-full text-start text-lg"
                        readOnly={!edicion}
                        placeholder={
                          profileData ? profileData.message.full_name : "..."
                        }
                        name="full_name" 
                        {...register("full_name")}
                      />
                    </div>
                    <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
                    {profileData?.message?.social_media_instagram ||
                      (edicion && (
                        <div
                          className={`p-2 flex flex-row gap-3 ${
                            edicion ? "" : ""
                          }`}
                        >
                          <img className="h-7 w-7" src={ig} />
                          <input
                            className=" font-bold w-full text-start text-lg"
                            readOnly={!edicion}
                            placeholder={
                              profileData.message.social_media_instagram
                            }
                            name="insta" 
                            {...register("insta")}
                          />
                        </div>
                      ))}
                    {profileData?.message?.correo ||
                      (edicion && (
                        <div
                          className={`p-2 flex flex-row gap-3 ${
                            edicion ? "" : ""
                          }`}
                        >
                          <img className="h-7 w-7" src={mail} />
                          <input
                            className=" font-bold w-full text-start text-lg"
                            readOnly={!edicion}
                            placeholder={profileData.message.correo}
                          />
                        </div>
                      ))}
                    {(profileData?.message?.social_media_tiktok || edicion) && (
                      <div
                        className={`p-2 flex flex-row gap-3 ${
                          edicion ? "" : ""
                        }`}
                      >
                        <img className="h-7 w-7" src={tiktok} />
                        <input
                          className=" font-bold w-full text-start text-lg"
                          readOnly={!edicion}
                          placeholder={profileData.message.social_media_tiktok}
                        />
                      </div>
                    )}
                    {profileData?.message?.social_media_x ||
                      (edicion && (
                        <div
                          className={`p-2 flex flex-row gap-3 ${
                            edicion ? "" : ""
                          }`}
                        >
                          <img className="h-7 w-7" src={tw} />
                          <input
                            className=" font-bold w-full text-start text-lg"
                            readOnly={!edicion}
                            placeholder={profileData.message.social_media_x}
                          />
                        </div>
                      ))}
                  </form>
                </div>
                <div className="flex flex-row m-2.5 h-16">
                  <div className="mx-5 h-full w-16">
                    <Link to="/Mis-Compras">
                      <Button text="Mis compras"></Button>
                    </Link>
                  </div>
                  <div className="mx-5 h-full w-16">
                    <Link to="/Crear">
                      <Button text="Publicar"></Button>
                    </Link>
                  </div>
                </div>
                <button
                  className=" mt-5 flex justify-center h-full"
                  onClick={() => sessionStorage.clear()}
                >
                  <Link to="/">
                    <div className=" underline-offset-4 underline">
                      Cerrar sesión
                    </div>
                  </Link>
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center w-full w-v">
              <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start">
                {obrasPublicadas ? (
                  obrasPublicadas.map(function (obra) {
                    return (
                      <button key={obra.id_work}>
                        <img
                          className="rounded-md w-20 md:w-36 lg:w-52 xl:w-64 xl:h-64 bg-cover"
                          src={obra.mainImageUrl}
                          alt={obra.title}
                        />
                      </button>
                    );
                  })
                ) : (
                  <div className=" font-thin text-xl">
                    No hay trabajos publicados aún
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
