import React from 'react';
import firebase from 'firebase/app';
import { auth, firestore, storage } from '../firebase';
import shortid from 'shortid';

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
      notice: {
        success: {
          active: false,
          message: '',
        }, 
        failure: {
          active: false,
          message: '',
        }
      }
    }
  }

  fadeInOutSuccessNotice = (message) => {
    const newNotice = Object.assign({}, this.state.notice)
    newNotice.success.active = true
    newNotice.failure.active = false
    newNotice.success.message = message
    this.setState({notice: newNotice})

    setTimeout(() => {
      newNotice.success.active = false
      this.setState({notice: newNotice})
    }, 6000)
  }

  fadeInOrOutFailureNotice = ({
    message='',
    type /*= 'fadeIn' or 'fadeOut' */
  }) => {
    const types = ['fadeIn', 'fadeOut']
    const newNotice = Object.assign({}, this.state.notice)

    try {
      if (!types.includes(type)) {
        throw new TypeError('invalid arguments, type property can specify only "fadeIn" or "fadeOut"')
      }
    } catch (error) {
      console.error(error)
    }

    newNotice.success.active = false
    if (type === 'fadeIn') {
      newNotice.failure.message = message
      newNotice.failure.active = true
    }
    if (type === 'fadeOut') { newNotice.failure.active = false }

    this.setState({notice: newNotice})
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
      this.fadeInOutSuccessNotice('アカウントを作成しました。')
    } catch (error) {
      this.fadeInOrOutFailureNotice({message: error.message, type: 'fadeIn'})
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
        this.fadeInOutSuccessNotice('お帰りなさい。')
      })
      .catch(error => {
        this.fadeInOrOutFailureNotice({message: error.message, type: 'fadeIn'})
      })
  }

  signOut = (history) => {
    auth.signOut()
    this.setState({
      userSignIn: false,
    })
    history.push('/')
    this.fadeInOutSuccessNotice('ログアウトしました。')
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
    this.fadeInOutSuccessNotice('画像を更新しました。')
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
    this.fadeInOutSuccessNotice('プロフィールを更新しました。')
  }

  updateEmail = (newEmail) => {
    auth.currentUser.updateEmail(newEmail)
    this.fadeInOutSuccessNotice('メールアドレスを更新しました。')
  }

  updatePassword = (user) => {
    const {password, newPassword, newPasswordConfirm} = user
    if (newPassword !== newPasswordConfirm) { return false }

    const credential = firebase.auth.EmailAuthProvider.credential(this.state.user.email, password)

    auth.currentUser.reauthenticateWithCredential(credential).then(response => {
      auth.currentUser.updatePassword(newPassword)
      this.fadeInOutSuccessNotice('パスワードを更新しました。')
    })
    .catch(error => {
      this.fadeInOrOutFailureNotice({message: error.message, type: 'fadeIn'})
    })
  }

  withdraw = (history) => {
    auth.currentUser.delete()
      .then(() => {
        history.push('/')
        this.fadeInOutSuccessNotice('ご利用ありがとうございました。')
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
        this.fadeInOrOutFailureNotice({message: error.message, type: 'fadeIn'})
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

  createProject = async (project, history) => {
    try {
      const {title, items, about} = project
      const docRef = await firestore.collection('projects').add({
        id: shortid.generate(),
        title,
        items,
        about,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        founderUid: this.state.user.uid,
      })
      console.log(docRef)
      this.fadeInOutSuccessNotice('プロジェクトを作成しました。')
      history.push('/')
    } catch (error) {
      this.fadeInOrOutFailureNotice({message: error.message, type: 'fadeIn'})
    }
  }

  render() {
    const store = {
      ...this.state,
      fadeInOrOutFailureNotice: this.fadeInOrOutFailureNotice,
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
      createProject: this.createProject,
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
