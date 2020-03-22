import React from 'react';

const AppContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    const store = {
      ...this.state,
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
