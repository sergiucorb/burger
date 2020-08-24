import React from 'react';
import classes from './Toolbar.css'

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../../Menu/Menu";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>
                <Menu clicked={props.clicked}/>
            </div>

            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DisplayOnlyDesktop}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>

        </header>
    )
};
export default toolbar;



