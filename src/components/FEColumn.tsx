import React from 'react';
import Container from '@material-ui/core/Container';

import { withLocalize } from 'react-localize-redux';
import { ReferenceSelect, PickFormatStyle, FESwitches} from './FEComponents';



function FEColumn() {
    return (
        <Container maxWidth='sm'>
            <PickFormatStyle />
            <ReferenceSelect selectLabel={"languageNameSelect"}/>
            <ReferenceSelect selectLabel={"dataSourceRefSelect"}/>
            <FESwitches />
        </Container>
    )
}

export default withLocalize(FEColumn);