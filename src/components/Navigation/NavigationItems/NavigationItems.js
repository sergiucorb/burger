import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavtigationItem/NavigationItem";
import Aux from "../../../hoc/Aux/Aux";

const navigationItems = (props) => {
    return (
        <div>
            <ul className={classes.NavigationItems}>
                {props.isAuthenticated ?
                    (<Aux>
                        <NavigationItem link='/logout'>Logout</NavigationItem>
                        <NavigationItem link='/orders'>Orders</NavigationItem>
                    </Aux>) :
                    <NavigationItem link='/auth'>Authenticate</NavigationItem>
                }
                <NavigationItem link='/'>Burger Builder</NavigationItem>
            </ul>
        </div>
    )

};
export default navigationItems;