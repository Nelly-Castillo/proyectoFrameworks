import { useState, useEffect } from "react";
import { NavBar } from "../components/navBar";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import eliminar from "../assets/images/eliminar.svg";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Crear() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    getValues,
    setValue,
  } = useForm();


  const [cantidad, setCantidad] = useState(1);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const [existe, setExiste] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // https://proyectoframeworksbackend-production.up.railway.app/publications/edit-publication/:id

  useEffect(() => {
    const usanding = Array.from(tags);
    setValue("labels", usanding);
  }, [tags]);

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  useEffect(() => {
    console.log(getValues());
  }, [getValues]);

  useEffect(() => {
    setValue("stock", cantidad.toString());
  }, [cantidad]);

  const subirArchivos = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  function handleIncrease() {
    setCantidad((prevCantidad) => prevCantidad + 1);
  }

  function handleDecrease() {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  }


  const publicar = async (data) => {
    formData.delete("images"); // Clear previous images
    formData.delete("title"); // Clear previous title
    formData.delete("description"); // Clear previous description
    formData.delete("status"); // Clear previous status
    formData.delete("labels"); // Clear previous labels
    formData.delete("price"); // Clear previous price
    formData.delete("payment"); // Clear previous payment
    formData.delete("stock"); // Clear previous stock

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("labels", tags.join(","));
    formData.append("price", data.price);
    formData.append("payment", data.payment);
    formData.append("stock", cantidad.toString());

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("api/publications/add-publication", {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud de post: " + response.statusText
        );
      }

      const result = await response.json();
      console.log("Post creado:", result);
    } catch (error) {
      console.error("Error:", error);
    }
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
            // cla="bi bi-file-image-fill"
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
            {images.length > 0 ? (
              <div className="w-96 flex flex-wrap justify-around mb-4">
                {images.map((file, index) => (
                  <div key={index}>
                    <img
                      className="w-10 h-10 -bottom-24"
                      src={eliminar}
                      alt="Eliminar"
                    />
                    <img
                      src={URL.createObjectURL(file)}
                      // alt={Uploaded ${index}}
                      className="w-28 h-36 bg-cover position-relative top-0"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center pb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-upload fill-Naranja w-28 h-28"
                  viewBox="0 0 16 16"
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
                name="images"
                id="upload"
                multiple
                onChange={subirArchivos}
                // setValue={existe ?  }
              />
              <label
                htmlFor="upload"
                className=" p-2 rounded-md text-xl text-white bg-Azul inline-block cursor-pointer"
              >
                Subir fotos
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="p-2">
            <h3 className="pb-2 text-sm">Titulo</h3>
            <input
              name="title"
              {...register("title")}
              type="text"
              placeholder="Agregar un titulo"
              className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-full"
            />
          </div>
          <div className="p-2">
            <h3 className="pb-2 text-sm">Descripción</h3>
            <input
              name="description"
              {...register("description")}
              type="text"
              placeholder="Agrega una descripción"
              className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-full"
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="p-2">
              <h3 className="pb-2 text-sm">Estatus</h3>
              <select
                name="status"
                {...register("status")}
                className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md"
              >
                <option value="En venta">En venta</option>
                <option value="Vendido">Vendido</option>
              </select>
            </div>
            <div className="p-2">
              <h3 className="pb-2 text-sm">Precio</h3>
              <input
                name="price"
                {...register("price")}
                type="number"
                placeholder="Agrega un precio"
                className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md"
              />
            </div>
            <div className="p-2">
              <h3 className="pb-2 text-sm">Stock</h3>
              <div className="flex justify-center bg-NaranjaTrans20 border-2 border-Naranja rounded-md">
                <button
                  onClick={handleDecrease}
                  className="px-2 border-r-2 border-Naranja"
                >
                  -
                </button>
                <p className="px-3">{cantidad}</p>
                <button
                  onClick={handleIncrease}
                  className="px-2 border-l-2 border-Naranja"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* no se ocupa el payment lolololo */}
          {/* <div className="p-2 w-3/6">
            <h3 className="pb-2 text-sm">Medio de pago</h3>
            <select
              name="payment"
              {...register("payment")}
              className="bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-full"
            >
              <option value="Mercado pago">Mercado pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="PayPal">PayPal</option>
              <option value="Transferencia bancaria">
                Transferencia bancaria
              </option>
            </select>
          </div> */}
          <div className="p-2 w-100 flex flex-col items-center mt-6">
            <h3 className="pb-2 text-sm">Etiquetas</h3>
            <CheckboxGroup
              color="primary"
              value={tags}
              onChange={setTags}
              classNames={{
                label: "text-base text-gray-700 font-medium",
              }}
            >
              <Checkbox value="2D">2D</Checkbox>
              <Checkbox value="3D">3D</Checkbox>
              <Checkbox value="Lineart">Cartoon</Checkbox>
              <Checkbox value="Cartoon">Cartoon</Checkbox>
              <Checkbox value="Concept Art">Concept Art</Checkbox>
              <Checkbox value="Character Design">Character Design</Checkbox>
              <Checkbox value="Blender">Blender</Checkbox>
              <Checkbox value="Photoshop">Ilustrator</Checkbox>
              <Checkbox value="Ilustrator">Ilustrator</Checkbox>
              <Checkbox value="Fan Art">Fan Art</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-5 pb-10">
        <Link to="/PerfilVendedor">
          <button
            onClick={handleSubmit(publicar)}
            className="bg-Azul text-white p-3 m-1 rounded-xl text-sm h-full"
          >
            Publicar
          </button>
        </Link>
      </div>
    </>
  );
}

export { Crear };
