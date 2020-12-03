import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/pedidoContext';

const OBTENER_CLIENTES_USUARIO = gql `
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      email
      empresa
    }
  }
`;

const AsignarCliente = () =>{

    const [ cliente, setCliente ] = useState([]);

    // context de pedido
    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;

    // consultar la base de datos
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

    useEffect(() =>{
        agregarCliente(cliente);
    }, [cliente])

    const seleccionarCliente = clientes =>{
        setCliente(clientes);
    }

    // resultados de la consulta
    if (loading) return null;

    const { obtenerClientesVendedor } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                1.- Asignar un cliente al pedido</p>
            <Select
                className="mt-3"
                options={obtenerClientesVendedor}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                placeholder= "Busque o seleccione el cliente"
                noOptionMessage={() => "No hay resultados"}
            />
        </>
        
    );

}

export default AsignarCliente;