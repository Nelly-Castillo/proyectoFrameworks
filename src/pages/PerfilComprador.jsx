import { Link, useNavigate } from "react-router-dom";
import ItemCompras from "../components/ItemCompras";
import { NavBar } from "../components/navBar";
import { Button } from "../components/Button";
import fotoDefault from '../assets/images/person-circle.svg';
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

function PerfilComprador() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user_name: "", full_name: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    let [profilePhoto, setProfilePhoto] = useState(fotoDefault);
    const [email, setEmail] =useState("")

    const token = sessionStorage.getItem("token");
    const fetchUserData = async () => {
        try {
            const response = await fetch("/api/user/perfil", {
                method: "GET",
                headers: {
                    token: token,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud de datos del usuario: " + response.statusText);
            }

            const data = await response.json();
            //debugger;
            setUserData(data);
            //debugger;
            setProfilePhoto(data.message.photo); 
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            setError(error.message);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!token) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [navigate, token]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFileUpload = async () => {
        if ((selectedFile || email )&& token) {
            const formData = new FormData();
            formData.append('perfil', selectedFile);
            formData.append('correo', email);
            debugger;
        
            try {


                // console.log("Esto es lo que recibo de email: " + email);
                if (email !== undefined) {
                    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    const isValid = regexEmail.test(email)

                    if (!isValid) {
                        alert("El correo es invalido")
                        return
                    }
                }
                



                

                const response = await fetch("/api/user/perfil-buyer", {
                    method: "PUT",
                    headers: {
                        token: token,
                        
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Error en la subida de la foto de perfil: " + response.statusText);
                }

                const data = await response.json();
                setProfilePhoto(data.photo); 
                debugger
                fetchUserData(data.message.correo);
                //debugger;
                setEmail()
            } catch (error) {
                console.error("Error al subir la foto de perfil:", error);
                setError(error.message);
            }
        }
    };

    const handleButtonClick = () => {
        setShowButtons(!showButtons);
        handleFileUpload();
    };


    if (loading) {
        return (
            <div className="w-full h-full flex self-center justify-center text-4xl text-VerLima mt-60 ">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavBar image={profilePhoto} />
            <div className="flex p-2.5 my-8 mb-2.5">
                <div className="relative">
                    <div className="grid grid-cols-2 gap-2 items-start">
                        <div className="flex flex-col items-center">
                            <div>
                                <div className="pb-4">
                                    <img 
                                        src={profilePhoto || fotoDefault} 
                                        alt='Foto de perfil' 
                                        className="
                                            rounded-full 
                                            h-64 
                                            w-64 
                                            object-cover"
                                    ></img>
                                </div>
                                <div className="z-10 absolute -mt-14 mx-5 p-1 left-48 w-80 flex justify-around">
                                    <button 
                                        onClick={() => setShowButtons(!showButtons)}
                                        className="bg-NaranjaTrans p-3.5 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pencil fill-Blanco" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg>
                                    </button>
                                    {showButtons && (
                                        <>
                                            <button 
                                                className="bg-NaranjaTrans p-3.5 rounded-full"
                                                onClick={() => document.getElementById('fileInput').click()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-camera-fill fill-Blanco" viewBox="0 0 16 16">
                                                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
                                                </svg>
                                            </button>
                                            <input 
                                                type="file" 
                                                id="fileInput" 
                                                style={{ display: 'none' }} 
                                                onChange={handleFileChange} 
                                            />
                                            <button 
                                                className="bg-NaranjaTrans p-3.5 rounded-full"
                                                onClick={handleButtonClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-floppy-fill fill-Blanco" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                                                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="p-5 w-1/2">
                                <div className="border-t-4 border-Naranja pt-5 px-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">Usuario</h3>
                                    </div>
                                    <div className="mt-2 text-Gris">
                                        <p>{userData.message.user_name}</p>
                                    </div>
                                </div>
                                <div className="mt-5 px-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">Nombre</h3>
                                    </div>
                                    <div className="mt-2 text-Gris">
                                        <p>{userData.message.full_name}</p>
                                    </div>
                                </div>
                                <div className="w-full text-center mt-4">
                                    <label htmlFor="email">Correo electrónico:</label>
                                    <input 
                                        disabled={!showButtons}
                                        type="email" 
                                        id="email" 
                                        value={email} 
                                        onChange={handleEmailChange} 
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end px-10">
                            <div className="flex items-center mx-16 justify-start">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="bg-Naranja" className="bi bi-file-image-fill  fill-Naranja w-10 h-14" viewBox="0 0 16 16" >
                                        <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z" />
                                    </svg>
                                </div>
                                <h1 className="p-1 mx-4 font-bold text-2xl">
                                    Tus compras
                                </h1>
                            </div>
                            <div>
                                <ItemCompras />
                            </div>
                            <div className="flex justify-center">
                                <button>
                                    <Link to="/Mis-Compras">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down fill-Azul w-8 h-8" viewBox="0 0 16 16" >
                                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/Login">
                            <Button text="Cerrar sesion"
                            onClick={() => sessionStorage.clear()}></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export { PerfilComprador };
