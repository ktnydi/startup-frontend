import React from 'react';
import { Link } from 'react-router-dom';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
        remember_me: false,
      },
      disabled: true,
    }
  }

  changeInputHandler = (e) => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value 
    const new_user = Object.assign({}, this.state.user)
    new_user[name] = value
    this.setState({
      user: new_user,
    })
    
    Object.keys(this.state.user).forEach(key => {
      if (key === 'remember_me') { return }
      if (!this.state.user[key]) { return this.setState({ disabled: true })}

      this.setState({ disabled: false })
    })
  }

  render() {
    return(
      <div className='sign'>
        <div className='sign__container'>
          <h2 className='sign__header'>ログイン</h2>
          <form className='sign__form' onSubmit={(e) => e.preventDefault()}>
            <div className='sign__section'>
              <p className='sign__terms'>ログインすることにより、<Link to='/terms' className='sign__link'>利用規約</Link>に同意するものとします。</p>
            </div>
            <div className='sign__section'>
              <label>
                <span className='sign__label'>メールアドレス:</span>
                <input
                  type='email'
                  name='email'
                  value={this.state.user.email}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='sign__field'
                />
              </label>
            </div>
            <div className='sign__section'>
              <label>
                <span className='sign__label'>パスワード:</span>
                <input
                  type='password'
                  name='password'
                  value={this.state.user.password}
                  placeholder=''
                  onChange={(e) => this.changeInputHandler(e)}
                  className='sign__field'
                />
              </label>
            </div>
            <div className='sign__section'>
              <label>
                <div className='sign__remember-me'>
                  <input
                    type='checkbox'
                    name='remember_me'
                    onChange={(e) => this.changeInputHandler(e)}
                    className='sign__checkbox'
                  />
                  <div className='sign__checkbox-brafh'></div>
                  <span>ログイン情報を記憶する</span>
                </div>
              </label>
            </div>
            <div className='sign__section'>
              <button
                className='sign__submit'
                disabled={this.state.disabled}
                onClick={() => console.log('login')}
              >
                <span>ログインする</span>
              </button>
            </div>
            <div className='sign__section'>
              <Link to='/password/new' className='sign__forgot-password'>パスワードをお忘れですか？</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
