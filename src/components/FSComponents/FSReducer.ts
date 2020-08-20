import {FSAction, FSActions} from './FSActions';

export interface StyleState {
    name: string;
    baseline?: boolean;
}

const GSRL4Line: StyleState = {
    name: "4-line GSRL Standard",
    baseline: true
}

const GSRL3Line: StyleState = {
    name: "3-line GSRL Standard"
}

export interface FSState {
    styles: StyleState[];
    currentStyle: number;
}

export const defaultState: FSState = {
    styles: [GSRL3Line, GSRL4Line],
    currentStyle: 0
};

const FSReducer = (
    state = defaultState,
    action: FSAction
): FSState => {
    switch(action.type) {
        case FSActions.SELECT_STYLE:

            state.currentStyle = state.styles.findIndex((style) => { 
                return style.name === action.payload 
            });

            return {...state};

        default:
            return state;
    }
}

export default FSReducer;