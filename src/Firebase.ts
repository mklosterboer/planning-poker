import 'firebase/database';

const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;

export var firebaseConfig = {
    apiKey: apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId: projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: "473945346113",
    appId: appId,
    measurementId: "G-TDKC81QLS9"
};

export default firebaseConfig;