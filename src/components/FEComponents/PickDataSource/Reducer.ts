import { PickSourceAction, PickSourceActions } from './Actions';

export interface DataSourceState {
    filename: string,
    flextext: string
}

export interface PickSourceState {
    sources: DataSourceState[],
    currentSource: string,
}

export const defaultState: PickSourceState = {
    sources: [
        {
            filename: "No Available Sources",
            flextext: ""
        }
    ],
    currentSource: "No Available Sources"
}

const pickSourceReducer = (
    state = defaultState,
    action: PickSourceAction
): PickSourceState => 
{
    switch(action.type) {
        case PickSourceActions.SELECT_SOURCE:

            state.currentSource = action.payload;

            return {...state};
            
        case PickSourceActions.ADD_SOURCE:

            state.sources.push(action.payload);
            state.currentSource = action.payload.filename;

            if(state.sources.length === 2 && state.sources[0].filename === "No Available Sources")
                state.sources.shift();

            return {...state};
        default:
            return state;
    }
}

export default pickSourceReducer;