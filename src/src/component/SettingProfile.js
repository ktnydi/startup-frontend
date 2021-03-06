import React, { useState } from 'react';
import {
  Icon,
  Avatar,
  TextField,
  MuiThemeProvider,
  makeStyles,
} from '@material-ui/core';
import Tooltip from '../common/Tooltip';
import theme from '../asset/Theme';
import { auth, firestore } from '../firebase';
import { Connect } from '../context/Context';

const useStyles = makeStyles({
  avatar: {
    display: 'inline-block',
    width: 120,
    height: 120,
    border: '1px solid #ddd',
  },
  label: {
    fontSize: '1.5rem',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    fontSize: '1.5rem',
    lineHeight: '1.5em',
    color: 'rgba(0, 0, 0, 0.75)',
    '&:before': {
      borderBottom: '1px solid #ddd',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #ddd',
    },
  },
  info: {
    color: 'silver',
  },
});

function Profile(props) {
  const [displayName, setDisplayName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [skill, setSkill] = useState('');
  const [skillList, setSkillList] = useState([]);
  const [location, setLocation] = useState('');
  const user = {
    displayName: displayName,
    introduce: introduce,
    skill: skillList,
    location: location
  }

  const classes = useStyles();

  React.useEffect(() => {
    const currentUser = auth.currentUser
    setDisplayName(currentUser.displayName);

    const docRef = firestore.collection('users').doc(currentUser.uid);
    docRef.get()
      .then(doc => {
        const data = doc.data();
        setIntroduce(data.introduce);
        setSkillList(data.skill);
        setLocation(data.location);
      })
      .catch(error => {
        window.alert(`${error.code}\n${error.message}`)
      })
  }, [])

  const addListHandler = (e) => {
    if (e.keyCode !== 13) { return false }
    if (skill.length === 0) { return false }

    const new_skillList = Object.assign([], skillList);
    new_skillList.push(skill);
    setSkillList(new_skillList);
    setSkill('');
  }

  const removeListHandler = (e, index) => {
    const new_skillList = Object.assign([], skillList);
    new_skillList.splice(index, 1);
    setSkillList(new_skillList);
    setSkill('');
  }

  return(
    <div className='profile'>
      <form onSubmit={(e) => e.preventDefault(e)}>
        <div className='profile__section'>
          <div className='profile__image'>
          <Avatar src={props.store.user.photoURL}  className={classes.avatar} />
            <div>
              <label  className='profile__change'>
                <input
                  type='file'
                  name='image'
                  placeholder=''
                  onChange={(e) => props.store.updateAvatar(e.target.files[0])}
                  style={{display: 'none'}}
                />
                <span>画像を変更</span>
              </label>
            </div>
          </div>
        </div>
        <div className='profile__section'>
          <MuiThemeProvider theme={theme}>
            <TextField
              label='ユーザー名'
              fullWidth
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </MuiThemeProvider>
        </div>
        <div className='profile__section'>
          <MuiThemeProvider theme={theme}>
            <TextField
              label='自己紹介'
              fullWidth
              multiline
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </MuiThemeProvider>
        </div>
        <div className='profile__section'>
          <MuiThemeProvider theme={theme}>
            <TextField
              label='スキル'
              fullWidth
              placeholder='入力して確定キー'
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => addListHandler(e)}
            />
          </MuiThemeProvider>
          { skillList.length > 0 && (
            <div className='profile__skill'>
              <div className='profile__has'>
                <span>保有スキル</span>
                <div className='profile__tooltip'>
                  <Tooltip title='追加したスキルを削除するにはタグをクリックします。'>
                    <Icon className={classes.info}>info</Icon>
                  </Tooltip>
                </div>
              </div>
              <nav className='profile__nav'>
                <ul className='profile__list'>
                  {
                    skillList.map((item, index) => (
                      <li
                        key={index}
                        className='profile__item'
                        onClick={(e) => removeListHandler(e, index)}
                      >
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div className='profile__section'>
          <MuiThemeProvider theme={theme}>
            <TextField
              label='場所（任意）'
              fullWidth
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </MuiThemeProvider>
        </div>
        <div className='profile__submit'>
          <button
            type='button'
            onClick={() => props.store.updateProfile(user)}
            className='profile__update-btn'
          >
            <span>変更する</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Connect(Profile);
