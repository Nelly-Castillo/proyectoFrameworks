import React from "react";
import { NavBar } from "../components/navBar";
import imgPerfil from "../assets/images/perfil1.jpg";
import star from "../assets/images/starFilled.svg";
import pruebaObras from "../assets/images/digital.jpg";
import editar from "../assets/images/editar.svg";
import iconUsuario from "../assets/images/iconUsuario.svg";
import iconNombre from "../assets/images/iconNombre.svg";
import ig from "../assets/images/instagram.svg";
import mail from "../assets/images/Mail.jpg";
import tiktok from "../assets/images/tiktok.svg";
import tw from "../assets/images/twitter.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function PerfilVendedor() {
  
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
    <>
      <NavBar />
      <div className="flex p-2.5 my-8 mb-2.5">
        <div>
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col items-center w-1/3 mx-10">
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
              <div className="flex flex-row mt-2.5">
                <div className="mx-5">
                  <Link to="/Mis-Compras">
                    <Button text="Mis compras">
                    </Button>
                  </Link>
                </div>
                <div className="mx-5">
                  <Link to="/Crear">
                    <Button text="Publicar">
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className=" flex flex-row flex-wrap mx-10 justify-evenly w-full">
              <img className="rounded-md mx-4 mb-5 w-64 h-64 bg-cover" src={pruebaObras} />
              <img className="rounded-md mx-4 mb-5 w-64 h-64 bg-cover" src={pruebaObras} />
              <img className="rounded-md mx-4 mb-5 w-64 h-64 bg-cover" src={pruebaObras} />
              <img className="rounded-md mx-4 mb-5 w-64 h-64 bg-cover" src={pruebaObras} />
            </div>
          </div>
          <div className="flex justify-center">
              <Link to="/Login">
                  <Button text="Cerrar sesion"></Button>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}
