import React from 'react';
import Aux from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    // Aux used as high-order component so wrapping element not required
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <Toolbar />
        <SideDrawer />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;