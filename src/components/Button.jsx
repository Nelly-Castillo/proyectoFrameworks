import React from "react";

function Button ({text, action})  {
    return(
        <button  className="bg-Azul text-white p-3 m-1 rounded-xl text-sm h-full" onClick={action}>
            {text}
        </button>
    );
};

export {Button}; 