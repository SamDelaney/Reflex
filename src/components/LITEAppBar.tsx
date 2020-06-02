import React from 'react';
import { withLocalize, Translate } from 'react-localize-redux';
import {AppBar, Toolbar, IconButton, Typography, makeStyles, Theme, createStyles, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {Menu, AccountCircle, Settings} from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';

const AppBarStyles = makeStyles((theme: Theme) => 
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        title: {
            flexGrow: 1
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

                    <Typography variant="h6" color="inherit" className={classes.title}>
                        LITEr
                    </Typography>

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
            <Drawer variant="persistent" open={state.drawerOpen}>
                <Toolbar />
                <List>
                    <ListItem button key="convert" component={ Link } to="/">
                        <ListItemText primary={<Translate id="menuDrawer.convert" />}/>
                    </ListItem>
                    <ListItem button key="styles" component={ Link } to="/styles">
                        <ListItemText primary={<Translate id="menuDrawer.styles" />}/>
                    </ListItem>
                    <ListItem button key="history" component={ Link } to="/history">
                        <ListItemText primary={<Translate id="menuDrawer.history" />}/>
                    </ListItem>
                    
                    <ListItem button key="settings" component={ Link } to="/settings">
                        <ListItemText primary={<Translate id="menuDrawer.settings" />}/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default withLocalize(LITEAppBar);