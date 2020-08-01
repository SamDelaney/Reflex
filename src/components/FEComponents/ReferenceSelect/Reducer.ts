import {ReferenceSelectAction, ReferenceSelectActions} from './Actions';

export type ReferenceInclusion = "none" | "first" | "right";

export type ComponentName = "languageNameSelect" | "dataSourceRefSelect";

export interface ComponentState {
    inclusion: ReferenceInclusion,
    name: string,
    names: string[]
}

export interface RefSelectState {
    languageNameSelect: ComponentState,
    dataSourceRefSelect: ComponentState
}

export const defaultState: RefSelectState =  {
    languageNameSelect: 
    {
            inclusion: "none",
            name: "",
            names: []
    },
    dataSourceRefSelect:
    {
            inclusion: "none",
            name: "",
            names: []
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
            //catch null error
            if(!action.payload.name)
                return state;

            //set name
            state[action.payload.origin].name = action.payload.name;

            //add to history
            if(!state[action.payload.origin].names.includes(action.payload.name))
            {
                state[action.payload.origin].names.push(action.payload.name)
                state[action.payload.origin].names.sort();
            }

            return {...state};
        default:
            return state;
    }
}

export default refSelectReducer;