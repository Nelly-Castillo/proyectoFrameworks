import React from 'react';
import iconobrush from '../assets/images/brush.svg';
import { NavBar } from '../components/navBar';
import { NavBarNotAuth } from '../components/navBarNotAuth';
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import fotoDefault from '../assets/images/person-circle.svg';



const  Home = () => {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
    const token = sessionStorage.getItem("token");
    const getInfo = async () => {

        if (!token) {
        console.error("Token no proporcionado");
        setError("Token no proporcionado");
        return;
        }

        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhbGUyIiwic3RhdHVzIjoiVmVuZGVkb3IiLCJpYXQiOjE3MTY5ODk2MzJ9.RV5L9Mx9pCFpmV5kBLHOz63k7jVG-haed4dqEEUmFIE

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
            debugger
            setProfilePhoto(data.message.photo)
        } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setError(error.message);
        }
};
    useEffect(() => {
    
        if (!token) {
            navigate('/login');
        } else {
            getInfo();
        }
    }, [navigate]);

    
    return (
        <>
        {token ? <NavBar image={profilePhoto} /> : <NavBarNotAuth/>}
        <div className=' py-5  px-16 flex flex-col gap-10'>
            <div className="bg-portadaHome bg-no-repeat bg-cover bg-center bg-fixed lg:pt-72 2xl:pt-96">
                <div className='flex flex-row text-white font-bold gap-3 items-center p-10'>
                    <h1 className='text-3xl drop-shadow-sm lg:text-6xl xl:text-8xl'>ComunArte</h1>
                    <img className='w-8 h-8 lg:w-16 lg:h-16 xl:w-24 xl:h-24' src={iconobrush} alt="Icono" />
                </div>
            </div>    
            <div className='flex flex-col'>
                <h1 className=' text-center text-5xl pb-8'>Top ventas</h1>
                <div className='flex flex-row flex-wrap justify-around py-5 gap-5'>
                    <div className='place-content-center bg-botonDigital bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className='flex justify-center items-center text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out w-96 h-96 hover:bg-Azul'>
                            Ilustraciones
                        </div>
                    </div>
                    <div className='place-content-center bg-botonPinturas bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className='flex justify-center items-center text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out w-96 h-96 hover:bg-Azul'>
                            Pinturas
                        </div>
                    </div>
                    <div className='place-content-center bg-botonEsculturas bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className='flex justify-center items-center text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out w-96 h-96 hover:bg-Azul'>
                            Esculturas
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-x-36 px-40 py-8 w-full bg-VerLima self-center rounded-2xl'>
                <div className='flex flex-col self-center gap-16'>
                    <div className='text-white text-6xl font-bold'>Nosotros</div>
                    <div className='self-center'>
                        <img className='w-20 h-20 lg:h-16 xl:w-24 xl:h-24' src={iconobrush} alt="Icono" />
                    </div>
                </div>
                <div className='text-white text-xl text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim diam nec diam aliquet, non accumsan velit porta. Sed at arcu tempus, vulputate orci ut, tristique quam. Nunc et tristique urna, ut imperdiet mi. Nullam dapibus, velit vitae posuere rutrum, leo magna varius elit, in scelerisque purus enim at odio. Aenean in sapien id enim vulputate finibus vel et mauris. Ut vitae diam vitae turpis efficitur rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque maximus metus nec est volutpat, sit amet cursus felis consequat. Ut eu nisl sit amet nulla tincidunt ultricies. Duis pulvinar leo et orci ultrices aliquam. Donec sollicitudin risus dolor, in venenatis risus maximus fermentum. Ut id nibh vel lectus euismod commodo.
                </div>
            </div>
        </div>
        </>
    );
}


export default Home