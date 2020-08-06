import {SwitchName} from './Reducer';

export enum SwitchActions {
    TOGGLE_SWITCH = "TOGGLE_SWITCH"
}

export type SwitchAction = ToggleSwitchAction;

interface ToggleSwitchAction {
    type: SwitchActions.TOGGLE_SWITCH,
    payload: { origin: SwitchName, status: boolean }
}

export function toggleSwitch(origin: SwitchName, status: boolean): ToggleSwitchAction {
    return {
        type: SwitchActions.TOGGLE_SWITCH,
        payload: {origin, status}
    }
}