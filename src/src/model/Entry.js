import { auth, firestore } from '../firebase';

class Entry {
  static create = async ({ projectId='' }) => {
    if (!auth.currentUser) {
      const confirm = window.confirm('応募するにはアカウントが必要です。アカウントを作成しますか？');

      if (!confirm) { return false }
      return window.location.href = '/signup';
    }

    const userRef = firestore.collection('users').doc(auth.currentUser.uid);
    const projectRef = firestore.collection('projects').doc(projectId);
    const state = 0; /* approving: 0, approved: 1 */

    try {
      const docRef = await firestore.collection('entries').add({
        userRef,
        projectRef,
        state
      });
      return docRef;
    } catch (error) {
      throw error;
    }
  }
}

export default Entry;
