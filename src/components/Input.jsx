import React from "react";

function Input ({title, placeholder})  {
    return(
        <div className="p-2">
            <h3  className="pb-2">
                {title}
            </h3>
            <input 
                type="text" 
                placeholder={placeholder}
                className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-1/2"
            />
    </div>
    );
};
export {Input}; 