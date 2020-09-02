import React, { createContext, useReducer } from 'react';
import { IUserContext, IUserContextState, UserContextAction, ActionType } from './Models';

const initialState: IUserContextState = {
    user: null,
}

const UserStore = createContext<IUserContext>({ state: initialState, dispatch: () => initialState });
const { Provider } = UserStore;

const UserProvider: React.FC<{}> = (props) => {
    const [state, dispatch] = useReducer((state: IUserContextState, action: UserContextAction) => {
        let newState = { ...state };

        switch (action.type) {
            case ActionType.SET_USER:
                newState.user = action.user;
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

export { UserStore, UserProvider };