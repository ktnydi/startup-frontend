import React from 'react';
import { Link } from 'react-router-dom';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
      },
      disabled: true,
    }
  }

  changeInputHandler = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    const new_user = Object.assign({}, this.state.user)
    new_user[name] = value
    this.setState({
      user: new_user,
    })
    
    if (!this.state.user.email) { return this.setState({ disabled: true })}

    this.setState({ disabled: false })
  }

  render() {
    return(
      <div className='forgot'>
        <div className='forgot__container'>
          <h2 className='forgot__header'>パスワード再設定</h2>
          <form className='forgot__form' onSubmit={(e) => e.preventDefault()}>
            <div className='forgot__section'>
              <p className='forgot__caution'>
                ご登録いただいたメールアドレスを入力してください。<br />
                メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。
              </p>
            </div>
            <div className='forgot__section'>
              <label>
                <input
                  type='email'
                  name='email'
                  value={this.state.user.email}
                  placeholder='メールアドレス'
                  autoFocus
                  onChange={(e) => this.changeInputHandler(e)}
                  className='forgot__field'
                />
              </label>
            </div>
            <div className='forgot__section'>
              <button
                className='forgot__submit'
                disabled={this.state.disabled}
                onClick={() => console.log('send email')}
              >
                <span>送信する</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
