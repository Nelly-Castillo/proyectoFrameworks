
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/navBar.jsx';
import { NavBarCom } from './components/navBarCom.jsx';
import './App.css';

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
      {/* <div className='bg-teal-600'>
        <h1>Hola, si funciona tailwind</h1>
      </div> */}
    </>
  );
}
export default App;


// export default {App};
