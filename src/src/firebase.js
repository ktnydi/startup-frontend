import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
