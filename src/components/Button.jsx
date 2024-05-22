import React from "react";

function Button ({text})  {
    return(
        <button  className="bg-Azul text-white p-3 m-1 rounded-xl text-sm">
            {text}
        </button>
    );
};

export {Button}; 