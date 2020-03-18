import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Profile from './Profile';
import Email from './Email';
import Password from './Password';
import Withdraw from './Withdraw';

export default function Setting() {
  const initialIndex = () => {
    const validHashes = ['#profile', '#email', '#password', '#withdraw'];
    const hash = document.location.hash;

    if (!validHashes.includes(hash)) { return 0 }

    return validHashes.indexOf(hash);
  }

  const [index, setIndex] = useState(initialIndex)

  const spring = useSpring({
    transform: `translateX(${index * 100}%)`
  })

  return(
    <div className='setting'>
      <div className='setting__container'>
        <div className='setting__tab-wrapper'>
          <div className='setting__tabs'>
            <div className='setting__tab'>
              <NavLink
                to='/setting#profile'
                onClick={() => setIndex(0)}
                isActive={(_, location) => {
                  if (location.hash !== '#profile') { return false }
                  setIndex(0)
                }}
                className={
                  index === 0 ? 'setting__link-current' : 'setting__link'
                }
              >
                プロフィール
              </NavLink>
            </div>
            <div className='setting__tab'>
              <NavLink
                to='/setting#email'
                onClick={() => setIndex(1)}
                isActive={(_, location) => {
                  if (location.hash !== '#email') { return false }
                  setIndex(1)
                }}
                className={
                  index === 1 ? 'setting__link-current' : 'setting__link'
                }
              >
                メールアドレス
              </NavLink>
            </div>
            <div className='setting__tab'>
              <NavLink
                to='/setting#password'
                onClick={() => setIndex(2)}
                isActive={(_, location) => {
                  if (location.hash !== '#password') { return false }
                  setIndex(2)
                }}
                className={
                  index === 2 ? 'setting__link-current' : 'setting__link'
                }
              >
                パスワード
              </NavLink>
            </div>
            <div className='setting__tab'>
              <NavLink
                to='/setting#withdraw'
                onClick={() => setIndex(3)}
                isActive={(_, location) => {
                  if (location.hash !== '#withdraw') { return false }
                  setIndex(3)
                }}
                className={
                  index === 3 ? 'setting__link-current' : 'setting__link'
                }
              >
                アカウント削除
              </NavLink>
            </div>
          </div>
          <animated.div
            style={spring}
            className='setting__location'
          />
        </div>
        <div className='setting__tabitem-wrapper'>
          <div className='setting__tabitem'>
            { index === 0 && <Profile /> }
            { index === 1 && <Email /> }
            { index === 2 && <Password /> }
            { index === 3 && <Withdraw /> }
          </div>
        </div>
      </div>
    </div>
  );
}
