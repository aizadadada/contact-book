import axios from 'axios';
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import { API } from '../../helpers/const';

export const productsContext = React.createContext() //создаем переменную для контекст 
const INIT_STATE = { // создаем объект со свойствами по умолчанию 
    products: null,
    productToEdit: null
}

const reducer = (state = INIT_STATE, action) => { //для обработки наших действий 
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "GET_PRODUCT_TO_EDIT":
            return { ...state, productToEdit: action.payload }
        default:
            return { ...state }

    }
}

const ProductsContextProvider = ({ children }) => { // деструктуризируем чилдрен  

    const [state, dispatch] = useReducer(reducer, INIT_STATE)//это хук, который возвращает нам массив. Массив состоит из state(состояние), dispatch(который вызывает нам reducer(меняет какой-либо state => switch))


    const addProduct = async (newProduct) => {//для обработки ошибки
        try {
            await axios.post("http://localhosts:8005/products", newProduct)
            toast('Успешно создано!')
        }
        catch (e) {
            toast('Ошибка приложения. Попробуйте еще раз!')
        }
    }
    const getProducts = async () => {
        const { data } = await axios(API)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }
    const deleteProducts = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()//мы вызываем эту функцию, чтобы показать пользователю новые данные
    }
    const getProductToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    const saveEditedProduct = async (editedProduct) => {
        await axios.patch(`${API}/${editedProduct.id}`, editedProduct)//метод меняет то, поле
        getProducts()
    }
    return (
        <productsContext.Provider value={{// это STORE
            products: state.products,
            productToEdit: state.productToEdit,
            addProduct,
            getProducts,
            deleteProducts,
            getProductToEdit,
            saveEditedProduct
        }}>
            {children}
        </productsContext.Provider>
    );
};

export default ProductsContextProvider;