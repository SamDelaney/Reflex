import React from 'react';
import {withLocalize, Translate} from 'react-localize-redux';
import { FormGroup, FormControlLabel, Switch, Container } from '@material-ui/core';

function FESwitches() {
    return(
        <Container maxWidth="sm">
            <FormGroup row={true}>
                <FormControlLabel value="lit" control={<Switch />} label={<Translate id='FESwitches.literalTranslation'/>}/>
                <FormControlLabel value="notes" control={<Switch />} label={<Translate id='FESwitches.notes'/>}/>
                <FormControlLabel value="ungramm" control={<Switch />} label={<Translate id='FESwitches.ungrammatical'/>}/>
            </ FormGroup>
        </Container>
    );
}

export default withLocalize(FESwitches);