const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const authedUser = await admin.auth().getUser(user.uid);
  const displayName = authedUser.displayName;
  const photoURL = authedUser.photoURL;
  let docRef = admin.firestore().collection('users').doc(uid)
  docRef.set({
    displayName: displayName,
    photoURL: photoURL,
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
