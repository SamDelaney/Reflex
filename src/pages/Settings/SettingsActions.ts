export enum SettingsActions {
    SET_LANGUAGE = "SET_LANGUAGE"
}

export type SettingsAction = 
    | SetLanguageAction;

interface SetLanguageAction {
    type: SettingsActions.SET_LANGUAGE,
    payload: string
}

export function setLanguage(lang: string) {
    return {
        type: SettingsActions.SET_LANGUAGE,
        payload: lang
    };
}