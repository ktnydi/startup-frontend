import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Connect } from '../context/Context';
import { Icon, Avatar, makeStyles } from '@material-ui/core';
import avatar from '../asset/image/avatar.png';

export default function Header() {
  return(
    <header className='header'>
      <div className='header__container'>
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

const NavRightCell = Connect((props) => (
  props.store.userSignIn ? <CellForUser /> : <CellForGuest />
));

function CellForUser() {
  return(
    <React.Fragment>
      <li className='header__cell'>
        <Link to='/projects/create' className='header__link-newproject'>プロジェクト作成</Link>
      </li>
      <li className='header__cell'>
        <CurrentUser />
        <Popup />
      </li>
      <li className='header__cell'>
        <Notification />
        <Menu />
      </li>
    </React.Fragment>
  );
}

const CurrentUser = Connect((props) => {
  const classes = useStyles();

  return(
    <div onClick={() => props.store.showPopup()} className='header__user'>
      <Avatar alt='avatar' src={avatar} className={classes.avatar}
      />
      <span className='header__name'>ゲストユーザー</span>
    </div>
  );
});

const Popup = withRouter(Connect((props) => {
  if (!props.store.popup) { return false }

  return(
    <div className='popup'>
      <div className='popup__screen' onClick={() => props.store.closePopup()} />
      <nav className='popup__nav'>
        <ul className='popup__container'>
          <li className='popup__item'>
            <Link to='/setting' className='popup__link' onClick={() => props.store.closePopup()}>アカウント設定</Link>
          </li>
          <li className='popup__item'>
            <Link to='/dashboard' className='popup__link' onClick={() => props.store.closePopup()}>ダッシュボード</Link>
          </li>
          <li className='popup__item'>
            <div className='popup__link' onClick={() => props.store.signOut(props.history)}>ログアウト</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}));

const Notification = Connect((props) => {
  const classes = useStyles();

  return(
    <div className='header__notification' onClick={() => props.store.showMenu()}>
      {
        props.store.notification && (
          <div className='header__badge'></div>
          )
        }
      <Icon className={classes.icon}>
        notifications
      </Icon>
    </div>
  );
});

const Menu = Connect((props) => {
  if (!props.store.menu) { return false }

  return(
    <div className='menu'>
      <div className='menu__screen' onClick={() => props.store.closeMenu()} />
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
  )
});

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
