
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/navBar.jsx';
import { NavBarCom } from './components/navBarCom.jsx';
import Home from './Home';
import { Login } from './components/Login.jsx';
import { SignUp } from './components/SignUp.jsx';
import { Obra } from './components/Obra.jsx';
import './App.css';
import Carrito from './components/Carrito.jsx';

// function App() {
//   return (
//     <Routes>
//       <Route index element={<Perfil />} />
//       <Route path="/navbar" element={<NavBar />} />
//       <Route path="/navbarcom" element={<NavBarCom />} />
//     </Routes>
//   );
// }

function App() {
  return (
    <>
      {/* <Carrito/> <Home/>*/}
      {/* <NavBar/>
      <NavBarCom/> 
      <Login/>
      <SignUp/>*/}
      <Obra/>
      {/* <div className='bg-teal-600'>
        <h1>Hola, si funciona tailwind</h1>
      </div> */}
    </>
  );
}
export default App;
