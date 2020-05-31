import React from 'react';

import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { Container, RadioGroup, Radio, FormControlLabel, TextField, Grid, FormLabel} from '@material-ui/core';


interface ReferenceSelectState {
    referenceName: string;
}

interface ReferenceSelectProps {
    selectLabel: string;
}

function ReferenceSelect(props:  ReferenceSelectProps & LocalizeContextProps) {

    const [state, setState] = React.useState<ReferenceSelectState>({
        referenceName: ""
    });

    return (
        <Container maxWidth='sm'>
            <FormLabel><Translate id={"referenceSelect." + props.selectLabel} /> </FormLabel>
            <Grid container>
                <Grid item xs={6}>
                <RadioGroup>
                    <FormControlLabel value="first" control={<Radio />} label="First Line" />
                    <FormControlLabel value="right" control={<Radio />} label="On Right" />
                    <FormControlLabel value="none" control={<Radio />} label="None"/>
                </RadioGroup>
            </Grid>
                <Grid item xs={6}> 
                    <TextField />
                </Grid>
            </Grid>
        </Container>
    )
}

export default withLocalize(ReferenceSelect);