import React, { useState, useEffect } from 'react';
import { Subscribe } from 'unstated';
import AppContainer from '../container/AppContainer';

export default function EditPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [disabled, setDisabled] = useState(true);

  const user = {
    newPassword: newPassword,
    newPasswordConfirm: newPasswordConfirm,
  };

  useEffect(() => {
    if (newPassword.length > 0 && newPasswordConfirm.length > 0) {
      setDisabled(newPassword !== newPasswordConfirm)    
    }
  }, [newPassword, newPasswordConfirm])

  const inputChangeHandler = (e) => {
    const target = e.target;

    if (target.name === 'new_password') {
      setNewPassword(target.value);
    }

    if (target.name === 'new_password_confirm') {
      setNewPasswordConfirm(target.value);
    }
  }

  return(
    <div className='forgot'>
      <div className='forgot__container'>
        <h2 className='forgot__header'>パスワード再設定</h2>
        <form className='forgot__form' onSubmit={(e) => e.preventDefault()}>
          <div className='forgot__section'>
            <p className='forgot__caution'>
              新しいパスワードを入力してください
            </p>
          </div>
          <div className='forgot__section'>
            <label>
              <input
                type='password'
                name='new_password'
                value={newPassword}
                placeholder='新しいパスワード'
                autoFocus
                onChange={(e) => inputChangeHandler(e)}
                className='forgot__field'
              />
            </label>
          </div>
          <div className='forgot__section'>
            <label>
              <input
                type='password'
                name='new_password_confirm'
                value={newPasswordConfirm}
                placeholder='新しいパスワードの確認'
                autoFocus
                onChange={(e) => inputChangeHandler(e)}
                className='forgot__field'
              />
            </label>
          </div>
          <div className='forgot__section'>
            <Subscribe to={[AppContainer]}>
              {app => (
                <button
                  className='forgot__submit'
                  disabled={disabled}
                  onClick={() => app.resetPassword(user)}
                >
                  <span>再設定する</span>
                </button>
              )}
            </Subscribe>
          </div>
        </form>
      </div>
    </div>
  )
}
