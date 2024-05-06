import React from 'react';
import iconobrush from './assets/images/brush.svg';

export default function Home() {
    return (
        <div className='  px-16 flex flex-col gap-10'>
            <div className="bg-portadaHome bg-no-repeat bg-cover bg-center bg-fixed lg:pt-72 2xl:pt-96">
                <div className='flex flex-row text-white font-bold gap-3 items-center p-10'>
                    <h1 className='text-3xl drop-shadow-sm lg:text-6xl xl:text-8xl'>ComunArte</h1>
                    <img className='w-8 h-8 lg:w-16 lg:h-16 xl:w-24 xl:h-24' src={iconobrush} alt="Icono" />
                </div>
            </div>    
            <div className='flex flex-col'>
                <h1>Top ventas</h1>
                <div className='flex flex-row flex-wrap justify-evenly'>
                    <div className='place-content-center bg-botonDigital bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className=' text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                            Ilustraciones
                        </div>
                    </div>
                    <div className='place-content-center bg-botonPinturas bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className=' text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                            Pinturas
                        </div>
                    </div>
                    <div className='place-content-center bg-botonEsculturas bg-no-repeat bg-cover bg-center w-96 h-96 items-center group'>
                        <div className=' text-center text-2xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                            Esculturas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
