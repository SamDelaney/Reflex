import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PickDataSource from './PickDataSource';
import { CardContent, Typography, InputBase, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Translate, withLocalize } from 'react-localize-redux';
import axios from 'axios';

const InterlinearColumnStyles = makeStyles((theme: Theme) =>
    createStyles({
        outputField: {
            fontSize: "55%",
            minHeight: "12vh"
        }
    })
);

function InterlinearColumn() {
    const classes = InterlinearColumnStyles();

    const _displayResult = () => {
        var location = document.URL.replace('#/', '/'); //replace made necessary by HashRouter

        axios.get(location + "flextext/IcelandicExample.flextext").then((xml) => {
            axios.get(location + "xml2LeipzigLITE2.xsl").then((xsl) => 
            {
                var processor = new XSLTProcessor();
                var parser = new DOMParser();

                processor.importStylesheet(parser.parseFromString(xsl.data, "text/xml"));

                var result = processor.transformToDocument(parser.parseFromString(xml.data, "text/xml"));

                var outputField = document.getElementsByClassName(classes.outputField)[0];
                outputField.innerHTML = result.documentElement.innerHTML;
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
                        onChange={_displayResult}
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