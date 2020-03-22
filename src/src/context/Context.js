import React from 'react';

const AppContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignIn: true,
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

  render() {
    const store = {
      ...this.state,
      showPopup: this.showPopup,
      closePopup: this.closePopup,
      showMenu: this.showMenu,
      closeMenu: this.closeMenu,
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
