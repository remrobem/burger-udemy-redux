import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true,
    };

    sideDrawerClosed = () => {
        this.setState({ showSideDrawer: false })
    };

    // use prevState rather than this.state in setState (async issue if you do that)
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    closed={this.sideDrawerClosed}
                    open={this.state.showSideDrawer} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};

export default Layout;