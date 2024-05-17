import React from "react";

function Button ({text})  {
    return(
        <button  className="bg-Azul text-white p-4 mx-5 rounded-xl">
            {text}
        </button>
    );
};

export {Button}; 