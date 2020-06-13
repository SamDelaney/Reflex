import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PickDataSource from './PickDataSource';
import { CardContent, Typography, InputBase, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Translate, withLocalize } from 'react-localize-redux';
import axios from 'axios';
import XML from 'xml.one';

const InterlinearColumnStyles = makeStyles((theme: Theme) =>
    createStyles({
        outputField: {
            fontSize: "55%",
            minHeight: "12vh"
        }
    })
);

function InterlinearColumn() {
    const classes = InterlinearColumnStyles()

    const displayResult = () => {
        var location = document.URL.replace('#/', '/');

        axios.get(location + "flextext/IcelandicExample.flextext").then((xml) => {
            axios.get(location + "xml2LeipzigLITE2.xsl").then((xsl) => 
            {
                var parsedXML = XML.parse(xml.data);
                var parsedXSL = XML.parse(xsl.data);

                var html = XML.transform(parsedXML, parsedXSL);

                var outputField = document.getElementsByClassName(classes.outputField)[0];
                
                outputField.innerHTML = html.documentElement.innerHTML;
            })

        });
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
                        onChange={displayResult}
                    />
                </CardContent>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <Typography>
                        <Translate id="interlinearDisplay.output" />
                    </Typography>
                    <div className={classes.outputField}/>
                </CardContent>
            </Card>
            <Button> <Translate id="interlinearDisplay.copy"/> </Button>
        </Container>
    )
}

export default withLocalize(InterlinearColumn);