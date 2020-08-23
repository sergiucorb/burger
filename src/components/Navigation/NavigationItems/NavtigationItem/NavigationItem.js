import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from "react-router-dom";

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/*className={props.active ? classes.active : null*/}
        <nav>
            <NavLink exact activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
        </nav>
    </li>
);

export default navigationItem;