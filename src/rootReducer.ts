import {combineReducers, Reducer} from 'redux';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import pickSourceReducer, { PickSourceState} from './components/FEComponents/PickDataSource/Reducer';
import refSelectReducer, {RefSelectState} from './components/FEComponents/ReferenceSelect/Reducer' 


export interface StoreState {
    localize: LocalizeState;
    picksource: PickSourceState;
    referenceselect: RefSelectState;
}


const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
  localize: localizeReducer,
  picksource: pickSourceReducer,
  referenceselect: refSelectReducer
});

export default rootReducer;