'use client'

// State
import { useState } from "react";

// Actions
import { createVehicle, deleteVehicle, updateVehicle } from "@/app/lib/actions";

// Components
import { PencilIcon, TrashIcon, UploadIcon, CalendarIcon, ParticlesIcon, DotColorsIcon } from "./icons/Icons";
import ButtonCard from "./ButtonCard";

// Types
interface UniversalCardComponentProps {
  type?: string;
  data?: any;
  func?: any;
  allData?: any;
}

function UniversalCardComponent({ type, data, func, allData }: UniversalCardComponentProps) {

  // States
  const { name = "", model = "", year = "", color = "", images = "" } = data || {};
  const [newData, setNewData] = useState({ name, model, year, color, images });
  const [types, setTypes] = useState(type);
  const [loading, setLoading] = useState(false);

  /**
   * Performs actions based on the provided types.
   * @param e - The form data.
   * @returns A promise that resolves to the result of the action.
   */
  const actions = async (e: FormData) => {
    switch (types) {
      case 'update':
        return await handleUpdateVehicle(e);
      case 'create':
        return await handleCreateVehicle(e);
    }
  }

  const handleReset = () => {
    setNewData({ name: "", model: "", year: "", color: "", images: "" });
  }

  const handleCreateVehicle = async (e: FormData) => {
    const { data, msg } = await createVehicle(e);
    if (data) {
      func([...allData, data[0]]);
      handleReset();
    }
  }

  const handleUpdateVehicle = async (e: FormData) => {
    const { data: vehicle, msg } = await updateVehicle(e, data?.id);
    if (vehicle) {
      setTypes(undefined);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewData({ ...newData, images: reader.result }); // Asignar la URL de la imagen al estado
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const colors = {
    red: "bg-red-600 text-white border-red-700",
    blue: "bg-blue-500 text-white border-blue-600",
    green: "bg-green-500 text-white border-green-600",
    yellow: "bg-yellow-500 text-white border-yellow-600",
    gray: "bg-gray-500 text-white border-gray-600",
    indigo: "bg-indigo-500 text-white border-indigo-600",
    pink: "bg-pink-500 text-white border-pink-600",
    purple: "bg-purple-500 text-white border-purple-600",
    black: "bg-black text-white border-white/30",
    white: "bg-white text-black border-white",
  };

  // Component for the buttons
  function Buttons() {
    return (
      <div className="absolute z-10 w-full">
        {!types && (
          <div className="absolute top-0 right-0 m-4 flex">
            <button type="button"
              onClick={() => { setTypes("update") }}
              className="rounded-l bg-black/80 backdrop-blur-sm text-white shadow">
              <PencilIcon className="h-7 w-7 opacity-50 hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              disabled={loading}
              type="button"
              onClick={async () => {
                setLoading(true)
                const { msg } = await deleteVehicle(data.id)
                if (msg) {
                  func(allData.filter((item: any) => item.id !== data.id))
                  setLoading(false)
                }
                setLoading(false)
              }}
              className="rounded-r bg-black/80 backdrop-blur-sm text-red-600 shadow">
              <TrashIcon className={`${loading && "animate-spin"} h-7 w-7 opacity-50 hover:opacity-100 transition-opacity duration-300`} />
            </button>
          </div>)
        }
      </div>
    )
  }

  return (
    <div className="md:col-span-4 col-span-12 border-none shadow-inner shadow-current rounded-2xl overflow-hidden w-full relative">
      <form
        className="h-full w-full"
        action={actions}
      >
        <Buttons />

        {types && (
          <div className="z-10 absolute top-0 left-0 p-4">
            <label className="text-white">
              <UploadIcon className="rounded bg-black shadow h-7 w-7 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
              <input
                type="file"
                accept="image/*"
                name="images" className="hidden"
                onChange={handleImageChange} />
            </label>
          </div>
        )
        }
        <div className="h-full w-full relative">
          <img src={newData.images || "/default.webp"} alt={data?.name || "image"} className="object-cover w-full h-full" />
          <div className="p-1 grid grid-cols-9 space-x-1 absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm border-t pt-1">
            <input
              name="name"
              disabled={!types}
              type="text"
              placeholder="Vehicle Name"
              value={newData.name}
              onChange={e => { setNewData({ ...newData, name: e.target.value }) }}
              className="col-span-9 mb-1 rounded-full text-lg bg-transparent text-center px-2 text-white/80 uppercase"
            />
            <label className="col-span-3 text-center relative">
              <ParticlesIcon className="h-4 w-4 absolute left-0 -top-1 z-10" />
              <input
                name="model"
                disabled={!types}
                type="text"
                placeholder="Vehicle model"
                value={newData.model}
                onChange={e => { setNewData({ ...newData, model: e.target.value }) }}
                className="w-full text-sm rounded-full border bg-black/50 border-white/30 text-center capitalize"
              />
            </label>
            <label className="col-span-3 text-center relative">
              <CalendarIcon className="h-4 w-4 absolute left-0 -top-1 z-10" />
              <input
                name="year"
                disabled={!types}
                type="number"
                placeholder="Vehicle year"
                value={newData.year}
                onChange={e => { setNewData({ ...newData, year: e.target.value }) }}
                className="w-full text-sm rounded-full border bg-black/50 border-white/30 text-center capitalize"
              />
            </label>
            <label htmlFor="color" className="col-span-3 text-center relative capitalize">
              <DotColorsIcon className="h-4 w-4 absolute left-0 -top-1 z-10" />
              <select
                id="color"
                name="color"
                disabled={!types}
                value={newData.color.toLowerCase()}
                onChange={e => { setNewData({ ...newData, color: e.target.value }) }}
                className={`${newData.color ? (colors as { [key: string]: string })[newData?.color.toLowerCase()] : "bg-black/50 border-white/30"} text-center w-full text-sm rounded-full border capitalize disabled:opacity-100`}
              >
                <option>Choose a color</option>
                {Object.keys(colors).map((color, index) => (
                  <option
                    key={index}
                    value={color}
                    className={`${colors[color as keyof typeof colors]} capitalize`}
                  >
                    {color}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {types && (<ButtonCard type={types} />)}
        </div>
      </form>
    </div>
  )
}

export default UniversalCardComponent