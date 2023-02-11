import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDOA3AB4jTuEyD7gQc3kHiOT-3lsJDOqY",
    authDomain: "alumni-database-e70ba.firebaseapp.com",
    projectId: "alumni-database-e70ba",
    storageBucket: "alumni-database-e70ba.appspot.com",
    messagingSenderId: "81199895246",
    appId: "1:81199895246:web:a36d57859944e1117db69f",
    measurementId: "G-CW58V8CFEN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize timestamp
const timestamp = firebase.firestore.Timestamp;

// Initialize services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectStorage, projectFirestore, projectAuth, timestamp };