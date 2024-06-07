import React, { useEffect, useState } from 'react';
import { NavBar } from './navBar';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Obra() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("carrito");
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("Error parsing saved data:", e);
                return [];
            }
        }
        return [];
    });

    const token = sessionStorage.getItem("token");
    const {id_work} = useParams()

    // function agregarObra(e) {
    //     e.preventDefault()
    //     const nuevaData = [...data];
    //     nuevaData.push(product);
    //     console.log("NuevaData:" + nuevaData[0].id_work);
    //     setData(nuevaData);
    // }

    function agregarObra(e) {
        e.preventDefault();
        if (!product) return;
    
        const newObra = {
            id: product.id_work,
            nombreObra: product.title,
            descripcionObra: product.description,
            precioObra: product.price,
            image: product.images[0],
            cantidad: 1, // Assuming a default quantity of 1
        };
    
        // Check if the product already exists in the data array
        const productIndex = data.findIndex((obra) => obra.id === newObra.id);
    
        let nuevaData;
        if (productIndex !== -1) {
            // Product exists, update the cantidad
            nuevaData = data.map((obra, index) => 
                index === productIndex ? { ...obra, cantidad: obra.cantidad + 1 } : obra
            );
        } else {
            // Product does not exist, add new product
            nuevaData = [...data, newObra];
        }
    
        setData(nuevaData);
        toast.success("Producto agregado con exito")
    }
    

    // useEffect(() => {

    //     console.log("updating data: " + data);
    //     localStorage.setItem(
    //       "carrito",
    //       JSON.stringify(data.map((obra) => ({ id: obra.id_work, nombreObra: obra.title, descripcionObra: obra.description, precioObra: obra.price, cantidad: obra.cantidad })))
    //     );
    //     // localStorage.setItem("totalCarrito", JSON.stringify(totalCarrito));
    //   }, [data]);
    useEffect(() => {
        // Update localStorage whenever data changes
        try {
            localStorage.setItem("carrito", JSON.stringify(data));
        } catch (e) {
            console.error("Error setting localStorage:", e);
        }
    }, [data]);
    
      // Este es para cuando vuelve a iniciar, jala lo de local storage
    //   useEffect(() => {
    //     const savedData = localStorage.getItem("carrito");
    //     if (savedData) {
    //       const parsedData = JSON.parse(savedData);
    //       setData(parsedData);
    //     }
    //   }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/publications/${id_work}`, {
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
                setProduct(data.message[0]);
                console.log(data.message[0]);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <NavBar />
            <div className="bg-white py-6">
                <div className="mx-auto mt-6 max-w-4xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-[2fr,1fr] lg:gap-8 lg:px-8">
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        {product.images.map((image, index) => (
                            <div key={index} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                <img
                                    src={image}
                                    alt={`Imagen del producto ${index + 1}`}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1 lg:border-l lg:border-gray-200 lg:pl-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        <div className="mt-4">
                            <h2 className="sr-only">Información</h2>
                            <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
                        </div>

                        <form className="mt-10">
                            <button
                                // type="submit"
                                onClick={agregarObra}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Agregar al carrito
                            </button>
                            <ToastContainer
                                position="bottom-right"
                                autoClose={3000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                />
                        </form>

                        <div className="py-10">
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Artista</h2>
                                <div className="mb-4 space-y-6">
                                    <a href={`/artist/${product.artist_id}`} className="text-sm text-gray-600">{product.artist_id}</a>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Etiquetas</h2>
                                <div className="mb-4 space-y-6">
                                    {product.labels.map((label, index) => (
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
                    </div>
                </div>
            </div>
        </>
    )
}

export { Obra };








