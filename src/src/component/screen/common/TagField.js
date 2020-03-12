import React from 'react';
import { Icon, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/* 
 * items: array
 * itemProps: { onClick: function() }
 * inputProps: {
 *   tag:       string,
 *   onChange:  function(),
 *   onKeyDown: function(),
 *  }
 */

export default function TagField({items, itemProps, inputProps}) {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          {items.map((item, index) => (
            <li key={index} className={classes.item} onClick={(e) => itemProps.onClick(e, index)}>{item}</li>
          ))}
          <li className={classes.field}>
            <input
              type='text'
              value={inputProps.tag}
              placeholder='タグを入力'
              onChange={(e) => inputProps.onChange(e.target.value)}
              onKeyDown={(e) => inputProps.onKeyDown(e)}
              className={classes.tag}
            />
          </li>
        </ul>
      </nav>
      { items.length >= 15 && <p className={classes.notice}>これ以上タグを追加できません。</p> }
      <div className={classes.info}>
        <Tooltip
          title='タグをクリックすると削除できます。'
          arrow={true}
          placement='top'
          interactive
          classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow
          }}
        >
          <Icon className={classes.iconInfo}>info</Icon>
        </Tooltip>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  tooltip: {
    display: 'inline-block',
    padding: '10px',
    fontWeight: 'bolder',
    borderRadius: 8,
    backgroundColor: '#424242',
    color: '#fff',
    fontSize: '1.2rem',
  },
  arrow: {
    color: '#424242',
  },
  info: {
    position: 'absolute',
    top: '0',
    right: '0',
    cursor: 'pointer',
  },
  iconInfo: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  nav: {
    display: 'inline-block',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: 3,
    backgroundColor: '#fff',
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 15px 0',
    listStyle: 'none',
  },
  item: {
    display: 'inline-block',
    margin: '0 10px 10px 0',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: 30,
    cursor: 'pointer',
  },
  field: {
    display: 'inline-block',
    flex: 1,
    margin: '0 10px 10px 0',
    border: '1px solid transparent',
  },
  tag: {
    display: 'inline-block',
    width: '100%',
    minWidth: 130,
    border: 'none',
    padding: '5px 0',
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.75)',
  },
});
