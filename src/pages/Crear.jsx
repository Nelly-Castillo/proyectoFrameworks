import { NavBarCom } from "../components/navBarCom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


function Crear () {
    return (
        <>
            <NavBarCom/>
            <div className="flex items-center mx-16">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image-fill" viewBox="0 0 16 16" className="w-10 h-14 fill-Naranja">
                        <path d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m4.002 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
                    </svg>
                </div>
                <h1 className="p-1 mx-4 font-bold text-2xl"> 
                    Crear una publicación
                </h1>
            </div>
            <div className="flex  flex-row py-5 px-20 mx-40">
                <div className="flex justify-center w-1/2 p-7">
                    <div className="bg-VerTrans30 rounded-lg px-20 py-20">
                        <div className="flex justify-center pb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16" className="fill-Naranja w-28 h-28">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                            </svg>
                        </div>
                        <div className="flex justify-center pb-2">
                            <button  className="bg-Azul text-white p-4 rounded-xl ">
                                Selecciona del ordenador
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center w-1/2 pl-10">
                    <Input title="Titulo" placeholder="Agregar un titulo" />
                    <Input title="Descripción" placeholder="Agrega una descripción" />
                    <div className="p-2">
                        <h3 className="pb-2">
                            Etiquetas
                        </h3>
                    </div>
                    <Input title="Precio" placeholder="Ingresa el precio" />
                    <Input title="Pago" placeholder="Agrega informacion de pago" />
                </div>
            </div>
            <div className="flex justify-around m-5">
                <Button text="Regresar"/>
                <Button text="Publicar"/>
            </div>
        </>
    )
}

export { Crear };