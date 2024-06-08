import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import editar from "../assets/images/editar.svg";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/Mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import paypal from "../assets/images/paypal.svg";
import tw from "../assets/images/twitter.svg";
import guardar from "../assets/images/guardar.svg";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import fotoDefault from "../assets/images/person-circle.svg";

export function PerfilVendedor() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [errorWorks, setErrorWorks] = useState(null);
  const [edicion, setEdicion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadWorks, setLoadWorks] = useState(true);
  const [obrasPublicadas, setObrasPublicadas] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(fotoDefault);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  async function getProfile() {
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
      // debugger;
      setProfileData(data);
    } catch (errorPerfil) {
      console.error("Error al obtener el perfil:", errorPerfil);
      setErrorPerfil(errorPerfil.message);
    } finally {
      setIsLoading(false);
    }
  }

  function limpiarStorage(){
    sessionStorage.clear()
    localStorage.clear()
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

  useEffect(()=>{
    getInfo();
  })
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

  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null || data[key].length === 0) {
        delete data[key];
      }
    });
    return data;
  }

  async function onSubmit(data) {
    const cleanedData = removeEmptyFields(data);
    //console.log(cleanedData);
    if (cleanedData.correo) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValid = regexEmail.test(cleanedData.correo)

        if (!isValid) {
          alert("El correo es inválido")
          return
        }
    }
    if (cleanedData.cuenta_paypal) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValid = regexEmail.test(cleanedData.cuenta_paypal)

        if (!isValid) {
          alert("El correo de PayPal es inválido")
          return
        }
    }

    try {
      const response = await fetch("/api/user/perfil-artist", {
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
      setEdicion(false);
      await getProfile();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  }

  const determineProfilePhoto = () => {
    //debugger;
    if (profileData.message.photo) {
      return profileData.message.photo;
    } else {
      return fotoDefault;
    }
  };

  function enviarDatos() {
    const rawData = getValues();
    onSubmit(rawData);
  }

  // function obraParaEditar(idWork){
  //   setIdObra(idWork)
  //   console.log("idwork:", idWork)
  // }


  return (
    <>
      <NavBar image={profilePhoto}/>
      <div className="flex p-2.5 my-8">
        <div className="w-screen">
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
                    onClick={enviarDatos}
                    className={`p-1 ${edicion === true ? "" : "hidden"}`}
                  >
                    <img className=" justify-start w-14 h-14" src={guardar} />
                  </button>
                </div>
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
                    <img
                      className="flex self-center justify-center h-7 w-7"
                      src={iconUsuario}
                    />
                    <input
                      className=" font-medium w-full text-start text-lg p-1 placeholder:text-black"
                      readOnly
                      placeholder={
                        profileData ? profileData.message.user_name : "..."
                      }
                    />
                  </div>
                  <div className="p-2 flex flex-row gap-3">
                    <img
                      className="flex self-center justify-center h-7 w-7"
                      src={iconNombre}
                    />
                    <input
                      className=" font-medium w-full text-start text-lg p-1 placeholder:text-black"
                      readOnly
                      placeholder={
                        profileData ? profileData.message.full_name : "..."
                      }
                    />
                  </div>
                  <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
                  <form>
                    {(profileData?.message?.social_media_instagram ||
                      edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img
                          className="flex self-center justify-center h-7 w-7"
                          src={ig}
                        />
                        <input
                          className={` font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${
                            edicion
                              ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500"
                              : "outline-none"
                          }`}
                          readOnly={!edicion}
                          placeholder={
                            profileData.message.social_media_instagram
                          }
                          name="social_media_instagram"
                          {...register("social_media_instagram")}
                        />
                      </div>
                    )}
                    {(profileData?.message?.correo || edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img
                          className="flex self-center justify-center h-7 w-7"
                          src={mail}
                        />
                        <input
                          className={` font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${
                            edicion
                              ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500"
                              : "outline-none"
                          }`}
                          readOnly={!edicion}
                          placeholder={profileData.message.correo}
                          name="correo"
                          {...register("correo")}
                        />
                      </div>
                    )}
                    {(profileData?.message?.cuenta_paypal || edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img className="flex self-center justify-center h-7 w-7" src={paypal} />
                        <input
                          className={` font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${edicion ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500": "outline-none"}`}
                          readOnly={!edicion}
                          placeholder={profileData.message.cuenta_paypal}
                          name="cuenta_paypal"
                          {...register("cuenta_paypal")}
                        />
                      </div>
                    )}
                    {(profileData?.message?.social_media_tiktok || edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img
                          className="flex self-center justify-center h-7 w-7"
                          src={tiktok}
                        />
                        <input
                          className={` font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${
                            edicion
                              ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500"
                              : "outline-none"
                          }`}
                          readOnly={!edicion}
                          placeholder={profileData.message.social_media_tiktok}
                          name="social_media_tiktok"
                          {...register("social_media_tiktok")}
                        />
                      </div>
                    )}
                    {(profileData?.message?.social_media_x || edicion) && (
                      <div className="p-2 flex flex-row gap-3">
                        <img
                          className="flex self-center justify-center h-7 w-7"
                          src={tw}
                        />
                        <input
                          className={` font-medium w-full text-start text-lg p-1 placeholder:text-black rounded-md ${
                            edicion
                              ? "outline outline-2 bg-orange-50 outline-orange-200 focus:outline-Naranja placeholder:text-gray-500"
                              : "outline-none"
                          }`}
                          readOnly={!edicion}
                          placeholder={profileData.message.social_media_x}
                          name="social_media_x"
                          {...register("social_media_x")}
                        />
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex flex-row m-2.5 h-16">
                  <div className="mx-5 h-full w-16">
                    <Link to="/Mis-Compras">
                      <Button text="Mis compras"></Button>
                    </Link>
                  </div>
                  <div className="mx-5 h-full w-16">
                    <Link to="/Crear" onClick={()=>ocupoPublicarAlgo}>
                      <Button text="Publicar"></Button>
                    </Link>
                  </div>
                  <div className="mx-5 h-full w-16">
                    <Link to="/Mis-Ventas">
                      <Button text="Mis Ventas"></Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full w-v">
              <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start gallery-profile-container overflow-y-scroll">
                {obrasPublicadas ? (
                  obrasPublicadas.slice(0, 12).map(function (obra) {
                    return (
                      <a href={`Editar/${obra.id_work}`}>
                        <button key={obra.id_work}>
                          <img
                            className="rounded-md w-20 md:w-36 lg:w-52 xl:w-64 xl:h-64 bg-cover"
                            src={obra.mainImageUrl}
                            alt={obra.title}
                          />
                        </button>
                      </a>
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
          <div className="flex justify-center">
            <Link to="/Login">
              <Button
                text="Cerrar sesion"
                onClick={() => limpiarStorage()}
              ></Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
