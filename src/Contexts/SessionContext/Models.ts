import { UserContextModels } from "../UserContext";

export interface ISessionContext {
    state: ISessionContextState;
    dispatch: React.Dispatch<any>;
}

export interface Vote {
    userId: string;
    pollId: string;
    value:string;
}

export interface Poll {
    id: string;
    displayName: string;
    votes: Vote[];
}

export interface Session {
    id: string;
    displayName: string;
    users: UserContextModels.User[]
}

export interface ISessionContextState {
    session: Session | null;
}

export enum ActionType {
    CREATE_SESSION
}

export type UserContextAction =
    | { type: ActionType.CREATE_SESSION; session: Session }