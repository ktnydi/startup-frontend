import React from 'react';

export default function Tooltip(props) {
  return(
    <div className='tooltip'>
      <div className='tooltip__icon'>
        {props.children}
      </div>
      <div className='tooltip__popup'>
        <p className='tooltip__title'>{props.title}</p>
      </div>
    </div>
  )
}
