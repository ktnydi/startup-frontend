import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Connect } from '../context/Context';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
      },
      disabled: true,
    }
  }

  changeInputHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    const new_user = Object.assign({}, this.state.user)
    new_user[name] = value
    this.setState({
      user: new_user,
    })
    
    Object.keys(this.state.user).forEach(key => {
      if (!this.state.user[key]) { return this.setState({ disabled: true })}

      this.setState({ disabled: false })
    })
  }

  render() {
    return(
      <div className='signup'>
        <div className='signup__container'>
          <h2 className='signup__header'>アカウント作成</h2>
          <form className='signup__form' onSubmit={(e) => e.preventDefault()}>
            <div className='signup__section'>
              <p className='signup__terms'>アカウントを作成することにより、<Link to='/terms' className='signup__link'>利用規約</Link>に同意するものとします。</p>
            </div>
            <div className='signup__section'>
              <label>
                <span className='signup__label'>ユーザー名:</span>
                <input
                  type='text'
                  name='name'
                  value={this.state.user.name}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='signup__field'
                />
              </label>
            </div>
            <div className='signup__section'>
              <label>
                <span className='signup__label'>メールアドレス:</span>
                <input
                  type='email'
                  name='email'
                  value={this.state.user.email}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='signup__field'
                />
              </label>
            </div>
            <div className='signup__section'>
              <label>
                <span className='signup__label'>パスワード:</span>
                <input
                  type='password'
                  name='password'
                  value={this.state.user.password}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='signup__field'
                />
              </label>
            </div>
            <div className='signup__section'>
              <label>
              <span className='signup__label'>確認用パスワード:</span>
                <input
                  type='password'
                  name='password_confirm'
                  value={this.state.user.password_confirm}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='signup__field'
                />
              </label>
            </div>
            <div className='signup__section'>
              <button
                className='signup__submit'
                disabled={this.state.disabled}
                onClick={() => {
                  this.props.store.signUpWithEmail(this.state.user, this.props.history)
                }}
              >
                <span>登録する</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Connect(SignUp));
