<<<<<<< dev-rusty
import { useState } from "react";
=======
>>>>>>> dev
import { NavBar } from "../components/navBar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import eliminar from '../assets/images/eliminar.svg';

=======
<<<<<<< dev-rusty
>>>>>>> 8eb092a3a6eac61b34a27e5dbc306480c4363419
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Crear() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    fetch("URLDELISTA")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const [files, setFiles] = useState([]);

  const subirArchivos = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const readers = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((fileContents) => {
      setFiles((prevFiles) => [...prevFiles, ...fileContents]);
    });
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center mx-16">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-file-image-fill"
            viewBox="0 0 16 16"
            className="w-10 h-14 fill-Naranja"
          >
            <path d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m4.002 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
          </svg>
        </div>
        <h1 className="p-1 mx-4 font-bold text-2xl">Crear una publicación</h1>
      </div>
      <div className="flex flex-col py-5 px-20 mx-40">
        <div className="flex justify-center  p-7">
          <div className="bg-VerTrans30 rounded-lg px-40 py-10">
            {files.length > 0 ? (
              <div className="w-96 flex flex-wrap justify-around mb-4">
                {files.map((file, index) => (
                  <>
                  <img className=" w-2 h-2" src={eliminar} />
                  <img
                    key={index}
                    src={file}
                    alt={`Uploaded ${index}`}
                    className="w-28 h-36 bg-cover m-2"
                  />
                  </>
                ))}
              </div>
            ) : (
              <div className="flex justify-center pb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-upload"
                  viewBox="0 0 16 16"
                  className="fill-Naranja w-28 h-28"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
              </div>
            )}

            <div className="flex justify-center pb-2">
              <input
                className=" w-px h-px opacity-0 overflow-hidden position-absolute z-n1"
                type="file"
                accept="image/*" 
                name="upload"
                id="upload"
                multiple
                onChange={subirArchivos}
              />
              <label
                for="upload"
                className=" p-2 rounded-md text-xl text-white bg-Azul inline-block cursor-pointer"
              >
                Subir fotos
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <Input title="Titulo" placeholder="Agregar un titulo" />
          <Input title="Descripción" placeholder="Agrega una descripción" />
          <div className="p-2 w-full">
            <h3 className="pb-2 text-sm">Etiquetas</h3>
            <div className="flex">
              <Card className="w-full max-w-[24rem]">
                <List className="flex-row">
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-react"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Ilustraciones
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-vue"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-vue"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Pinturas
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-svelte"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-svelte"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Esculturas
                      </Typography>
                    </label>
                  </ListItem>
                </List>
              </Card>
            </div>
          </div>
          <Input title="Precio" placeholder="Ingresa el precio" />
          <Input title="Pago" placeholder="Agrega informacion de pago" />
        </div>
      </div>
      <div className="flex justify-around m-5">
        <div>
          <Link to="/PerfilVendedor">
            <Button text="Regresar" />
          </Link>
        </div>
        <Button text="Publicar" />
      </div>
    </>
  );
}

export { Crear };
=======
import { Checkbox, Card, List, ListItem, ListItemPrefix, Typography, } from "@material-tailwind/react";
import { Link } from "react-router-dom";


function Crear () {
    useEffect(()=>{
        fetch("URLDELISTA").then(res=>res.json()).then(data=>{
            console.log(data);
        })
    },[])
    return (
        <>
            <NavBar/>
            <div className="flex items-center mx-16">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-image-fill" viewBox="0 0 16 16" className="w-10 h-14 fill-Naranja">
                        <path d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m4.002 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
                    </svg>
                </div>
                <h1 className="p-1 mx-4 font-bold text-2xl"> 
                    Crear una publicación
                </h1>
            </div>
            <div className="flex flex-col py-5 px-20 mx-40">
                <div className="flex justify-center  p-7">
                    <div className="bg-VerTrans30 rounded-lg px-40 py-10">
                        <div className="flex justify-center pb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16" className="fill-Naranja w-28 h-28">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                            </svg>
                        </div>
                        <div className="flex justify-center pb-2">
                            <Button text="Seleccionar del ordenador"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full">
                    <Input title="Titulo" placeholder="Agregar un titulo" />
                    <Input title="Descripción" placeholder="Agrega una descripción" />
                    <div className="p-2 w-full">
                        <h3 className="pb-2 text-sm">
                            Etiquetas
                        </h3>
                        <div className="flex">
                        <Card className="w-full max-w-[24rem]">
                            <List className="flex-row">
                                <ListItem className="p-0">
                                <label
                                    htmlFor="horizontal-list-react"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                    <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id="horizontal-list-react"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                        className: "p-0",
                                        }}
                                    />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="font-medium">
                                        Ilustraciones
                                    </Typography>
                                </label>
                                </ListItem>
                                <ListItem className="p-0">
                                <label
                                    htmlFor="horizontal-list-vue"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                    <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id="horizontal-list-vue"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                        className: "p-0",
                                        }}
                                    />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="font-medium">
                                        Pinturas
                                    </Typography>
                                </label>
                                </ListItem>
                                <ListItem className="p-0">
                                <label
                                    htmlFor="horizontal-list-svelte"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                    <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id="horizontal-list-svelte"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                        className: "p-0",
                                        }}
                                    />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="font-medium">
                                        Esculturas
                                    </Typography>
                                </label>
                                </ListItem>
                            </List>
                        </Card>
                        </div>
                    </div>
                    <Input title="Precio" placeholder="Ingresa el precio" />
                    <Input title="Pago" placeholder="Agrega informacion de pago" />
                </div>
            </div>
            <div className="flex justify-around m-5">
                <div>
                    <Link to="/PerfilVendedor">
                        <Button text="Regresar"/>
                    </Link>
                </div>
                <Button text="Publicar"/>
            </div>
        </>
    )
}

export { Crear };
>>>>>>> dev
