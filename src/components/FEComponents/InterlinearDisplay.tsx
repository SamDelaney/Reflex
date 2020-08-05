import React, { useEffect } from 'react';
import PickDataSource from './PickDataSource/Component';
import {Button, Container, Card, CardContent,  InputBase,
    Typography, makeStyles, Theme, createStyles, Snackbar 
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Translate, withLocalize } from 'react-localize-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { StoreState } from '../../rootReducer';
import PhraseFinder from '../../scripts/PhraseFinder';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ColumnLocalState {
    open: boolean,
    status: "success" | "error",
    input: string
}

const defaultState: ColumnLocalState = {
    open: false, 
    status: "success", 
    input:""
}

const InterlinearColumnStyles = makeStyles((theme: Theme) =>
    createStyles({
        outputField: {
            fontSize: "55%",
            minHeight: "12vh"
        }
    })
);

function InterlinearColumn() {
    const store = useSelector((state: StoreState) => state)
    const [localState, setLocalState] = React.useState<ColumnLocalState>(defaultState);

    const classes = InterlinearColumnStyles();

    const _displayResult = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalState(
            {...localState, input: e.target.value}
        )
    }

    useEffect(() => {
        console.log(JSON.stringify(store.referenceselect));
        var clipboard: string = localState.input || "";
        try {
            if (clipboard === "") {
                return;
            }

            var location = document.URL.replace('#/', '/'); //replace made necessary by HashRouter
            const xmlSource = store.picksource.sources.find(
                source => source.filename === store.picksource.currentSource)
                ?.flextext;

            if (typeof xmlSource !== 'string')
                throw Error("File contents could not be read.");

            axios.get(location + "xml2LeipzigLITE2.xsl").then((xsl) => 
            {
                var processor = new XSLTProcessor();
                var parser = new DOMParser();
                var phraseFinder = new PhraseFinder(xmlSource);

                processor.importStylesheet(parser.parseFromString(xsl.data, "text/xml"));

                processor.setParameter("", "pInclude_language", store.referenceselect.languageNameSelect.inclusion);
                processor.setParameter("", "pLanguage_name", store.referenceselect.languageNameSelect.name);

                processor.setParameter("", "pInclude_source_reference", store.referenceselect.dataSourceRefSelect.inclusion);
                processor.setParameter("", "pSource_reference", store.referenceselect.dataSourceRefSelect.name);

                // processor.setParameter("", "pInclude_baseline", 1);

                processor.setParameter("", "pIndicate_ungrammatical", store.switches.ungram ? 1 : 0);
                processor.setParameter("", "pInclude_notes", store.switches.notes ? 1 : 0);
                processor.setParameter("", "pInclude_literal_trans", store.switches.lit ? 1 : 0);

                var result = processor.transformToDocument(parser.parseFromString(phraseFinder.getPhrase(clipboard), "text/xml"));

                var outputField = document.getElementsByClassName(classes.outputField)[0];

                outputField.innerHTML = result.documentElement.innerHTML;
            });
        }
        catch(e) {
            console.log(e.message);
        }
    });

    const _copyOut = () => {
        var outputField = document.getElementsByClassName(classes.outputField)[0];
        var range = document.createRange();

        range.selectNode(outputField);

        try{
            window.getSelection()?.addRange(range);
            var success = document.execCommand('copy') ? "success" : "error";
            setLocalState({
                ...localState,
                open: true,
                status: success as "success" | "error",
            });
        }
        catch {
            setLocalState({
                ...localState,
                open: true,
                status: "error",
            });
        }
    }

    const _closeSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setLocalState({
            ...localState,
            open: false
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
            <Button onClick={_copyOut}> <Translate id="interlinearDisplay.copy"/> </Button>
            <Snackbar open={localState.open} autoHideDuration={6000} onClose={_closeSnackbar}>
                <Alert onClose={_closeSnackbar} severity={localState.status}>
                    <Translate id={"interlinearDisplay.copyMessages." + localState.status}/>
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default withLocalize(InterlinearColumn);