import React, {useState} from 'react';
import { Button } from "./Button";
import { Rating } from "@material-tailwind/react";

function ModalCal ({ isOpen, onClose }) {
    const [calif, setCalif] = useState(0);

    if (!isOpen) return null;
    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 self-center">
                    <div className="flex justify-end m-2">
                        <button className="" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" className="fill-Azul w-6 h-6 hover:fill-AzulOs">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center ">
                        <h2 className="text-2xl font-bold mb-4">Califica tu compra</h2>
                        <div className="my-10">
                            <Rating unratedColor="orange" ratedColor="orange" onChange={setCalif()} value={calif} className=" flex flex-row"/>
                        </div>
                        <div>
                            <Button text="Enviar"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { ModalCal };