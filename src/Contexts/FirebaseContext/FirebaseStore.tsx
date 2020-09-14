import React, { createContext, useEffect, useContext } from 'react'
import firebaseConfig from '../../Firebase';
import Firebase from 'firebase'
import 'firebase/database';

import { UserStore, UserContextModels } from "../UserContext";
import { SessionStore } from "../SessionContext";
import { User } from '../UserContext/Models';

/* TODO: 
- figure out types for firebase
- Maybe just instantiate it the way it is working in Homepage
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

    const userContext = useContext(UserStore.UserStore);
    const sessionStore = useContext(SessionStore.SessionStore);

    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    function getApp() {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(firebaseConfig);
        }
        return Firebase.app();
    }

    // function to query Todos from the database and
    // fire a Redux action to update the items in real-time
    function getTodos() {
        getApp().database().ref('todos').on('value', (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for (var key in vals) {
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            // setTodos is a Redux action that would update the todo store
            // to the _records payload
            // dispatch(setTodos(_records));
        })
    }

    function getDbValue() {
        getApp().database().ref("test").on('value', (snapshot) => {
            const vals = snapshot.val();

            const newUser: UserContextModels.User = {
                id: "1",
                sessionId: "1",
                displayName: vals["-MGLL4bldy3BSZ-f7kyD"]
            }

            userContext.dispatch({ type: UserContextModels.ActionType.SET_USER, user: newUser });
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
                        type: UserContextModels.ActionType.SET_USER,
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