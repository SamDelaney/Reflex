import React, { useEffect } from 'react';
import PickDataSource from './PickDataSource/Component';
import {Button, Container, Card, CardContent,  InputBase,
    Typography, makeStyles, createStyles, Snackbar, IconButton, Grid 
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Input, FilterNone } from '@material-ui/icons'
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

const InterlinearColumnStyles = makeStyles(() =>
    createStyles({
        container: {
            width: "80%"
        },
        outputField: {
            fontSize: "55%",
            minHeight: "14vh",
            display:"block",
            overflow: "auto"
        },
        cardheader: {
            maxHeight: "1ex"
        },
        headerbutton: {
            marginTop: -20
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

                processor.setParameter("", "pInclude_baseline", store.formatstyles.styles[store.formatstyles.currentStyle].baseline ? 1 : 0);

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

    const _copyIn = () => {
        var inputField = document.getElementsByClassName("inputField")[0];
        
        navigator.clipboard.readText().then(contents => inputField.innerHTML = contents);
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

    interface CardHeaderProps {
        type: "input" | "output"
    }

    const CardHeader = (props: CardHeaderProps) => {

        const Title = () => (
        <Typography >
            <Translate id={"interlinearDisplay." + props.type} />
        </Typography>);

        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox && props.type === "input") return (<Title/>);

        return (
        <Grid justify="space-between" container className={classes.cardheader}>
            <Grid item>
                <Title />
            </Grid>
            <Grid item>
                <IconButton className={classes.headerbutton} onClick={props.type === "input" ? _copyIn : _copyOut }>
                    <HeaderIcon type={props.type}/>
                </IconButton>
            </Grid>
        </Grid>
    );}

    const HeaderIcon = (props: CardHeaderProps) => {
        if(props.type === "input")
            {
                return (<Input fontSize="small"/>);
            }
        else
            return (<FilterNone fontSize="small"/>);
    }

    return (
        <Container className={classes.container}>
            <PickDataSource />
            <Card variant='outlined'>
                <CardContent>
                    <CardHeader type="input"/>
                    <InputBase
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ 'aria-label': 'naked' }}
                        onChange={_displayResult}
                        className={"inputField"}
                    />
                </CardContent>
            </Card>

            <Card variant='outlined'>
                <CardContent>
                    <CardHeader type="output"/>
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