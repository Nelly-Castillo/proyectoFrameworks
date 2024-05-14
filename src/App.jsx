
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/navBar.jsx';
import { NavBarCom } from './components/navBarCom.jsx';
import Home from './Home';
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
      <NavBar/>
      <NavBarCom/>
      <Home/>
      <Carrito/>
    </>
  );
}
export default App;
