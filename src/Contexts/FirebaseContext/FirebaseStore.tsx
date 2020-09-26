import React, { createContext, useContext } from "react";
import firebaseConfig from "../../Firebase";
import Firebase from "firebase";
import "firebase/database";

import { UserStore } from "../UserContext/UserStore";
import { SessionStore } from "../SessionContext/SessionStore";
import { ActionType as UserActionType, User } from "../UserContext/Models";
import { ActionType as SessionActionType, Session } from "../SessionContext/Models";

/* TODO: 
- Add actions that point back to the user and session context
- Complete the cycle of adding a session
*/

interface IFirebaseContextState {
    app?: Firebase.app.App;
    database?: Firebase.database.Database;
    api?: {
        getDbValue: () => void;
        addUser: (newUser: User) => void;
        getUsers: () => void;
        createSession: (newSession: Session) => void;
        getUsersForSession: (sessionID: string) => void;
        getSessions: () => void;
    };
}

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext<IFirebaseContextState>({});
export { FirebaseContext };

const FirebaseProvider: React.FC = ({ children }) => {
    const userContext = useContext(UserStore);
    const sessionContext = useContext(SessionStore);

    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    function getApp() {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(firebaseConfig);
        }
        return Firebase.app();
    }

    function getDbValue() {
        getApp()
            .database()
            .ref("test")
            .on("value", snapshot => {
                const vals = snapshot.val();

                const newUser: User = {
                    id: "1",
                    sessionId: "1",
                    displayName: vals["-MGLL4bldy3BSZ-f7kyD"]
                };

                userContext.dispatch({ type: UserActionType.SET_USER, user: newUser });
            });
    }

    function getUsers() {
        getApp()
            .database()
            .ref("users")
            .on("value", snapshot => {
                const vals = snapshot.val();
                const _records = [];

                for (var key in vals) {
                    _records.push(vals[key]);
                }

                var latestVal = _records.length;

                userContext.dispatch({
                    type: UserActionType.SET_USER,
                    user: _records[latestVal - 1]
                });
            });
    }

    function getSessions() {
        getApp()
            .database()
            .ref(`sessions/`)
            .on("value", snapshot => {
                const vals = snapshot.val();
                const _records = [];

                for (let key in vals) {
                    _records.push(vals[key]);
                }

                sessionContext.dispatch({
                    type: SessionActionType.SET_SESSIONS,
                    sessions: _records
                });
            });
    }

    function getUsersForSession(sessionId: string) {
        getApp()
            .database()
            .ref(`users/${sessionId}`)
            .on("value", snapshot => {
                const vals = snapshot.val();
                const _records = [];

                for (let key in vals) {
                    _records.push(vals[key]);
                }

                sessionContext.dispatch({
                    type: SessionActionType.SET_USERS,
                    users: _records
                });
            });
    }

    function addUser(newUser: User) {
        getApp()
            .database()
            .ref(`users/${newUser.sessionId}/`)
            .push()
            .set(newUser)
            .catch(error => {
                console.log(error);
            });
    }

    function createSession(newSession: Session) {
        getApp()
            .database()
            .ref(`sessions/`)
            .push(newSession, () => {
                sessionContext.dispatch({
                    type: SessionActionType.SET_CURRENT_SESSION,
                    session: newSession
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    const firebaseApp: IFirebaseContextState = {
        app: getApp(),
        database: getApp().database(),
        api: {
            getDbValue,
            addUser,
            getUsers,
            createSession,
            getUsersForSession,
            getSessions,
        }
    };

    return <FirebaseContext.Provider value={firebaseApp}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
