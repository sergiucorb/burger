import React, {Component} from 'react';
import Layouts from './hoc/Layouts/Layouts';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import ViewOrder from "./components/Order/ViewOrder/ViewOrder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions/auth";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheck()
    }


    render() {
   console.log(this.props.isAuth)
    let routes = ( 
            <Switch>
                <Route path='/auth' exact component={Auth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to="/"/>

            </Switch>) 

        if(this.props.isAuth){
          routes = (
          <Switch>
                <Route path='/checkout' component={Checkout}/>
                <Route path='/orders/:id' exact component={ViewOrder}/>
                <Route path='/orders' exact component={Orders}/>
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
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthCheck: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
