import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        const url = 'https://proyectoframeworksbackend-production.up.railway.app/user/login';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Login successful:', JSON.parse(xhr.responseText));
                    navigate("/");

                } else {
                    console.error('Error during login:', xhr.responseText);
                }
            }
        };

        const data = JSON.stringify({
            user_name: userName,
            password: password
        });

        xhr.send(data);
    };

    return (
        <>
            <div className="flex bg-Blanco flex-col justify-center py-28">
                <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColo" class="bi bi-brush" viewBox="0 0 16 16" className='w-10 h-10 m-5 fill-Azul'>
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
                    </svg>
                </div>
                <div>
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-AzulOs">
                        Iniciar sesion
                    </h2>
                </div>

                <div className="mt-20 md:mx-auto md:w-3/6 md:max-w-md">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-AzulOs">
                                Usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    id="user_name"
                                    name="user_name"
                                    type="text"
                                    autoComplete="user_name"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-Naranja px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-Azul focus-visible:outline"
                                >
                                    Iniciar sesion
                                </button>
                        </div>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes una cuenta?{' '}
                        <Link to="/SignUp" className="font-semibold leading-6 text-Naranja hover:text-Azul">
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export { Login };

