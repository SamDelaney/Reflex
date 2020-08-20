export enum FSActions {
    SELECT_STYLE = "SELECT_STYLE"
}

export type FSAction = 
    | SelectStyleAction;

interface SelectStyleAction {
    type: FSActions.SELECT_STYLE,
    payload: string
}

export function selectStyleAction(name: string) {
    return {
        type: FSActions.SELECT_STYLE,
        payload: name
    }
}