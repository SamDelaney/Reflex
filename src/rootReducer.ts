import {combineReducers, Reducer} from 'redux';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import pickSourceReducer, { PickSourceState} from './components/FEComponents/PickDataSource/Reducer';
import refSelectReducer, {RefSelectState} from './components/FEComponents/ReferenceSelect/Reducer';
import switchesReducer, {SwitchesState} from './components/FEComponents/Switches/Reducer';
import FSReducer, {FSState} from './components/FSComponents/FSReducer'; 


export interface StoreState {
    localize: LocalizeState;
    picksource: PickSourceState;
    referenceselect: RefSelectState;
    switches: SwitchesState;
    formatstyles: FSState;
}


const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
  localize: localizeReducer,
  picksource: pickSourceReducer,
  referenceselect: refSelectReducer,
  switches: switchesReducer,
  formatstyles: FSReducer
});

export default rootReducer;