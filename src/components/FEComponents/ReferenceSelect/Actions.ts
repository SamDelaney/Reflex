import { ReferenceInclusion, ComponentName } from './Reducer';

export enum ReferenceSelectActions {
    SET_INCLUSION = "SET_INCLUSION",
    SET_NAME = "SET_NAME"
}

export type ReferenceSelectAction =
    | SetNameAction
    | SetInclusionAction;


interface SetNameAction {
    type: ReferenceSelectActions.SET_NAME,
    payload: { origin: ComponentName, name: string }
}

export function setName(name: string, origin: ComponentName) {
    return {
        type: ReferenceSelectActions.SET_NAME,
        payload: {origin, name}
    }
}

interface SetInclusionAction {
    type: ReferenceSelectActions.SET_INCLUSION,
    payload: {origin: ComponentName, source: ReferenceInclusion }
}

export function setInclusion(source: ReferenceInclusion, origin: ComponentName) {
    return {
        type: ReferenceSelectActions.SET_INCLUSION,
        payload: {origin, source}
    }
}