import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { etiquetas } from "./labels.js";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
    const [values, setValues] = useState(new Set([]));
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = () => { // Añadido para depuración
        // Verificar si ya existen valores en LocalStorage con la clave 'filtros'
        console.log(Array.from(values));

        if (localStorage.getItem('filtros')) {
            // Si existen, eliminarlos
            localStorage.removeItem('filtros');
        }
        // Guardar los nuevos valores en LocalStorage
        localStorage.setItem('filtros', JSON.stringify(Array.from(values)));

        // Redirigir a la ruta /Arts solo si la ruta actual no es /Arts
        if (location.pathname !== '/Arts') {
            navigate('/Arts');
        } else {
            // Si ya está en la ruta /Arts, refresca la página
            window.location.reload();
        }
    };

    return (
        <div className="bg-AzulCl text-white flex flex-row p-1 rounded-lg">
            <Select 
                items={etiquetas}
                placeholder="Busqueda"
                selectionMode="multiple"
                selectedKeys={values}
                className=" bg-AzulCl p-1 pl-4 text-white text-sm w-[320px]"
                onSelectionChange={setValues}
            >
                {(etiquetas) => <SelectItem key={etiquetas.value}>{etiquetas.label}</SelectItem>}
            </Select>
            <button className="p-2" onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        </div>
    );
}

export { SearchBar };
