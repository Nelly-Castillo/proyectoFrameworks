import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { obraContext } from "../components/ObraProvider";

const LoadingWrapper = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const { idObra } = useContext(obraContext);


    useEffect(() => {
        const checkId = () => {    
            if (idObra) {
                setIsReady(true);
            } else {
                setTimeout(checkId, 1000); 
            }
        };

        checkId();
    }, []);

    if (!isReady) {
        return <div>Loading...</div>; // Pantalla de carga mientras espera
    }

    return children;    
};

export default LoadingWrapper;