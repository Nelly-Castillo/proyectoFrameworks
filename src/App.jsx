import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Obra } from "./components/Obra.jsx";
import { Explorar } from "./components/Explorar.jsx";
import { Crear } from "./pages/Crear.jsx";
import { Page404 } from "./pages/Page404.jsx";
import { Carrito } from "./components/Carrito.jsx";
import { Compras } from "./pages/Compras.jsx";
import { PerfilVendedor } from "./pages/PerfilVendedor.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { Editar } from "./pages/Editar.jsx";
import "./App.css";
import { PerfilComprador } from "./pages/PerfilComprador.jsx";
import { ObraProvider } from "./components/ObraProvider.jsx";

function App() {
  return (
    <NextUIProvider>
      <ObraProvider>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/*" element={<Page404></Page404>} />
          <Route path="/Login" element={<Login></Login>} />
          <Route path="/SignUp" element={<SignUp></SignUp>} />
          <Route path="/Obra/:id_work" element={<Obra></Obra>} />
          <Route path="/Explorar" element={<Explorar></Explorar>} />
          <Route path="/Crear" element={<Crear></Crear>} />
          <Route path="/Editar/:id_work" element={<Editar></Editar>} />
          <Route path="/Carrito" element={<Carrito></Carrito>} />
          <Route path="/Mis-Compras" element={<Compras></Compras>} />
          <Route
            path="/perfilvendedor"
            element={<PerfilVendedor></PerfilVendedor>}
          />
          <Route
            path="/perfilcomprador"
            element={<PerfilComprador></PerfilComprador>}
          />
          {/* <Route path="/PerfilComprador" element={token ? <PerfilComprador></PerfilComprador> : <Navigate to="/login"/>}/> */}
        </Routes>
      </ObraProvider>
    </NextUIProvider>
  );
}
export default App;
