import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavtigationItem/NavigationItem";

const navigationItems = () => (
    <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Burger Builder</NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>
    </div>
);
export default navigationItems;