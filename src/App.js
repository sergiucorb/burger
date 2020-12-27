import React, {useEffect} from 'react';
import Layouts from './hoc/Layouts/Layouts';
import { useSelector,useDispatch } from 'react-redux';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import ViewOrder from "./components/Order/ViewOrder/ViewOrder";
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions/auth";
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
    return import('./containers/Checkout/Checkout');
});
const asyncAuth = asyncComponent(()=>{
    return import('./containers/Auth/Auth');
});
const asyncOrders = asyncComponent(()=>{
    return import('./containers/Orders/Orders');
});

const App = (props) => {
    useEffect(()=>{
            onAuthCheck
        return ()=>{
            onAuthCheck
        } 
    },[]) 

    const isAuth = useSelector(state=>state.auth.token !== null);
    const onAuthCheck = useDispatch(authCheckState);

    let routes = ( 
            <Switch>
                <Route path='/auth' exact component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>) 

        if(isAuth){
          routes = (
          <Switch>
                <Route path='/checkout' component={asyncCheckout}/>
                <Route path='/orders/:id' exact component={ViewOrder}/>
                <Route path='/orders' exact component={asyncOrders}/>
                <Route path='/logout' exact component={Logout}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
          )
        }       
        return (
            <div>
                <Layouts>
                    {routes}
                </Layouts>
            </div>
        );
}
export default withRouter(App);
