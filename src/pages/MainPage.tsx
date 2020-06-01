import React from 'react';

import InterlinearDisplay from '../components/FEComponents/InterlinearDisplay';
import FEColumn from '../components/FEColumn';

function Main() {
    return (
        <>
            <div className="MainRow">
                <InterlinearDisplay />
                <FEColumn />
            </div>
        </>
    )
}

export default Main;