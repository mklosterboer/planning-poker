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
    // users: User[]
}

export interface ISessionContextState {
    session: Session | null;
}

export enum ActionType {
    CREATE_SESSION
}

export type UserContextAction =
    | { type: ActionType.CREATE_SESSION; session: Session }