import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layouts.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layouts extends Component {

    state = {
        showSideDrawer: false
    };

    openSideDrawer = () => {
        this.setState({showSideDrawer: true});
    };

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.openSideDrawer}/>
                <SideDrawer clicked={this.closeSideDrawer} show={this.state.showSideDrawer}/>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layouts;