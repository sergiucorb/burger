import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layouts.css';

const layouts = (props) => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className={classes.Container}>
            {props.children}
        </main>
    </Aux>
)
export default layouts;