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
    currentSession: Session | null;
    users: User[];
    sessions: Session[] | null;
}

export enum ActionType {
    SET_CURRENT_SESSION,
    SET_USERS,
    SET_SESSIONS
}

export type SessionContextAction =
    | { type: ActionType.SET_CURRENT_SESSION; session: Session }
    | { type: ActionType.SET_USERS; users: User[] }
    | { type: ActionType.SET_SESSIONS; sessions: Session[] }