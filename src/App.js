import React, {Component} from 'react';
import Layouts from './hoc/Layouts/Layouts';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <div>
                <Layouts>
                    <Switch>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/orders' exact  component={Orders}/>
                        <Route path='/' exact component={BurgerBuilder}/>
                    </Switch>
                </Layouts>
            </div>
        );
    }
}

export default App;
