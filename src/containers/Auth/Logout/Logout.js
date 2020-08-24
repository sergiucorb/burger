import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {onLogout} from "../../../store/actions/index";
import {connect} from "react-redux";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(onLogout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);