import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/navBar';
import { NavBarNotAuth } from '../components/navBarNotAuth';
import { useNavigate } from "react-router-dom";
import {Image} from "@nextui-org/react";
import fotoDefault from '../assets/images/person-circle.svg';

function Arts() {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState(fotoDefault);
    const [publications, setPublications] = useState([]);
    const token = sessionStorage.getItem("token");

    const getInfo = async () => {
        if (!token) {
            console.error("Token no proporcionado");
            return;
        }

        try {
            console.log(token);
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
            setProfilePhoto(data.message.photo);
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
        }
    };

    const fetchPublications = async () => {
        const filtros = localStorage.getItem('filtros');
        if (!filtros) {
            console.error("Filtros no encontrados en localStorage");
            return;
        }

        const parsedFiltros = JSON.parse(filtros);
        const labels = parsedFiltros.join(',');
        const url = `api/publications/search/${labels}`;

        console.log(`Fetching from URL: ${url}`); // Añadido para depuración

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    token: token,
                },
            });
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.statusText);
            }
            const data = await response.json();
            console.log(data);
            setPublications(data);
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            getInfo();
            fetchPublications();
        }
    }, [navigate, token]);

    return (
        <>
            {token ? <NavBar image={profilePhoto} /> : <NavBarNotAuth />}
            <div className='py-5 px-16 flex flex-col gap-10'>
            <Image
      width={300}
      alt="NextUI hero Image"
      src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
    />
            </div>
        </>
    );
}

export { Arts };
