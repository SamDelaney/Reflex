import {combineReducers, Reducer} from 'redux';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import pickSourceReducer, { PickSourceState} from './components/FEComponents/PickDataSource/Reducer';
import refSelectReducer, {RefSelectState} from './components/FEComponents/ReferenceSelect/Reducer';
import switchesReducer, {SwitchesState} from './components/FEComponents/Switches/Reducer'; 


export interface StoreState {
    localize: LocalizeState;
    picksource: PickSourceState;
    referenceselect: RefSelectState;
    switches: SwitchesState;
}


const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
  localize: localizeReducer,
  picksource: pickSourceReducer,
  referenceselect: refSelectReducer,
  switches: switchesReducer,
});

export default rootReducer;