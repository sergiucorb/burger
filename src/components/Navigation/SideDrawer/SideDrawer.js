import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css';
import Backdrop from "../../UI/Backgrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.show} backdropClicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavigationItems/>
            </div>
        </Aux>
    );
};

export default sideDrawer;