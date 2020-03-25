const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate(user => {
  const uid = user.uid;
  let docRef = admin.firestore().collection('users').doc(uid)
  docRef.set({
    introduce: '',
    skill: [],
    location: '',
  });
})

exports.deleteProfile = functions.auth.user().onDelete(user => {
  const uid = user.uid;
  let docRef = admin.firestore().collection('users').doc(uid)
  docRef.delete();
})
