import React, { createContext, useReducer } from 'react';
import { ISessionContext, ISessionContextState, SessionContextAction, ActionType } from './Models';

const initialState: ISessionContextState = {
    currentSession: null,
    users: [],
    sessions: null
}

const SessionStore = createContext<ISessionContext>({ state: initialState, dispatch: () => initialState });
const { Provider } = SessionStore;

const SessionProvider: React.FC<{}> = (props) => {
    const [state, dispatch] = useReducer((state: ISessionContextState, action: SessionContextAction) => {
        let newState = { ...state };

        switch (action.type) {
            case ActionType.SET_CURRENT_SESSION:
                newState.currentSession = action.session;
                break;
            case ActionType.SET_USERS:
                newState.users = action.users;
                break;
            case ActionType.SET_SESSIONS:
                newState.sessions = action.sessions;
                break;
            default:
                break;
        }

        return newState;
    }, initialState)

    return (
        <Provider value={{ state, dispatch }}>
            {props.children}
        </Provider>
    )
}

export { SessionStore, SessionProvider };