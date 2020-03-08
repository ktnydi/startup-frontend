import { Container } from 'unstated';

export default class AppContainer extends Container {
  state = {
    userSignIn: true,
    notification: false,
    popup: false,
    menu: false,
  };

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

  /*
   * user: object
   * {
   *   name: string
   *   email: string
   *   password: string
   *   password_confirm: string
   * }
   */
  signUpWithEmail = (user) => {
    //
  }

  /*
   * user: object
   * {
   *   email: string
   *   password: string
   *   remember_me: boolean
   * }
   */
  signInWithEmail = (user) => {
    //
  }

  /*
  * user: object
  * {
  *   email: string
  * }
  */
   sendPasswordResetEmail = (user) => {
     //
   }

  updateProfile = (user) => {
    //
  }

  updateEmail = (user) => {
    //
  }

  updatePassword = (user) => {
    //
  }

  withdraw = (user) => {
    const confirm = window.confirm('アカウントを削除します。本当によろしいですか？');

    if (confirm) {
      //
    }
  }
}
