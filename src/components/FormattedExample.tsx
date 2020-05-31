import React from 'react';
import Container from '@material-ui/core/Container';

import { withLocalize } from 'react-localize-redux';
import { ReferenceSelect, PickFormatStyle, PickDataSource} from './formattedexamplecomponents';



function FormattedExample() {
    return (
        <Container maxWidth='sm'>
            <PickDataSource />
            <PickFormatStyle />
            <ReferenceSelect selectLabel={"languageNameSelect"}/>
            <ReferenceSelect selectLabel={"dataSourceRefSelect"}/>
        </Container>
    )
}

export default withLocalize(FormattedExample);