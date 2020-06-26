import React from 'react';
import classes from './Toolbar.css'

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.clicked}>
                MENU
            </div>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DisplayOnlyDesktop}>
                <NavigationItems/>
            </nav>

        </header>
    )

};
export default toolbar;