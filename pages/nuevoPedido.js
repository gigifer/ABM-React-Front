import React, { useContext, useState } from 'react';
import Layout from '../components/layout';
import AsignarCliente from '../components/pedidos/asignarCliente';
import AsignarProductos from '../components/pedidos/asignarProductos';
import ResumenPedido from '../components/pedidos/resumenPedido';
import Total from '../components/pedidos/total';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

// context de pedido
import PedidoContext from '../context/pedidos/pedidoContext';

const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input){
            id
        }
    }
`;

const PEDIDOS_VENDEDOR = gql`
    query obtenerPedidosVendedor{
        obtenerPedidosVendedor{
            id
            pedido{
                id
                cantidad
                nombre
            }
            cliente {
                id
                nombre
                apellido
                email
                telefono
            }
            vendedor
            total
            estado
        }
    }
`;

const NuevoPedido = () =>{

    const router = useRouter();

    const [ mensaje, setMensaje ] = useState(null);

    //utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;
    
    // mutation para nuevo pedido
    const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO, {
        update(cache, {data: { nuevoPedido }} ){
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: PEDIDOS_VENDEDOR
            });

            cache.writeQuery({
                query: PEDIDOS_VENDEDOR,
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido ]
                }
            })
        }
    });

    const validarPedido = () =>{
        return !productos.every( producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50  cursor-not-allowed" : "";
    }

    const crearNuevoPedido = async () =>{

        const { id } = cliente;

        // remover lo no deseado de productos
        const pedido = productos.map(({__typename, existencia, ...producto})=> producto);      

        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente:id,
                        total,
                        pedido
                    }
                }
            })

            // redireccionar
            router.push('/pedidos');

            // mostrar alerta
            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente',
                'success'
            )

        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje = () =>{
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return(
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo Pedido</h1>

            { mensaje && mostrarMensaje() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <AsignarCliente/>
                <AsignarProductos/>
                <ResumenPedido/>
                <Total/>

                <button
                type="button"
                className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${ validarPedido() }`} 
                onClick={() => crearNuevoPedido() } >
                   
                    registar pedido
                </button>
                </div>
            </div>
        </Layout>

    );
}

export default NuevoPedido;