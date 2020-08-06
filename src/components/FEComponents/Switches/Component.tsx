import React from 'react';
import { StoreState } from '../../../rootReducer'

import {withLocalize, Translate} from 'react-localize-redux';
import { FormGroup, FormControlLabel, Switch, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSwitch } from './Actions';
import { SwitchName } from './Reducer';

function FESwitches() {

    const switchesState = useSelector((state: StoreState) => state.switches);
    const dispatch = useDispatch();

    const _toggleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleSwitch(event.target.name as SwitchName, event.target.checked))
    }
    
    return(
        <Container maxWidth="sm">
            <FormGroup row={true}>

                <FormControlLabel  
                    control={<Switch checked={switchesState.lit} name="lit" onChange={_toggleSwitch}/>} 
                    label={<Translate id='FESwitches.literalTranslation'/>}
                />

                <FormControlLabel 
                    control={<Switch checked={switchesState.notes} name="notes" onChange={_toggleSwitch}/>} 
                    label={<Translate id='FESwitches.notes'/>}
                />

                <FormControlLabel 
                    control={<Switch disabled checked={switchesState.ungram} name="ungram" onChange={_toggleSwitch}/>} 
                    label={<Translate id='FESwitches.ungrammatical'/>}
                />

            </ FormGroup>
        </Container>
    );
}

export default withLocalize(FESwitches);