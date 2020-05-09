import React from 'react';
import Container from '@material-ui/core/Container';

import { withLocalize } from 'react-localize-redux';
import { LanguageName, PickFormatStyle, PickDataSource} from './formattedexamplecomponents';



function FormattedExample() {
    return (
        <Container maxWidth='sm'>
            <PickDataSource />
            <PickFormatStyle />
            <LanguageName />
        </Container>
    )
}

export default withLocalize(FormattedExample);