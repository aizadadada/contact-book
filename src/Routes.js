import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsContextProvider from './components/context/ProductsContext';
import AddPage from './components/pages/AddPage';
import EditPage from './components/pages/EditPage';
import MainPage from './components/pages/MainPage';

const Routes = () => {
    return (
        <ProductsContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/add" component={AddPage} />
                    <Route exact path="/edit/:key" component={EditPage} />
                </Switch>
            </BrowserRouter>
        </ProductsContextProvider>
    );
};

export default Routes;