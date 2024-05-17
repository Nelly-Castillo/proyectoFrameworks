import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import chevronUpDownIcon  from '../assets/images/chevron-compact-down.svg'; 
import { Link } from 'react-router-dom';

const people = [
    {
        id: 1,
        name: 'Vendedor'
    },
    {
        id: 2,
        name: 'Comprador'
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function SignUp() {
    const [selected, setSelected] = useState(people[0]);
    return (
        <>
            <div className="flex bg-Blanco flex-col justify-center py-30">
                <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColo" class="bi bi-brush" viewBox="0 0 16 16" className='w-10 h-10 m-5 fill-Azul'>
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
                    </svg>
                </div>
                <div>
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-AzulOs">
                        Crear Cuenta 
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium leading-6 text-AzulOs">
                                Usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    autoComplete="user"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-AzulOs">
                                Nombre Completo 
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-AzulOs">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="passwordCon" className="block text-sm font-medium leading-6 text-AzulOs">
                                Confirmación de contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="passwordCon"
                                    name="passwordCon"
                                    type="text"
                                    autoComplete="passwordCon"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-VerLima sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                Estado
                            </label>
                        </div>
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-Naranja focus:outline-none focus:ring-2 focus:ring-NaranjaOs sm:text-sm sm:leading-6">
                                            <span className="flex items-center">
                                                <span className="ml-3 block truncate">{selected.name}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center px-2.5 bg-Naranja rounded-r-md">
                                                <img src={chevronUpDownIcon} alt="ChevroUpDow" className="h-5 w-5" fill="bg-Blanco" aria-hidden="true"/>
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className=" bg-white absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-Naranja text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-1 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {person.name}
                                                                    </span>
                                                                </div>
                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-Naranja',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-Naranja px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-NaranjaOs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Ya tienes una cuenta?{' '}
                        <Link to="/Login" className="font-semibold leading-6 text-Naranja hover:text-NaranjaOs">
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export { SignUp };

