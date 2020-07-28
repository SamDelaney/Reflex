import {ReferenceSelectAction, ReferenceSelectActions} from './Actions';

export type ReferenceInclusion = "none" | "first" | "right";

export type ComponentName = "languageNameSelect" | "dataSourceRefSelect";

export interface ComponentState {
    inclusion: ReferenceInclusion,
    name: string
}

export interface RefSelectState {
    languageNameSelect: ComponentState,
    dataSourceRefSelect: ComponentState
}

export const defaultState: RefSelectState =  {
    languageNameSelect: 
    {
            inclusion: "none",
            name: ""
    },
    dataSourceRefSelect:
    {
            inclusion: "none",
            name: ""
    }
}

const refSelectReducer = (
    state = defaultState,
    action: ReferenceSelectAction
): RefSelectState => 
{
    switch(action.type) {
        case ReferenceSelectActions.SET_INCLUSION:
            state[action.payload.origin].inclusion = action.payload.source;
            return {...state};
        case ReferenceSelectActions.SET_NAME:
            state[action.payload.origin].name = action.payload.name;
            return {...state};
        default:
            return state;
    }
}

export default refSelectReducer;