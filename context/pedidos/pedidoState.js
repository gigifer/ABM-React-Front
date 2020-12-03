import React, { useReducer } from 'react';
import PedidoContext from './pedidoContext';
import pedidoReducer from './pedidoReducer';
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types';

const PedidoState = ({children}) =>{

    // state de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(pedidoReducer, initialState);

    // modificar cliente
    const agregarCliente = cliente =>{
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // modificar producto
    const agregarProducto = productosSeleccionados => {

        let nuevoState;
        if(state.productos.length > 0){
            // tomar del segundo arreglo, una copia para asignarle al primero
            nuevoState = productosSeleccionados.map( producto =>{
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id);
                return {...producto, ...nuevoObjeto}
            })
        } else {
            nuevoState = productosSeleccionados;
        }
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    // modificar las cantidades del producto
    const cantidadProductos = nuevoProducto =>{
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () =>{
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal
            }}>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;