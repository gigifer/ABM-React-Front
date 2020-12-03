import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () =>{

    // routing the next
    const router = useRouter();

    return (
        <aside className= "bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className= "text-white text-2xl font-black">CMR clientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-blue-800 p2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Clientes
                        </a>
                   </Link>
                </li>
                <li className={router.pathname === "/pedidos" ? "bg-blue-800 p2" : "p-2"}>
                    <Link href="/pedidos">
                        <a className="text-white block">
                            Pedidos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/productos" ? "bg-blue-800 p2" : "p-2"}>
                    <Link href="/productos">
                        <a className="text-white block">
                            Productos
                        </a>
                    </Link>
                </li>
            </nav>

            <div className="sm:mt-10">
            <p className= "text-white text-2xl font-black">Otras opciones</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/mejoresVendedores" ? "bg-blue-800 p2" : "p-2"}>
                    <Link href="/mejoresVendedores">
                        <a className="text-white block">
                            Mejores vendedores
                        </a>
                   </Link>
                </li>
                <li className={router.pathname === "/mejoresClientes" ? "bg-blue-800 p2" : "p-2"}>
                    <Link href="/mejoresClientes">
                        <a className="text-white block">
                            Mejores clientes
                        </a>
                   </Link>
                </li>
            </nav>
        </aside>
    );
}

export default Sidebar;