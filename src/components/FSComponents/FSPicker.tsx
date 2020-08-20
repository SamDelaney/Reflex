import React from 'react';
import {useSelector, useDispatch,} from 'react-redux';

import { Translate, withLocalize } from 'react-localize-redux';
import { FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import { StoreState } from '../../rootReducer';
import { StyleState } from './FSReducer';
import { selectStyleAction } from './FSActions';


interface PickFormatStyleState {
    formatStyle: string;
}

function PickFormatStyle() {

    const pickFSState = useSelector((state: StoreState) => state.formatstyles);
    const dispatch = useDispatch();

    const _handleChange = (event: React.ChangeEvent<{ value: string }>) => {
        dispatch(selectStyleAction(event.target.value))
      };

    return (
        <FormControl>
            <NativeSelect
                value={pickFSState.styles[pickFSState.currentStyle].name}
                onChange={_handleChange}
                inputProps={{
                    name: 'formatStyle'
                }}
                >
                {pickFSState.styles.map((style: StyleState) => {
                    return <option value={style.name}>{style.name}</option>
                })}
            </NativeSelect>
            <FormHelperText> <Translate id="pickFormatStyle.formatStyle" /> </FormHelperText>
        </FormControl>
    )
}

export default withLocalize(PickFormatStyle);