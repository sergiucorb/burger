import React from 'react';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import classes from './Menu.css';

const menu = (props) => (
    <div>
        <FontAwesomeIcon className={classes.Menu} onClick={props.clicked} icon={faBars}/>
    </div>
);
export default menu;