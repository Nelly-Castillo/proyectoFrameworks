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
import {Spinner} from "@nextui-org/react";

export function PerfilVendedor() {
  const [profileData, setProfileData] = useState("");
  const [error, setError] = useState(null);
  const [edicion, setEdicion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [obrasPublicadas, setObrasPublicadas] = useState([]);
  const token = sessionStorage.getItem("token");

  const url = "https://bucketdealesitacomunarte.s3.amazonaws.com/";

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
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();
      setProfileData(data);
      if (data.message && data.message.works) {
        setObrasPublicadas(data.message.works.split(","));
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // async function getPublished(){

  // }

  useEffect(() => {
    getProfile();
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex self-center justify-center text-4xl text-Azul ">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function editProfile(){
    return edicion ? setEdicion(false) : setEdicion(true); 
  }

  return (
    <div>
      {/* <button className="p-1">
      <img className=" justify-start w-16 h-16" src={editar} />
    </button> */}
      <NavBar />
      <div className="flex p-2.5 my-8">
        <div>
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3 mx-3 gap-4">
              <div className="w-full flex flex-col items-center">
                <div className="flex h-52 bg-portadaHome w-full rounded-3xl justify-between items-end p-2">
                <button className="p-1">
                  <img className=" justify-start w-14 h-14" src={editar} onClick={editProfile} />
                </button>
                <button className={`p-1 ${edicion === true ? '' : 'hidden'}`}>
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
                <div className="flex flex-row py-3 place-items-center">
                  <img className=" h-7 w-7" src={star} />
                  <img className=" h-7 w-7" src={star} />
                  <img className=" h-7 w-7" src={star} />
                  <img className=" h-7 w-7" src={star} />
                  <img className=" h-7 w-7" src={star} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                    <img className="h-7 w-7" src={iconUsuario} />
                    <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData ? profileData.message.user_name : "..."}
                    />
                  </div>
                  <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                    <img className="h-7 w-7" src={iconNombre} />
                    <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData ? profileData.message.full_name : "..."}
                    />
                  </div>
                  <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
                  {profileData?.message?.social_media_instagram && (
                    <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                      <img className="h-7 w-7" src={ig} />
                      <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData.message.social_media_instagram}
                      />
                    </div>
                  )}
                  {profileData?.message?.correo && (
                    <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                      <img className="h-7 w-7" src={mail} />
                      <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData.message.correo}
                      />
                    </div>
                  )}
                  {profileData?.message?.social_media_tiktok && (
                    <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                      <img className="h-7 w-7" src={tiktok} />
                      <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData.message.social_media_tiktok}
                      />
                    </div>
                  )}
                  {profileData?.message?.social_media_x && (
                    <div className={`p-2 flex flex-row gap-3 ${edicion ? '': ''}`}>
                      <img className="h-7 w-7" src={tw} />
                      <input className=" font-bold w-full text-start text-lg" readOnly={!edicion} placeholder={profileData.message.social_media_x}
                      />
                    </div>
                  )}
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
                <button className=" mt-5 flex justify-center h-full" onClick={()=>sessionStorage.clear()}>
                  <Link to="/">
                    <div className=" underline-offset-4 underline">
                      Cerrar sesión
                    </div>
                  </Link>
                </button>
              </div>
            </div>
            <div className=" flex flex-row flex-wrap justify-evenly w-full gap-y-10">
              {obrasPublicadas
                ? obrasPublicadas.map(function (obra) {
                    return (
                      <button>
                        <img
                        className="rounded-md w-64 h-64 bg-cover"
                        src={`${url}${obra}`}
                      />
                      </button>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
