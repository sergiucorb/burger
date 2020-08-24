import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layouts.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

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
                <Toolbar isAuth={this.props.isAuth} clicked={this.openSideDrawer}/>
                <SideDrawer clicked={this.closeSideDrawer} show={this.state.showSideDrawer}/>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps,null)(Layouts);