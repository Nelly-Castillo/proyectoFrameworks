import React from "react";
import { NavBar } from "../components/navBar";
import imgPerfil from "../assets/images/perfil1.jpg";
import star from "../assets/images/starFilled.svg";
import pruebaObras from "../assets/images/digital.jpg";
import editar from "../assets/images/editar.svg";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import tw from "../assets/images/twitter.svg";

export function PerfilVendedor() {
  const bucket = 'https://bucketdealesitacomunarte.s3.amazonaws.com/';
  
  async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token no proporcionado');
      return;
    }
  
    const response = await fetch('https://proyectoframeworksbackend-production.up.railway.app/user/perfil', {
      method: 'GET',
      headers: {
        'token': token
      }
    });
  
    const data = await response.json();
    console.log(data);
  }
  
  
  

  return (
    <div className=" px-6">
      <NavBar />
      <div className="flex flex-row">
        <div className="flex flex-col gap-4 w-1/4 items-center">
          <div className="rounded-md items-center h-72 bg-portadaHome w-full flex flex-col justify-end px-4">
            <div className="flex flex-row w-full">
              <div className="flex items-end">
                <button className=" p-1">
                  <img className=" justify-start w-16 h-16" src={editar} />
                </button>
              </div>
              <div className="relative bg-white h-20 w-20 lg:h-40 lg:w-40 xl:w-52 xl:h-52 rounded-full bottom-0 place-content-center place-items-center flex">
                <img className=" rounded-full h-16 w-16 lg:h-36 lg:w-36 xl:w-48 xl:h-48" src={imgPerfil} />
              </div>
            </div>
          </div>
          <div className="flex flex-row py-3 place-items-center">
            <img className=" h-7 w-7" src={star} />
            <img className=" h-7 w-7" src={star} />
            <img className=" h-7 w-7" src={star} />
            <img className=" h-7 w-7" src={star} />
            <img className=" h-7 w-7" src={star} />
          </div>
          <div className="flex-col gap-1">
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={iconUsuario}/>
                <div className=" font-bold w-full text-start ">Usuario</div>
            </div>
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={iconNombre}/>
                <div className=" font-bold w-full text-start ">Usuario</div>
            </div>
            <div className="w-full h-1 bg-Naranja opacity-50 py-1 rounded-full"></div>
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={ig}/>
                <div className=" font-bold w-full text-start ">Instagram</div>
            </div>
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={mail}/>
                <div className=" font-bold w-full text-start ">Email</div>
            </div>
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={tiktok}/>
                <div className=" font-bold w-full text-start ">Tiktok</div>
            </div>
            <div className=" flex flex-row gap-1">
                <img className="h-7 w-7 p-2" src={tw}/>
                <div className=" font-bold w-full text-start ">Twitter</div>
            </div>
          </div>
          <button className=" bg-Azul text-white p-3 m-3 rounded-2xl text-lg" onClick={getProfile}>
            <div>Mis compras</div>
          </button>
        </div>
        <div className=" flex flex-row flex-wrap mx-5 justify-evenly">
          <img className="rounded-md mx-4 mb-5 w-80 h-80 bg-cover" src={pruebaObras} />
          <img className="rounded-md mx-4 mb-5 w-80 h-80 bg-cover" src={pruebaObras} />
          <img className="rounded-md mx-4 mb-5 w-80 h-80 bg-cover" src={pruebaObras} />
          <img className="rounded-md mx-4 mb-5 w-80 h-80 bg-cover" src={pruebaObras} />
        </div>
      </div>
    </div>
  );
}
