import React from 'react';
import {useSelector, useDispatch,} from 'react-redux';

import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { Container, RadioGroup, Radio, FormControlLabel, TextField, Grid, FormLabel} from '@material-ui/core';

import { RefSelectState, ComponentName, ReferenceInclusion } from './Reducer';
import { StoreState } from '../../../rootReducer';
import { setName, setInclusion } from './Actions';

interface ReferenceSelectProps {
    selectLabel: ComponentName;
}

function ReferenceSelect(props:  ReferenceSelectProps & LocalizeContextProps) {

    const refSelectState = useSelector((state: StoreState) => state.referenceselect);
    const dispatch = useDispatch();

    const _setInclusion = (event: React.ChangeEvent<{value: string}>) => {
        dispatch(setInclusion(event.target.value as ReferenceInclusion, props.selectLabel))
    }

    const _setName = (event: React.ChangeEvent<{value: string}>) => {
        dispatch(setName(event.target.value, props.selectLabel))
    }

    return (
        <Container maxWidth='sm'>
            <FormLabel><Translate id={"referenceSelect." + props.selectLabel} /> </FormLabel>
            <Grid container>
                <Grid item xs={6}>
                    <RadioGroup onChange={_setInclusion}>
                        <FormControlLabel value="first" control={<Radio />} label={<Translate id='referenceSelect.firstOption'/>} />
                        <FormControlLabel value="right" control={<Radio />} label={<Translate id='referenceSelect.rightOption'/>} />
                        <FormControlLabel value="none" control={<Radio />} label={<Translate id='referenceSelect.noneOption'/>} />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6}> 
                    <TextField label={<Translate id="referenceSelect.name"/>} onChange={_setName}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withLocalize(ReferenceSelect);