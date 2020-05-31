import React from 'react';

import { Translate, withLocalize } from 'react-localize-redux';
import { Container, FormControl, NativeSelect, FormHelperText, Button, Grid } from '@material-ui/core';


interface PickFormatStyleState {
    formatStyle: string;
}

function PickFormatStyle() {

    const [state, setState] = React.useState<PickFormatStyleState>({
        formatStyle: ""
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
                value={state.formatStyle}
                    onChange={handleChange}
                    inputProps={{
                        name: 'formatStyle'
                    }}
                    >
                    <option value={1}>3-line GSRL Standard</option> 
                    <option value={2}>4-line GSRL Standard</option>
                    {/* these values are temporary*/}
                </NativeSelect>
                <FormHelperText> <Translate id="pickFormatStyle.formatStyle" /> </FormHelperText>
            </FormControl>
            </Grid>
                <Grid item xs={6}> 
                    <Button variant="outlined">
                        <Translate id="pickFormatStyle.createFormatStyle" /> 
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withLocalize(PickFormatStyle);