export interface IUserContext {
    state: IUserContextState;
    dispatch: React.Dispatch<any>;
}

export interface User {
    id: string;
    displayName: string;
    sessionId: string;
}

export interface IUserContextState {
    user: User | null;
}

export enum ActionType {
    SET_USER
}

export type UserContextAction =
    | { type: ActionType.SET_USER; user: User }