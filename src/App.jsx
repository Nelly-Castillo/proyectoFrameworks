import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Obra } from './components/Obra.jsx';
import { Explorar } from "./components/Explorar.jsx";
import { Chat } from "./pages/Chat.jsx";
import { Crear } from "./pages/Crear.jsx";
import { Page404 } from "./pages/Page404.jsx";
import { Carrito } from "./components/Carrito.jsx";
import { Compras } from "./pages/Compras.jsx";
import {PerfilVendedor} from "./pages/PerfilVendedor.jsx";
import {NextUIProvider} from "@nextui-org/react";
import './App.css';
import { PerfilComprador } from "./pages/PerfilComprador.jsx";


function App() {

  const token = sessionStorage.getItem("token");

  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/*" element={<Page404></Page404>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/SignUp" element={<SignUp></SignUp>}/>
        <Route path="/Obra" element={<Obra></Obra>}/>
        <Route path="/Explorar" element={<Explorar></Explorar>}/>
        <Route path="/Chat" element={<Chat></Chat>}/>
        <Route path="/Crear" element={<Crear></Crear>}/>
        <Route path="/Carrito" element={<Carrito></Carrito>}/>
        <Route path="/Mis-Compras" element={<Compras></Compras>}/>
        <Route path="/PerfilVendedor" element={token ? <PerfilVendedor></PerfilVendedor> : <Navigate to="/login"/>}/>
        <Route path="/PerfilComprador" element={token ? <PerfilComprador></PerfilComprador> : <Navigate to="/login"/>}/>
        {/* <Route path="/PerfilComprador" element={token ? <PerfilComprador></PerfilComprador> : <Navigate to="/login"/>}/> */}
      </Routes>
    </NextUIProvider>
  );
}
export default App;
