import React, {Component} from 'react';
import Layouts from './hoc/Layouts/Layouts';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
    render() {
        return (
            <div>
                <Layouts>
                    <BurgerBuilder/>
                </Layouts>
            </div>
        );
    }
}

export default App;
