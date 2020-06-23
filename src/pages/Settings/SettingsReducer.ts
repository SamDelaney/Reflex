import { SettingsAction, SettingsActions } from "./SettingsActions";

export interface SettingsState {
    language: string;
}

export const defaultState: SettingsState = {
    language: "en"
}

const settingsReducer = (
    state: SettingsState = defaultState,
    action: SettingsAction
    ): SettingsState => 
    {
        switch(action.type) {
            case SettingsActions.SET_LANGUAGE:
                state.language = action.payload;
                return {...state};
            default:
                return state;
        }
    };

export default settingsReducer;

