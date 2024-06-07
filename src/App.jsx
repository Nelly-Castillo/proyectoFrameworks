import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Obra } from './components/Obra.jsx';
import { InformeVenta } from './components/InformeVenta.jsx';
import { Crear } from "./pages/Crear.jsx";
import { Page404 } from "./pages/Page404.jsx";
import { Carrito } from "./components/Carrito.jsx";
import { Arts } from "./pages/Arts.jsx";
import { Compras } from "./pages/Compras.jsx";
import { VentaArtista } from './components/VentaArtista.jsx';
import {PerfilVendedor} from "./pages/PerfilVendedor.jsx";
import {VerArtista} from "./pages/VerArtista.jsx";
import {VerComprador} from "./pages/VerComprador.jsx";
import {NextUIProvider} from "@nextui-org/react";
import './App.css';
import { PerfilComprador } from "./pages/PerfilComprador.jsx";
import { Editar } from "./pages/Editar.jsx";
import { ObraProvider } from "./components/ObraProvider.jsx";

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/*" element={<Page404></Page404>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/SignUp" element={<SignUp></SignUp>}/>
        <Route path="/Arts" element={<Arts></Arts>}/>  
        <Route path="/Obra" element={<Obra></Obra>}/>
        <Route path="/Explorar" element={<Explorar></Explorar>}/>
        <Route path="/Chat" element={<Chat></Chat>}/>
        <Route path="/Obra/:id_work" element={<Obra></Obra>}/>
        <Route path="/Crear" element={<Crear></Crear>}/>
        <Route path="/Carrito" element={<Carrito></Carrito>}/>
        <Route path="/Mis-Compras" element={<Compras></Compras>}/>
        <Route path="/Mis-Ventas" element={<VentaArtista></VentaArtista>}/>
        <Route path="/Sales/:id_purchase" element={<InformeVenta></InformeVenta>}/>
        <Route path="/artist/:user_name" element={<VerArtista></VerArtista>}/>
        <Route path="/comprador/:user_name" element={<VerComprador></VerComprador>}/>
        <Route path="/perfilvendedor" element={<PerfilVendedor></PerfilVendedor>}/>
        <Route path="/perfilcomprador" element={<PerfilComprador></PerfilComprador> }/>
        <Route path="/editar/:id_work" element={<Editar></Editar>}/>
        {/* <Route path="/PerfilComprador" element={token ? <PerfilComprador></PerfilComprador> : <Navigate to="/login"/>}/> */}
      </Routes>
    </NextUIProvider>
  );
}
export default App;
