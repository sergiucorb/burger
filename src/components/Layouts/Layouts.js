import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layouts.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layouts = (props) => (
    <Aux>
        <Toolbar/>
        <main className={classes.Container}>
            {props.children}
        </main>
    </Aux>
);
export default layouts;