import React from 'react';

import InterlinearColumn from '../components/formattedexamplecomponents/InterlinearDisplay';
import FormattedExample from '../components/FormattedExample';

function Main() {
    return (
        <div className="MainRow">
            <FormattedExample />
            <InterlinearColumn />
        </div>
    )
}

export default Main;