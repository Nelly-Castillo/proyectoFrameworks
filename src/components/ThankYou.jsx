import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ThankYou = () => {
    const navigate = useNavigate()

    const [data, setdata] = useState(null)
    localStorage.removeItem('carrito')
    
    function handleContinuar(e) {
        e.preventDefault();


        navigate('/')
    }

    useEffect(() => {
        setdata(JSON.parse(sessionStorage.getItem("compra")))

        console.log("data " + JSON.parse(sessionStorage.getItem("compra")).total);
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg w-2/3 mx-auto p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold  mb-4">Muchas gracias por tu compra!</h2>
          <p className="text-gray-600">Ya recibimos tu orden de compra.</p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Links de paga:</h3>
          {/* <div className="mt-4">
            <div className="flex justify-between text-gray-600">
              <span>Order Number:</span>
              <span>123456</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Date:</span>
              <span>June 7, 2024</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Total:</span>
              <span>$150.00</span>
            </div> */}
            { data !== null ? data.links.map((link) => (
              <div key={link.orderId} className="flex justify-between text-gray-600">
                <span>Link de paga:</span>
                {/* <span>{link.approveLink}</span> */}
                <a className='hover:underline' href={link.approveLink} target="_blank" rel="noopener noreferrer">{link.approveLink}</a>
              </div>
            )) :
            <p>No hay datos</p>}
          {/* </div> */}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Items</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between text-gray-600">
              <span>Total:</span>
              <span>${data !== null ? data.total : <p>No hay datos</p>}</span>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleContinuar}
            className="bg-primary-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export {ThankYou}