import React from 'react';
import { withLocalize } from 'react-localize-redux';
import {AppBar, Toolbar, IconButton, Typography, makeStyles, Theme, createStyles} from '@material-ui/core';
import {Menu, AccountCircle, Settings} from '@material-ui/icons';

const AppBarStyles = makeStyles((theme: Theme) => 
    createStyles({
        title: {
            flexGrow: 1
        }
    }),
);

function LITEAppBar() {
    const classes = AppBarStyles();
    return (
        <AppBar position="static">
            <Toolbar >
                <IconButton edge="start" color="inherit" aria-label="menu">
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
                >
                    <Settings />
                </IconButton>
            </Toolbar >
        </AppBar>
    )
}

export default withLocalize(LITEAppBar);