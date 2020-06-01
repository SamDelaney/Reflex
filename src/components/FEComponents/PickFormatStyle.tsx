import React from 'react';

import { AddCircleOutline } from '@material-ui/icons';
import { Translate, withLocalize } from 'react-localize-redux';
import { Container, FormControl, NativeSelect, FormHelperText, IconButton, Grid } from '@material-ui/core';


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

            <IconButton aria-label="create">
                    <AddCircleOutline />
            </IconButton>
        </Container>
    )
}

export default withLocalize(PickFormatStyle);