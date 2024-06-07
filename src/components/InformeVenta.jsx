import React, { useEffect, useState } from 'react';
import { NavBar } from './navBar';
import { useParams } from 'react-router-dom';

function InformeVenta() {
    const [data, setData] = useState({ purchaseDetails: null, totalAmount: null, error: null });
    const { id_purchase } = useParams();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            try {
                const response = await fetch(`/api/sales/sales-forpurchass/${id_purchase}`, {
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
                    totalAmount: data.message.totalAmmount,
                    error: null
                });
            } catch (error) {
                setData({ purchaseDetails: null, totalAmount: null, error: error.message });
            }
        };

        fetchPurchaseDetails();
    }, [id_purchase, token]);

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
            <NavBar />
            <div className="bg-white py-6 px-4 lg:px-8">
                <div className=" max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-7 justify-start">
                    {data.purchaseDetails.map((purchase, index) => (
                        <div key={index} className="flex flex-col bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8 w-auto text-center items-center justify-center">
                            <a href={`/Obra/${purchase.id_work}`} className="text-center">
                                <img src={purchase.mainImageUrl} alt={purchase.title} className="w-auto mb-4 rounded-lg text-center" />
                            </a>
                            <h1 className="text-2xl font-bold mb-2">{purchase.title}</h1>
                            <p className="text-sm mb-2">Artista: <a href={`/artist/${purchase.artist}`}>{purchase.artist}</a></p>
                            <p className="text-sm mb-2">Descripción: {purchase.description}</p>
                            <p className="text-sm mb-2">Total por producto: ${purchase.total}</p>
                            <p className="text-sm mb-2">Cantidad: {purchase.quantity}</p>
                            <div className="mt-6">
                                <h2 className="text-sm font-medium">Etiquetas</h2>
                                <div className="space-y-2 mt-2">
                                    {purchase.labels.map((label, index) => (
                                        <span
                                        key={index}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
>
                                        {label}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-6 text-center">
                        <h3 className="text-2xl font-medium text-gray-900">Total de la compra</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">${data.totalAmount}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export { InformeVenta };




