import React from 'react';
import { Paper, Theme, makeStyles, createStyles, FormControl, NativeSelect, FormLabel } from '@material-ui/core';
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { localizedLanguages } from "../../index";

//language state is unnecessary, but retained as a template for now
interface SettingsState {
    language: string;
}

const SettingsPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            borderRadius: 15,
            padding: 40,
            margin: 20,
            width: '55%'
        }
    })
);

function SettingsPage(props: LocalizeContextProps) {
    const classes = SettingsPageStyles();

    const [state, setState] = React.useState<SettingsState>({
        language: props.activeLanguage.code
    })

    const setLanguage = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
          ...state,
          [name]: event.target.value,
        });
        props.setActiveLanguage(event.target.value); //NOTE: this calls before setState() completes
        localStorage.setItem('language', event.target.value);
      };

    return (
        <Paper variant="outlined" className={classes.paper}>
            <h1><Translate id={"settingsPage.title"}/></h1>
            
            <FormControl>
                <FormLabel><Translate id={"settingsPage.language"} /></FormLabel>
                <NativeSelect onChange={setLanguage} inputProps={{name: 'language'}} value={state.language}>
                    {localizedLanguages.map((lang) => {
                        return (
                            <option value={lang.code}>{lang.name}</option>
                        )
                    })}
                </NativeSelect>
            </FormControl>
        </Paper>
    )
}

export default withLocalize(SettingsPage);