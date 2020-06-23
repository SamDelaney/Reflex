import React from 'react';

import { Translate, withLocalize } from 'react-localize-redux';
import { Container, FormControl, NativeSelect, FormHelperText, Button, Grid } from '@material-ui/core';


interface DataSourceState {
    filename: string,
    flextext: string
}

interface PickDataSourceState {
    sources: DataSourceState[],
    currentSource: string,
}

function PickDataSource() {

    const [state, setState] = React.useState<PickDataSourceState>({
        sources: [
            {
                filename: "No Available Sources",
                flextext: ""
            },
            {
                filename: "otherfile",
                flextext: ""
            }
        ],
        currentSource: "No Available Sources"
    });

    const _selectSource = (event: React.ChangeEvent<{value: string}>) => {
        setState({
          ...state,
          currentSource: event.target.value
        });
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
                let sources = state.sources;
                sources.push({filename: file.name, flextext: fr.result as string});
                setState({
                    ...state,
                    currentSource: file.name,
                    sources
                });
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
                value={state.currentSource}
                    onChange={_selectSource}
                    inputProps={{
                        name: 'currentSource'
                    }}
                    >
                    {state.sources.map((source) => {
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