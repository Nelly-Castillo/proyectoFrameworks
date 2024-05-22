import React, { useState} from 'react';
import foto from '../assets/images/esculturas.jpg';
import { ModalCal } from "./ModalCal";

const ItemCompras = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-4">
        <div className="md:w-1/6 p-4">
            <img 
            src={foto}
            alt="Nombre obra" 
            className="rounded-lg shadow-lg w-full"
            />
        </div>
        <div className="md:w-1/2 p-4">
            <h2 className="text-xl font-bold mb-2">Nombre obra</h2>
            <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Autor</span>
            <button onClick={openModal} className="text-lg text-black hover:text-Azul">
                <span className="text-lg">Calificar</span>
            </button>
            </div>
            <p className="text-gray-700 mb-4 text-center">Descripción</p>
            <p className="text-xl font-semibold">$ Precio</p>
        </div>
        <ModalCal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ItemCompras;
