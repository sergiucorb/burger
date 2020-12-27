import React, {useState,useEffect} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layouts.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {useSelector} from "react-redux";

const Layouts =(props)=> {
const [showSideDrawer, setShowSideDrawer] = useState(false);
const isAuth = useSelector(state=>state.auth.token !== null);

   const openSideDrawer = () => {
        setShowSideDrawer(true);
    };

   const closeSideDrawer = () => {
        setShowSideDrawer(false);
    };

    return (
            <Aux>
                <Toolbar isAuth={isAuth} clicked={openSideDrawer}/>
                <SideDrawer clicked={closeSideDrawer} show={showSideDrawer}/>
                <main className={classes.Container}>
                    {props.children}
                </main>
            </Aux>
    )
}

export default Layouts;