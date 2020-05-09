import React from 'react';

import { Translate, withLocalize } from 'react-localize-redux';
import { Container, FormControl, NativeSelect, FormHelperText, Button, Grid } from '@material-ui/core';


interface PickDataSourceState {
    filename: string;
}

function PickDataSource() {

    const [state, setState] = React.useState<PickDataSourceState>({
        filename: ""
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

    return (
        <Container maxWidth='sm'>
            <Grid container>
                <Grid item xs={6}>
            <FormControl>
                <NativeSelect
                value={state.filename}
                    onChange={handleChange}
                    inputProps={{
                        name: 'filename'
                    }}
                    >
                    <option value={1}>IcelandicExample</option> 
                    <option value={2}>Marubo</option>
                    <option value={3}>Sena</option>
                    <option value={4}>Vulcan</option>
                    {/* these values are temporary*/}
                </NativeSelect>
                <FormHelperText> <Translate id="pickDataSource.dataSource" /> </FormHelperText>
            </FormControl>
            </Grid>
                <Grid item xs={6}> 
                    <Button variant="outlined">
                        <Translate id="pickDataSource.addDataSource" />
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withLocalize(PickDataSource);