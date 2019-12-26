import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        {/**This 3 div creating the Hamburger Icon for the side drawer
         * using the css only 
         */}
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle;