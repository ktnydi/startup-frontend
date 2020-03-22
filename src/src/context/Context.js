import React from 'react';
import { auth } from '../firebase';

const AppContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  signUpWithEmail = (user, history) => {
    const {name, email, password, password_confirm} = user

    if (password !== password_confirm) {
      return window.alert('パスワードを一致させてください。')
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        response.user.updateProfile({
          displayName: name,
        })
        .catch(error => {
          window.alert(`${error.code}\n${error.message}`)
        })

        this.setState({
          userSignIn: true,
        });

        history.push('/');
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
      })
  }

  signInWithEmail = (user, history) => {
    const {email, password} = user
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          userSignIn: true,
        })

        history.push('/')
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
      })
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
