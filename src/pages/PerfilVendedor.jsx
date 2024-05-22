import React from "react";
import navBar from '../components/navBar';

export default function PerfilVendedor(){
    return(
        <>
        <div className="flex flex-row flex-wrap">
            <div className="flex-col gap-4">
                <div>
                    <img className=" fixed top-0 h-80 w-max" src="../assets/images/pinturasHome"/>
                    <div className="bg-white h-64 w-64 rounded-full">
                        <img className=" rounded-full fixed bottom-0 w-56 h-56 border" src="../assets/images/perfil1"/>
                    </div>
                    <img className="fixed bottom-2 left-2 w-16 h-16" src="../assets/images/editar"/>
                </div>
                <div className="flex-row py-3 align-middle">
                    <img className=" h-7 w-7" source="../assets/images/starFilled"/>
                    <img className=" h-7 w-7" source="../assets/images/starFilled"/>
                    <img className=" h-7 w-7" source="../assets/images/starFilled"/>
                    <img className=" h-7 w-7" source="../assets/images/starFilled"/>
                    <img className=" h-7 w-7" source="../assets/images/starFilled"/>
                </div>
                <div className="flex-col gap-1">
                    <div className="flex-row gap-1">
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}