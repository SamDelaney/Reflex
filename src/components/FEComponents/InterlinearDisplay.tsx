import React, { ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PickDataSource from './PickDataSource';
import { CardContent, Typography, InputBase } from '@material-ui/core';
import { Translate, withLocalize } from 'react-localize-redux';
import { loadXML} from '../../ScriptManager';

function InterlinearColumn() {

    const displayResult = () => {
        var location = document.URL;

        var xml = loadXML("xmlLocation");
        var xsl = loadXML(location + "xml2LeipzigLITE.xsl");
        
        if (document.implementation && document.implementation.createDocument)
        {
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            var result = xsltProcessor.transformToFragment(xml, document);
            var outputDiv = document.getElementsByClassName("OutputField")[0];
            outputDiv.innerHTML = "";
            outputDiv.appendChild(result);
        }
    }

    const tempDisplay = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        document.getElementsByClassName("OutputField")[0].innerHTML = event.target.value;
    }

    return (
        <Container maxWidth='sm'>
            <PickDataSource />
            <Card variant='outlined'>
                <CardContent>
                    <Typography>
                        <Translate id="interlinearDisplay.input" />
                    </Typography>
                    <InputBase
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ 'aria-label': 'naked' }}
                        onChange={tempDisplay}
                    />
                </CardContent>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <Typography>
                        <Translate id="interlinearDisplay.output" />
                    </Typography>
                    <div className='OutputField'/>
                </CardContent>
            </Card>
            <Button> <Translate id="interlinearDisplay.copy"/> </Button>
        </Container>
    )
}

export default withLocalize(InterlinearColumn);