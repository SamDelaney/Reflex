import React from 'react';
import {useSelector, useDispatch,} from 'react-redux';

import { Translate, withLocalize } from 'react-localize-redux';
import { Container, FormControl, NativeSelect, FormHelperText, Button, Grid } from '@material-ui/core';

import { DataSourceState } from './Reducer';
import { StoreState } from '../../../rootReducer';
import { addSource, selectSource } from './Actions';

function PickDataSource() {

    const pickSourceState = useSelector((state: StoreState) => state.picksource);
    const dispatch = useDispatch();

    const _selectSource = (event: React.ChangeEvent<{value: string}>) => {
        dispatch(selectSource(event.target.value));
    };

    const _addSource = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            //setup and check for browser compatibility
            if (typeof window.FileReader !== 'function')
                throw Error("The file API isn't supported on this browser.");

            let input = event.target;

            if (!input)
                throw Error("The browser does not properly implement the event object");
            if (!input.files)
                throw Error("This browser does not support the `files` property of the file input.");
            if (!input.files[0])
                return undefined;

            let file = input.files[0];
            let fr = new FileReader();

            //define action to take after file has been read
            fr.onload = () => {
                dispatch(addSource({filename: file.name, flextext: fr.result as string}));
            };

            //read file
            fr.readAsText(file);
        }
        catch(e) {
            console.log(e.message);
        }
    }

    return (
        <Container maxWidth='sm'>
            <Grid container>
                <Grid item xs={6}>
            <FormControl>
                <NativeSelect
                    value={pickSourceState.currentSource}
                    onChange={_selectSource}
                    inputProps={{
                        name: 'currentSource'
                    }}
                    >
                    {pickSourceState.sources.map((source: DataSourceState) => {
                        return <option value={source.filename}>{source.filename}</option>
                    })}
                </NativeSelect>
                <FormHelperText> <Translate id="pickDataSource.dataSource" /> </FormHelperText>
            </FormControl>
            </Grid>
                <Grid item xs={6}> 
                    <Button variant="contained" component="label">
                        <Translate id="pickDataSource.addDataSource" />
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="fileInput"
                            accept=".flextext"
                            onChange={(e) => _addSource(e)}
                        />
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withLocalize(PickDataSource);