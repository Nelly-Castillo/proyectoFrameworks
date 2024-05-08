import React from 'react';
import brushSVG from '../assets/images/brush.svg';
//import { ReactComponent as BrushSVG } from '../assets/images/brush.svg'; 

function Login() {
    return (
        < >
            <div className="flex   bg-Blanco flex-col justify-center py-40  ">
                    <div className='flex justify-center'>
                        <img src={brushSVG} alt="Brush" className='w-10 h-10 m-5'/>
                    </div>
                    <div>
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-AzulOs">
                            Iniciar sesion
                        </h2>
                    </div>

                    <div className="mt-20 md:mx-auto md:w-3/6 md:max-w-md">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-AzulOs">
                            Usuario
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-Naranja px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-NaranjaOs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesion
                        </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes una cuenta?{' '}
                        <a href="#" className="font-semibold leading-6 text-Naranja hover:text-NaranjaOs">
                        Crear cuenta
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export { Login };
