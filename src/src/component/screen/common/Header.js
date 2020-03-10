import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AppContainer from '../../container/AppContainer';
import { Icon, Avatar, makeStyles } from '@material-ui/core';
import avatar from '../../../image/sample/avatar.png';

export default function Header() {
  return(
    <header className='header'>
      <div className='header__container'>
        <Router>
          <h1 className='header__logo'>
            <Link to='/' className='header__link-logo'>startup</Link>
          </h1>
          <nav className='header__nav-left'>
            <ul className='header__list'>
              <NavLeftCell />
            </ul>
          </nav>
          <nav className='header__nav'>
            <ul className='header__list'>
              <NavRightCell />
            </ul>
          </nav>
        </Router>
      </div>
    </header>
  );
}

function NavLeftCell() {
  return(
    <React.Fragment>
      <li className='header__cell'>
        <Link to='/' className='header__link'>募集プロジェクト</Link>
      </li>
      <li className='header__cell'>
        <input type='text' placeholder='検索する' className='header__search' />
      </li>
    </React.Fragment>
  );
}

function NavRightCell() {
  return(
    <Subscribe to={[AppContainer]}>
      {app => (
        app.state.userSignIn
          ? <CellForUser />
          : <CellForGuest />
      )}
    </Subscribe>
  );
}

function CellForUser() {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      width: 40,
      height: 40,
      boxShadow: '0 1px 8px rgba(0, 0, 0, 0.2)',
    },
    icon: {
      fontSize: '2.2rem',
      color: 'rgba(0, 0, 0, 0.25)',
    },
  }));

  const classes = useStyles();

  return(
    <Subscribe to={[AppContainer]}>
      {app => (
        <React.Fragment>
          <li className='header__cell'>
            <Link to='/projects/create' className='header__link-newproject'>プロジェクト作成</Link>
          </li>
          <li className='header__cell'>
            <div onClick={() => app.showPopup()} className='header__user'>
              <Avatar alt='avatar' src={avatar} className={classes.avatar}
              />
              <span className='header__name'>ゲストユーザー</span>
            </div>
            { app.state.popup && <Popup />}
          </li>
          <li className='header__cell'>
            <div className='header__notification' onClick={() => app.showMenu()}>
              {
                app.state.notification && (
                  <div className='header__badge'></div>
                )
              }
              <Icon className={classes.icon}>
                notifications
              </Icon>
            </div>
            { app.state.menu && <Menu /> }
          </li>
        </React.Fragment>
      )}
    </Subscribe>
  );
}

function Popup() {
  return(
    <Subscribe to={[AppContainer]}>
      {app => (
        <div className='popup'>
          <div className='popup__screen' onClick={() => app.closePopup()} />
          <nav className='popup__nav'>
            <ul className='popup__container'>
              <li className='popup__item'>
                <Link to='/profile' className='popup__link'>プロフィール</Link>
              </li>
              <li className='popup__item'>
                <Link to='/dashboard' className='popup__link'>ダッシュボード</Link>
              </li>
              <li className='popup__item'>
                <Link to='/logout' className='popup__link'>ログアウト</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Subscribe>
  );
}

function Menu() {
  return(
    <Subscribe to={[AppContainer]}>
      {container => (
        <div className='menu'>
          <div className='menu__screen' onClick={() => container.closeMenu()} />
          <nav className='menu__nav'>
            <ul className='menu__container'>
              {['アリス', 'ボブ', 'ジョー'].map((name, index) => (
                <li key={index} className='menu__cell'>
                  <Link to='/messages/id' className='menu__link'>
                    <div>
                      <span className='menu__publisher'>{name}</span>さんからメッセージがあります。
                    </div>
                    <span className='menu__time'>{`約${index + 1}日前`}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </Subscribe>
  )
}

function CellForGuest() {
  return(
    <React.Fragment>
      <li className='header__cell'>
        <Link to='/login' className='header__link'>ログイン</Link>
      </li>
      <li className='header__cell'>
        <Link to='/signup' className='header__link-signup'>アカウント作成</Link>
      </li>
    </React.Fragment>
  );
}
