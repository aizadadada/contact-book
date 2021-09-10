
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { productsContext } from '../context/ProductsContext';

const EditPage = () => {
    const { getProductToEdit, productToEdit, saveEditedProduct } = useContext(productsContext)
    const { key } = useParams()
    useEffect(() => {
        getProductToEdit(key)
    }, [])
    const [editProduct, setEditProduct] = useState(productToEdit)//useState принимает знасение по умолчанию(null), 
    useEffect(() => {
        setEditProduct(productToEdit)
    }, [productToEdit])

    function handleInputs(e) {
        let obj = {
            ...editProduct,
            [e.target.name]: e.target.value
        }
        setEditProduct(obj)
    }

    const history = useHistory()
    return (
        <div>
            <h2>Edit Page</h2>
            {
                editProduct ? (
                    <>
                        <Form.Control onChange={handleInputs} name="title" value={editProduct.title} type="text" />
                        <Form.Control onChange={handleInputs} name="price" value={editProduct.price} type="text" />
                        <Form.Control onChange={handleInputs} name="photo" value={editProduct.photo} type="text" />
                        <Form.Control onChange={handleInputs} name="description" value={editProduct.description} type="text" />
                        <Button onClick={() => {
                            saveEditedProduct(editProduct)
                            history.push('/')
                        }} variant="success">Save</Button>
                    </>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </div>
    );
};

export default EditPage;