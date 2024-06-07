import React, { useEffect, useState } from 'react';
import { NavBar } from './navBar';
import fotoDefault from '../assets/images/person-circle.svg';

function VentaArtista() {
    const [data, setData] = useState({ purchaseDetails: null, error: null });
    const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            try {
                const response = await fetch("/api/sales/sales-forartist", {
                    method: "GET",
                    headers: {
                        token: token,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setData({
                    purchaseDetails: data.message.purchaseDetails,
                    error: null
                });
            } catch (error) {
                setData({ purchaseDetails: null, error: error.message });
            }
        };

        fetchPurchaseDetails();
        getInfo();
    }, [token]);

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

    if (data.error) {
        return <div className="text-center text-gray-500 py-6">Error: {data.error}</div>;
    }

    if (!data.purchaseDetails) {
        return <div className="text-center text-gray-500 py-6">
            <h2>No has realizado ninguna compra</h2>
        </div>;
    }

    return (
        <>
            <NavBar image={profilePhoto} />
            <div className="bg-white py-6 px-4 lg:px-8">
                <div className=" max-w-7xl mx-auto space-y-8">
                    <h1 className="text-2xl font-bold text-center">Mis ventas</h1>
                <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start">
                    {data.purchaseDetails.map((purchase, index) => (
                        <div key={index} className="flex flex-col bg-white p-6 border border-NaranjaTrans50 rounded-lg shadow-sm mb-8 w-auto text-center items-center justify-center">
                            <a href={`/Obra/${purchase.id_work}`} className="text-center">
                                <img src={purchase.mainImageUrl} alt={purchase.title} className="w-auto mb-4 rounded-lg text-center" />
                            </a>
                            <h1 className="text-2xl font-bold mb-2">{purchase.title}</h1>
                            <p className="text-sm mb-2">Comprado por: {purchase.comprador_username}</p>
                            <p className='text-sm mb-2'>Nombre comprador: {purchase.comprador_fullname}</p>
                            <p className='text-sm mb-2'>Email : {purchase.comprador_correo}</p>
                            <p className="text-sm mb-2">Descripción: {purchase.description}</p>
                            <p className="text-sm mb-2">Total por producto: ${purchase.total}</p>
                            <p className="text-sm mb-2">Cantidad: {purchase.quantity}</p>
                            <div className="mt-6">
                                <h2 className="text-sm font-medium">Etiquetas</h2>
                                <div className="space-y-2 mt-2">
                                    {purchase.labels.map((label, index) => (
                                        <span
                                        key={index}
                                        className="inline-block bg-NaranjaTrans20 rounded-full px-3 py-1 text-sm font-semibold text-slate-950 mr-2"
>
                                        {label}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export { VentaArtista };