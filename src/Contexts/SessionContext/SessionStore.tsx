import React, { createContext, useReducer } from 'react';
import { ISessionContext, ISessionContextState, UserContextAction, ActionType } from './Models';

const initialState: ISessionContextState = {
    session: null,
}

const SessionStore = createContext<ISessionContext>({ state: initialState, dispatch: () => initialState });
const { Provider } = SessionStore;

const SessionProvider: React.FC<{}> = (props) => {
    const [state, dispatch] = useReducer((state: ISessionContextState, action: UserContextAction) => {
        let newState = { ...state };

        switch (action.type) {
            case ActionType.CREATE_SESSION:
                newState.session = action.session;
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