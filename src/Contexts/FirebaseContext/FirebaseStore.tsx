import React, { createContext, useContext } from 'react'
import firebaseConfig from '../../Firebase';
import Firebase from 'firebase'
import 'firebase/database';

import { UserStore } from "../UserContext/UserStore";
// import { SessionStore } from "../SessionContext/SessionStore";
import { ActionType, User } from '../UserContext/Models';

/* TODO: 
- Add actions that point back to the user and session context
- Complete the cycle of adding a session
*/

interface IFirebaseContextState {
    app?: Firebase.app.App,
    database?: Firebase.database.Database,
    api?: {
        getDbValue: () => void;
        setDbValue: (newValue: string) => void;
        addUser: (newUser: User) => void;
        getUsers: () => void;
    }
}

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext<IFirebaseContextState>({});
export { FirebaseContext }

const FirebaseProvider: React.FC = ({ children }) => {

    const userContext = useContext(UserStore);
    // const sessionStore = useContext(SessionStore);

    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    function getApp() {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(firebaseConfig);
        }
        return Firebase.app();
    }

    function getDbValue() {
        getApp().database().ref("test").on('value', (snapshot) => {
            const vals = snapshot.val();

            const newUser: User = {
                id: "1",
                sessionId: "1",
                displayName: vals["-MGLL4bldy3BSZ-f7kyD"]
            }

            userContext.dispatch({ type: ActionType.SET_USER, user: newUser });
        });
    }

    function setDbValue(newValue: string) {
        getApp().database()
            .ref(`test/-MGLL4bldy3BSZ-f7kyD`)
            .set(newValue)
            .then(() => {
                // Do nothing
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getUsers() {
        getApp().database()
            .ref("users")
            .on("value", snapshot => {
                const vals = snapshot.val();
                const _records = [];

                for (var key in vals) {
                    _records.push(vals[key]);
                }

                var latestVal = _records.length;

                userContext.dispatch(
                    {
                        type: ActionType.SET_USER,
                        user: _records[latestVal - 1]
                    })
            });
    }

    function addUser(newUser: User) {
        getApp().database()
            .ref("users/")
            .push()
            .set(newUser)
            .catch(error => {
                console.log(error);
            });
    }

    const firebaseApp: IFirebaseContextState = {
        app: getApp(),
        database: getApp().database(),
        api: {
            getDbValue,
            setDbValue,
            addUser,
            getUsers
        }
    }

    return (
        <FirebaseContext.Provider value={firebaseApp}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider;