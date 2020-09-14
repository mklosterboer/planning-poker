import { User } from "../UserContext/Models";

export interface ISessionContext {
    state: ISessionContextState;
    dispatch: React.Dispatch<any>;
}

export interface Vote {
    userId: string;
    pollId: string;
    value: string;
}

export interface Poll {
    id: string;
    displayName: string;
    votes: Vote[];
}

export interface Session {
    id: string;
    displayName: string;
}

export interface ISessionContextState {
    session: Session | null;
    users: User[]
}

export enum ActionType {
    CREATE_SESSION,
    SET_USERS
}

export type SessionContextAction =
    | { type: ActionType.CREATE_SESSION; session: Session }
    | { type: ActionType.SET_USERS; users: User[] }