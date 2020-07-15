import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavtigationItem/NavigationItem";

const navigationItems = () => (
    <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            {/*<NavigationItem link='/checkout'>Checkout</NavigationItem>*/}
            <NavigationItem  link='/'>Burger Builder</NavigationItem>

        </ul>
    </div>
);
export default navigationItems;