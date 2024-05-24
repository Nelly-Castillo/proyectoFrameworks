import React, { useState} from 'react';
import foto from '../assets/images/esculturas.jpg';
import { ModalCal } from "./ModalCal";

const ItemCompras = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-around p-3 my-2 shadow-lg rounded-md">
            <div className="md:w-1/6">
                <img 
                src={foto}
                alt="Nombre obra" 
                className="rounded-lg w-full"
                />
            </div>
            <div className="md:w-1/3">
                <h2 className="text-lg font-bold mb-2">Nombre obra</h2>
                <div className="flex justify-between items-center mb-4">
                <span className=" text-sm underline">Autor</span>
                <button onClick={openModal} className="text-lg text-black hover:text-Azul">
                    <span className="text-sm">Calificar</span>
                </button>
                </div>
                <p className="text-gray-700 mb-4 text-center text-xs">Descripción</p>
                <div className='border-t-2 border-NaranjaTrans20'>
                    <p className="text-lg font-semibold text-center m-1">$ Precio</p>
                </div>
            </div>
            <ModalCal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ItemCompras;
