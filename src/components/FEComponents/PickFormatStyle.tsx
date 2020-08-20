import React from 'react';

import { AddCircleOutline } from '@material-ui/icons';
import { Container, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import FSPicker from "../FSComponents/FSPicker";


function PickFormatStyle() {

    return (
        <Container maxWidth='sm'>
            
            <FSPicker />

            <IconButton aria-label="create" component={Link} to="/styles">
                    <AddCircleOutline />
            </IconButton>

        </Container>
    )
}

export default PickFormatStyle;