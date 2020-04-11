const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const authedUser = await admin.auth().getUser(user.uid);
  const displayName = authedUser.displayName;
  const photoURL = authedUser.photoURL;
  const docRef = admin.firestore().collection('users').doc(uid)
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
  const docRef = admin.firestore().collection('users').doc(uid)
  docRef.delete();
  const avatarFile = admin.storage().bucket().file(`images/${uid}.jpg`);
  avatarFile.delete();
})

exports.updateProfile = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
  const userId = context.params.userId;
  const newUser = change.after.data();

  admin.auth().updateUser(userId, newUser);
})

exports.createProject = functions.firestore.document('users/{userId}/projects/{projectId}').onCreate((snapshot, context) => {
  const userId = context.params.userId;
  const projectId = snapshot.id;
  const data = snapshot.data();
  data.userRef = admin.firestore().collection('users').doc(userId);

  admin.firestore().doc(`projects/${projectId}`).set(data);
})
