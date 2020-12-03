import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/pedidoContext';

const OBTENER_PRODUCTOS = gql `
    query obtenerProductos{
        obtenerProductos{
            id
            precio
            nombre
            existencia
        }
    }
`;

const AsignarProductos = () =>{

    // state local del componente
    const [ productos, setProductos ] = useState([]);

    // context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    // consulta a la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    useEffect(() =>{
        agregarProducto(productos)
    }, [productos])

    const seleccionarProducto = producto => {
        setProductos(producto)
    }

    if (loading) return null;
    const { obtenerProductos } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                1.- Asignar productos al pedido</p>
            <Select
                className="mt-3"
                options={ obtenerProductos }
                onChange={ opcion =>seleccionarProducto(opcion) }
                isMulti={ true }
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder= "Busque o seleccione el producto"
                noOptionMessage={() => "No hay resultados"}
            />
        </>
    )
}

export default AsignarProductos;