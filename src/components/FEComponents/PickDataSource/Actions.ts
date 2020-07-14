import {DataSourceState} from './Reducer';

export enum PickSourceActions {
    ADD_SOURCE = "ADD_SOURCE",
    SELECT_SOURCE = "SELECT_SOURCE"
}

export type PickSourceAction =
    | SelectSourceAction
    | AddSourceAction;


interface SelectSourceAction {
    type: PickSourceActions.SELECT_SOURCE,
    payload: string
}

export function selectSource(name: string) {
    return {
        type: PickSourceActions.SELECT_SOURCE,
        payload: name
    }
}

interface AddSourceAction {
    type: PickSourceActions.ADD_SOURCE,
    payload: DataSourceState
}

export function addSource(source: DataSourceState) {
    return {
        type: PickSourceActions.ADD_SOURCE,
        payload: source
    }
}