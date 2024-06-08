import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { obraContext } from "../components/ObraProvider";
import { NavBar } from "../components/navBar";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Editar() {
  const token = sessionStorage.getItem("token");
  const { id_work } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const [cantidad, setCantidad] = useState(1);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infoObra, setInfoObra] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (id_work) {
      getInfoToEdit();
    } else {
      setLoading(false);
    }
  }, [token, navigate, id_work]);

  useEffect(() => {
    setValue("labels", Array.from(tags));
  }, [tags, setValue]);

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  useEffect(() => {
    setValue("stock", cantidad.toString());
  }, [cantidad, setValue]);

  const subirArchivos = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleIncrease = () => setCantidad(cantidad + 1);
  const handleDecrease = () => cantidad > 1 && setCantidad(cantidad - 1);

  async function getInfoToEdit() {
    try {
      const response = await fetch(`/api/publications/${id_work}`, {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setInfoObra(data.message);
      if (data.message.labels) {
        const savedTags = new Set(data.message.labels.split(","));
        setTags(savedTags);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const editarPubli = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("status", data.status || "");
    formData.append("labels", tags.join(",") || "");
    formData.append("price", data.price || "");
    formData.append("stock", cantidad.toString());
    images.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(
        `/api/publications/edit-publication/${id_work}`,
        {
          method: "PUT",
          headers: { token: token },
          body: formData,
        }
      );
      if (!response.ok)
        throw new Error(
          "Error en la solicitud de post: " + response.statusText
        );
      const result = await response.json();
      alert("Post Editado")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function eliminarObra() {
    try {
      const response = await fetch(
        `/api/publications/delete-publication/${id_work}`,
        {
          method: "DELETE",
          headers: {
            token: token,
          },
        }
      );

      if (!response.ok)
        throw new Error(
          "Error en la solicitud de delete: " + response.statusText
        );
      const respuesta = await response.json();
      console.log("Se ha eliminaooooo: ", respuesta);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavBar />
      <div className="flex items-center mx-16">
        <h1 className="p-1 mx-4 font-bold text-2xl">Edita tu publicación</h1>
      </div>
      <div className="flex flex-col py-5 px-20 mx-40">
        <div className="flex justify-center p-7">
          <div className="bg-VerTrans30 rounded-lg px-40 py-10">
            {images.length > 0 ? (
              <div className="w-96 flex flex-wrap justify-around mb-4">
                {images.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index}`}
                      className="w-28 h-36 bg-cover"
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
                type="file"
                name="images"
                id="upload"
                multiple
                onChange={subirArchivos}
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="p-2 rounded-md text-xl text-white bg-Azul cursor-pointer"
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
              placeholder={infoObra[0] ? infoObra[0].title : "Cargando..."}
              className="placeholder:text-black bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-full"
            />
          </div>
          <div className="p-2">
            <h3 className="pb-2 text-sm">Descripción</h3>
            <input
              name="description"
              {...register("description")}
              type="text"
              placeholder={
                infoObra[0] ? infoObra[0].description : "Cargando..."
              }
              className="placeholder:text-black bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md w-full"
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
                placeholder={infoObra[0] ? infoObra[0].price : "Cargando..."}
                className="placeholder:text-black bg-NaranjaTrans20 p-2 border-2 border-Naranja rounded-md"
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
                <input
                  readOnly
                  className="bg-NaranjaTrans20 w-10 text-center p-2"
                  value={cantidad}
                />
                <button
                  onClick={handleIncrease}
                  className="px-2 border-l-2 border-Naranja"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="p-2 w-100 flex flex-col items-center mt-6">
            <h3 className="pb-2 text-sm">Etiquetas</h3>
            <CheckboxGroup
              color="primary"
              value={Array.from(tags)}
              onChange={setTags}
              classNames={{ label: "text-base text-gray-700 font-medium" }}
            >
              <Checkbox value="2D">2D</Checkbox>
              <Checkbox value="3D">3D</Checkbox>
              <Checkbox value="Lineart">Lineart</Checkbox>
              <Checkbox value="Cartoon">Cartoon</Checkbox>
              <Checkbox value="Concept Art">Concept Art</Checkbox>
              <Checkbox value="Character Design">Character Design</Checkbox>
              <Checkbox value="Blender">Blender</Checkbox>
              <Checkbox value="Photoshop">Photoshop</Checkbox>
              <Checkbox value="Illustrator">Illustrator</Checkbox>
              <Checkbox value="Fan Art">Fan Art</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly pt-5 pb-10">
        <Link to="/PerfilVendedor">
        <button
          onClick={() => eliminarObra()}
          className=" bg-red-600 text-white p-3 m-1 rounded-xl text-sm h-full"
        >
          Eliminar
        </button>
        </Link>
        <button
          onClick={handleSubmit(editarPubli)}
          className="bg-Azul text-white p-3 m-1 rounded-xl text-sm h-full"
        >
          Editar
        </button>
      </div>
    </>
  );
}

export { Editar };
