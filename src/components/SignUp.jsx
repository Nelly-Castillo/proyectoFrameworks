import brushSVG from '../assets/images/brush.svg';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import chevronUpDownIcon  from '../assets/images/chevron-compact-down.svg'; 

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
                    <img src={brushSVG} alt="Brush" className='w-10 h-10 m-5'/>
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
                        <a href="#" className="font-semibold leading-6 text-Naranja hover:text-NaranjaOs">
                            Iniciar Sesión
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export { SignUp };

