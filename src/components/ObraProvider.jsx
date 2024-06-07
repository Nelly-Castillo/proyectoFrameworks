// import React, { createContext, useState } from "react";

// export const obraContext = createContext();

// export const ObraProvider = ({ children }) => {
//     const [idObra, setIdObra] = useState(null);

//     return (
//         <obraContext.Provider value={{ idObra, setIdObra }}>
//             {children}
//         </obraContext.Provider>
//     );
// }

import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const obraContext = createContext();

export const ObraProvider = ({ children }) => {
    const [idObra, setIdObra] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Check if the current route is not "/crear"
        if (location.pathname !== "/Crear") {
            setIdObra(null);
        }
    }, [location]);

    return (
        <obraContext.Provider value={{ idObra, setIdObra }}>
            {children}
        </obraContext.Provider>
    );
}
