import { SwitchAction, SwitchActions } from './Actions';

export type SwitchName = "lit" | "notes" | "ungram";

export interface SwitchesState {
    lit: boolean,
    notes: boolean,
    ungram: boolean
}

const defaultState: SwitchesState = {
    lit: false,
    notes: false,
    ungram: false
}

const switchesReducer = (
    state = defaultState,
    action: SwitchAction
): SwitchesState => {
    switch (action.type) {
        case SwitchActions.TOGGLE_SWITCH:
            state[action.payload.origin] = action.payload.status;
            return {...state};
        default:
            return state;
    }
}

export default switchesReducer;