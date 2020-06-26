import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layouts.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layouts extends Component {

    state = {
        showSideDrawer: false
    };

    clickMenuHandler = () => {
        this.setState({showSideDrawer: true});
    };

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.clickMenuHandler}/>
                <SideDrawer clicked={this.closeSideDrawer} show={this.state.showSideDrawer}/>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layouts;