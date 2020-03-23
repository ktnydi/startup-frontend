import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
