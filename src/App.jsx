import NavBar from './components/navBar';
import NavBarCom from './components/navBarCom';
import './App.css';

function App() {
  return (
    <>
      <NavBar/>
      <NavBarCom/>
      <div className='bg-teal-600'>
        <h1>Hola, si funciona tailwind</h1>
      </div>
    </>
  );
}

export default App;
