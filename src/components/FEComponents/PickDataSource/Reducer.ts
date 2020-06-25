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
    state: PickSourceState | undefined,
    action: PickSourceAction
): PickSourceState => 
{
    if(typeof state === 'undefined')
        return defaultState;
        
    switch(action.type) {
        case PickSourceActions.SELECT_SOURCE:
            state.currentSource = action.payload;
            return {...state};
        case PickSourceActions.ADD_SOURCE:
            state.sources.push(action.payload);
            state.currentSource = action.payload.filename;
            return {...state};
        default:
            return state;
    }
}

export default pickSourceReducer;