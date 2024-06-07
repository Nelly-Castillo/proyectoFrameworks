import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/Mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import tw from "../assets/images/twitter.svg";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useParams } from 'react-router-dom';

import fotoDefault from '../assets/images/person-circle.svg';

export function VerArtista() {
  const navigate = useNavigate();
  const { user_name } = useParams();

  const [profileData, setProfileData] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
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
    getInfo();
  }, []);

  useEffect(() => {
    myWorks();
  }, []);

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
        //debugger
        setProfilePhoto(data.message.photo)
    } catch (error) {
    console.error("Error al obtener el perfil:", error);
    setError(error.message);
    }
};

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
      <NavBar image={profilePhoto} />
      <div className="flex p-2.5 my-8">
        <div className="w-screen">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3  min-w-60 lg:min-w-72 mx-6">
              <div className="w-full flex flex-col items-center">
                <div className="flex  bg-white h-20 w-20 lg:h-36 lg:w-36 rounded-full place-content-center place-items-center -top-20 lg:-top-36">
                  <img
                    className=" rounded-full h-16 w-16 lg:h-32 lg:w-32"
                    src={determineProfilePhoto()}
                  />
                </div>
              </div>
              <div className="flex items-center flex-col -top-20 lg:-top-36">
                <div className="flex flex-row py-3 place-items-center"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="grid grid-cols-2 items-center">
                    <div className="p-1 flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill fill-VerdeCl " viewBox="0 0 16 16">
                          <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                        <p className=" font-medium w-full text-start text-lg p-1 text-VerdeOs">
                          {profileData.message.score_like  === 0 ? " " : profileData.message.score_like}
                        </p>
                    </div>
                    <div className="p-1 flex flex-row gap-2 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-down-fill fill-Red " viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                          </svg>
                        <p className=" font-medium w-full text-start text-lg p-1 text-RedOs">
                        {profileData.message.score_dislike === 0 ? " " : profileData.message.score_dislike}
                        </p>
                    </div> 
                  </div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={iconUsuario} />
                      <p className=" font-medium w-full text-start text-lg p-1">
                        {profileData ? profileData.message.user_name : "..."}
                      </p>
                  </div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={iconNombre} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData ? profileData.message.full_name : "..."}
                    </p>
                  </div>
                  <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={ig} />
                      <p className=" font-medium w-full text-start text-lg p-1">
                        {profileData.message.social_media_instagram}
                      </p>
                  </div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={mail} />
                      <p className=" font-medium w-full text-start text-lg p-1">
                        {profileData.message.correo}
                      </p>
                  </div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={tiktok} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.social_media_tiktok}
                    </p>
                  </div>
                  <div className="p-1 flex flex-row gap-2">
                    <img className="flex self-center justify-center h-5 w-5" src={tw} />
                    <p className=" font-medium w-full text-start text-lg p-1">
                      {profileData.message.social_media_x}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full w-v">
              <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start gallery-profile-container overflow-y-scroll">
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
