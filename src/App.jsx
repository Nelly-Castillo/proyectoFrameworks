
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import { Login } from './components/Login.jsx';
import { SignUp } from './components/SignUp.jsx';
import { Obra } from './components/Obra.jsx';
import { Explorar } from "./components/Explorar.jsx";
import { Chat } from "./components/Chat.jsx";
import { Crear } from "./Crear.jsx";
import {Carrito} from "./components/Carrito.jsx";
import './App.css';


// function App() {
//   return (
// 
//   );
// }

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/SignUp" element={<SignUp></SignUp>}/>
        <Route path="/Obra" element={<Obra></Obra>}/>
        <Route path="/Explorar" element={<Explorar></Explorar>}/>
        <Route path="/Chat" element={<Chat></Chat>}/>
        <Route path="/Crear" element={<Crear></Crear>}/>
        <Route path="/Carrito" element={<Carrito></Carrito>}/>
      </Routes>
      {/* <Carrito/> <Home/>*/}
      {/* <NavBar/>
      <NavBarCom/> 
      <Login/>
      <SignUp/>
      <Obra/>*/}
      {/* <div className='bg-teal-600'>
        <h1>Hola, si funciona tailwind</h1>
      </div> */}
    </>
  );
}
export default App;
