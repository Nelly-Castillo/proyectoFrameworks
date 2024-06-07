import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/Mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import tw from "../assets/images/twitter.svg";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useParams } from 'react-router-dom';

import fotoDefault from '../assets/images/person-circle.svg';

export function VerArtista() {
  const navigate = useNavigate();
  const { user_name } = useParams();

  const [profileData, setProfileData] = useState("");
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorWorks, setErrorWorks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadWorks, setLoadWorks] = useState(true);
  const [obrasPublicadas, setObrasPublicadas] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  async function getProfile() {
    try {
      const response = await fetch(`/api/user/perfil/${user_name}`, {
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
      const response = await fetch(`/api/publications/publications-artist/${user_name}`, {
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
  }, []);

  useEffect(() => {
    myWorks();
  }, []);

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

  const determineProfilePhoto = () => {
    return profileData.message.photo || fotoDefault;
  };

  return (
    <>
      <NavBar />
      <div className="flex p-2.5 my-8">
        <div className="w-screen">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3 gap-4 min-w-60 lg:min-w-72 mx-6">
              <div className="w-full flex flex-col items-center">
                <div className="flex relative bg-white h-20 w-20 lg:h-36 lg:w-36 rounded-full place-content-center place-items-center -top-20 lg:-top-36">
                  <img
                    className=" rounded-full h-16 w-16 lg:h-32 lg:w-32"
                    src={determineProfilePhoto()}
                  />
                </div>
              </div>
              <div className="flex items-center flex-col relative -top-20 lg:-top-36">
                <div className="flex flex-row py-3 place-items-center"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={iconUsuario} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData ? profileData.message.user_name : "..."}
                    </p>
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={iconNombre} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData ? profileData.message.full_name : "..."}
                    </p>
                  </div>
                  <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={ig} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.social_media_instagram}
                    </p>
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={mail} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.correo}
                    </p>
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={tiktok} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.social_media_tiktok}
                    </p>
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img className="flex self-center justify-center h-7 w-7" src={tw} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.social_media_x}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full w-v">
              <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start">
                {obrasPublicadas ? (
                  obrasPublicadas.slice(0, 12).map(function (obra) {
                    return (
                      <button key={obra.id_work}>
                        <a href={`/obra/${obra.id_work}`}>
                            <img
                            className="rounded-md w-20 md:w-36 lg:w-52 xl:w-64 xl:h-64 bg-cover"
                            src={obra.mainImageUrl}
                            alt={obra.title}
                            />
                        </a>
                      </button>
                    );
                  })
                ) : (
                  <div className=" font-thin text-xl">
                    No hay obras publicadas aún
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
