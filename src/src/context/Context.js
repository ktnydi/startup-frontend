import React from 'react';
import firebase from 'firebase/app';
import { auth, firestore, storage } from '../firebase';

const AppContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userSignIn: false,
      notification: false,
      popup: false,
      menu: false,
    }
  }

  showPopup = () => {
    this.setState({ popup: true })
  };

  closePopup = () => {
    this.setState({ popup: false })
  };

  showMenu = () => {
    this.setState({ menu: true })
  }

  closeMenu = () => {
    this.setState({ menu: false })
  }

  signUpWithEmail = async (user, history) => {
    const {name, email, password, password_confirm} = user

    if (password !== password_confirm) {
      return window.alert('パスワードを一致させてください。')
    }

    try {
      const credential = await auth.createUserWithEmailAndPassword(email, password)
      const gsReference = storage.refFromURL('gs://startup-c48db.appspot.com/images/default.jpg')
      const url = await gsReference.getDownloadURL()
      
      await credential.user.updateProfile({
        displayName: name,
        photoURL: url,
      })

      const user = credential.user
      this.setState({
        userSignIn: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
      })
      
      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  signInWithEmail = (user, history) => {
    const {email, password} = user
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          userSignIn: true,
        })

        const {uid, email, displayName, photoURL} = response.user
        const newUser = {uid, email, displayName, photoURL}
        this.setState({ user: newUser })

        history.push('/')
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
      })
  }

  signOut = (history) => {
    auth.signOut()
    this.setState({
      userSignIn: false,
    })
    history.push('/')
  }

  updateAvatar = async (imageFile) => {
    const storageRef = storage.ref()
    const avatarImageRef = storageRef.child(`images/${auth.currentUser.uid}.jpg`)
    const snapshot = await avatarImageRef.put(imageFile)
    if (snapshot.state !== 'success') { return false }
    
    const url = await avatarImageRef.getDownloadURL()
    auth.currentUser.updateProfile({
      photoURL: url,
    })

    const newUser = Object.assign({}, this.state.user)
    newUser.photoURL = url
    this.setState({
      user: newUser,
    })
  }

  updateProfile = (user) => {
    const {displayName, introduce, skill, location} = user
    const currentUser = auth.currentUser

    if (displayName) {
      currentUser.updateProfile({
        displayName: displayName,
      })
    }

    let docRef = firestore.collection('users').doc(currentUser.uid)
    docRef.update({introduce, skill, location})
  }

  updateEmail = (newEmail) => {
    auth.currentUser.updateEmail(newEmail)
  }

  updatePassword = (user) => {
    const {password, newPassword, newPasswordConfirm} = user
    if (newPassword !== newPasswordConfirm) { return false }

    const credential = firebase.auth.EmailAuthProvider.credential(this.state.user.email, password)

    auth.currentUser.reauthenticateWithCredential(credential).then(response => {
      auth.currentUser.updatePassword(newPassword)
    })
    .catch(error => {
      console.log(error)
    })
  }

  withdraw = (history) => {
    auth.currentUser.delete()
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
      })
  }

  userAuthState = (user) => {
    this.setState({
      userSignIn: !!user,
    })
    if (user) {
      const {uid, email, displayName, photoURL} = user
      const newUser = {uid, email, displayName, photoURL}

      this.setState({
        user: newUser,
      })
    }
  }

  render() {
    const store = {
      ...this.state,
      showPopup: this.showPopup,
      closePopup: this.closePopup,
      showMenu: this.showMenu,
      closeMenu: this.closeMenu,
      signUpWithEmail: this.signUpWithEmail,
      signInWithEmail: this.signInWithEmail,
      signOut: this.signOut,
      updateAvatar: this.updateAvatar,
      userAuthState: this.userAuthState,
      updateProfile: this.updateProfile,
      updateEmail: this.updateEmail,
      updatePassword: this.updatePassword,
      withdraw: this.withdraw,
    }

    return(
      <AppContext.Provider value={store}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

const Connect = (Component) => (
  (props) => (
    <AppContext.Consumer>
      {context => <Component store={context} {...props} />}
    </AppContext.Consumer>
  )
)

export { Provider, Connect }
