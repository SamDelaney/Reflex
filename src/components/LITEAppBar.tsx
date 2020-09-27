import React from 'react';
import { withLocalize, Translate } from 'react-localize-redux';
import {AppBar, Toolbar, IconButton, makeStyles, Theme, createStyles, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Button} from '@material-ui/core';
import {Menu, AccountCircle, Settings, History, Assignment, Style} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import HorizontalLogo from '../resources/InvertedHorizontal.png';

const AppBarStyles = makeStyles((theme: Theme) => 
    createStyles({
        appBar: {
            position: "relative", //required for Chrome/Opera
            zIndex: theme.zIndex.drawer + 1
        },
        title: {
            flexGrow: 1
        },
        drawer: {
            width: 240
        },
        menuButton: {
            marginRight: theme.spacing(2)
        }
    }),
);

function LITEAppBar() {
    const classes = AppBarStyles();

    const [state, setState] = React.useState({
        drawerOpen: false
    });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent,
        ) => {
          if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
      
          setState({ ...state, drawerOpen: open });
        };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar >
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(!state.drawerOpen)}>
                        <Menu />
                    </IconButton>
                    <div className={classes.title}>
                        <Button
                            aria-label="home page"
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            <img src={HorizontalLogo} height="50" alt="Reflex"/>
                        </Button>   
                    </div>

                    <IconButton
                        aria-label="account"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="settings"
                        color="inherit"
                        component={Link}
                        to="/settings"
                    >                            
                            <Settings />
                    </IconButton>
                </Toolbar >
            </AppBar>
            <Drawer variant="persistent" open={state.drawerOpen} className={classes.drawer} classes={{paper: classes.drawer}}>
                <Toolbar />
                <List>
                    <ListItem button key="convert" component={ Link } to="/">
                        <ListItemIcon><Assignment /></ListItemIcon>
                        <ListItemText primary={<Translate id="menuDrawer.convert" />}/>
                    </ListItem>
                    <ListItem button key="styles" component={ Link } to="/styles">
                        <ListItemIcon><Style /></ListItemIcon>
                        <ListItemText primary={<Translate id="menuDrawer.styles" />}/>
                    </ListItem>
                    <ListItem button key="history" component={ Link } to="/history">
                        <ListItemIcon><History /></ListItemIcon>
                        <ListItemText primary={<Translate id="menuDrawer.history" />}/>
                    </ListItem>
                    
                    <Divider />

                    <ListItem button key="settings" component={ Link } to="/settings">
                        <ListItemIcon><Settings /></ListItemIcon>
                        <ListItemText primary={<Translate id="menuDrawer.settings" />}/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default withLocalize(LITEAppBar);