import { Link } from "react-router-dom";
import ItemCompras from "../components/ItemCompras";
import { NavBar } from "../components/navBar";
import { Button } from "../components/Button";
import fotoPerfil1 from '../assets/images/perfil1.jpg';

function PerfilComprador () {
    return (
        <>
            <NavBar/>
            <div className="flex p-2.5 my-8 mb-2.5">
                <div>
                    <div className="grid grid-cols-2 gap-2 items-start">
                        <div className="flex flex-col items-center">
                            <div>
                                <img src={fotoPerfil1} alt='Foto de perfil' className="rounded-full h-64 w-64 object-cover"></img>
                            </div>
                            <div className="p-5 w-1/2">
                                <div className="border-t-4 border-Naranja pt-5 px-3">
                                    <div className="flex items-center justify-between p-">
                                        <h3 className="font-semibold text-lg">Usuario</h3>
                                    </div>
                                    <div className="mt-2">
                                        <p>Nombre de usuario</p>
                                    </div>
                                </div>
                                <div className="mt-5 px-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">Nombre</h3>
                                    </div>
                                    <div className="mt-2">
                                        <p>Nombre completo del usuario</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex  flex-col justify-end px-10">
                            <div className="flex items-center mx-16 justify-start">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image-fill" viewBox="0 0 16 16" className="w-10 h-14 fill-Naranja">
                                    <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                </div>
                                <h1 className="p-1 mx-4 font-bold text-2xl"> 
                                    Tus compras
                                </h1>
                            </div>
                            <div>
                                <ItemCompras/>
                            </div>
                            <div className="flex justify-center">
                                <button>
                                    <Link to="/Mis-Compras">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16" className="fill-Azul w-8 h-8">
                                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </Link>
                                </button>
                            </div>
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

export { PerfilComprador };