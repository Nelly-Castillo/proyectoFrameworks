import { NavBar } from "../components/navBar";
import { NavBarNotAuth } from "../components/navBarNotAuth";
import ItemCompras from "../components/ItemCompras";

function Compras () {
    const token = sessionStorage.getItem("token");
    return (
        <>
            {token ? <NavBar/> : <NavBarNotAuth/>}
            <div className="flex items-center mx-16 justify-start">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image-fill" viewBox="0 0 16 16" className="w-10 h-14 fill-Naranja">
                    <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z"/>
                    </svg>
                </div>
                <h1 className="p-1 mx-4 font-bold text-2xl"> 
                    Tus compras
                </h1>
            </div>
            <div className="grid grid-cols-3 gap-3 mx-10">
                <ItemCompras/>
                <ItemCompras/>
                <ItemCompras/>
                <ItemCompras/>
                <ItemCompras/>
            </div>
        </>
    );
}

export { Compras }; 