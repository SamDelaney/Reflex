import {combineReducers, Reducer} from 'redux';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import pickSourceReducer, { PickSourceState} from './components/FEComponents/PickDataSource/Reducer';


export interface StoreState {
    temp: TempState;
    localize: LocalizeState;
    picksource: PickSourceState;
}

interface TempState {
  darkThemeOn: Boolean;
}

const TEMP_ACTION = "TEMP_ACTION";
type TEMP_ACTION = typeof TEMP_ACTION;

interface TempAction {
  type: TEMP_ACTION
}

export type TempActions = TempAction;

const defaultState : TempState = {
   darkThemeOn: false
};

export const tempReducer = (state: TempState | undefined, action: TempActions): TempState => {
    if (typeof state === 'undefined') {
      state = defaultState // If state is undefined, initialize it with a default value
    }
    
    return state;
  }

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
  localize: localizeReducer,
  temp: tempReducer,
  picksource: pickSourceReducer
});

export default rootReducer;