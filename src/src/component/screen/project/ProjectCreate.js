import React from 'react';
import { TextareaAutosize, Icon, Tooltip } from '@material-ui/core';
import TagField from '../common/TagField';
import Markdown from '../common/Markdown';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../asset/Theme';

const defaultText = [
  '## 内容',
  '## 開発環境',
  '## 参加条件',
  '## 活動時間',
  '## 募集人数',
].join('\n\n')

export default function ProjectCreate() {
  const [title, setTitle] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [about, setAbout] = React.useState('');
  const [template, setTemplate] = React.useState(true);
  const [preview, setPreview] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    if (about.length > 0) { setTemplate(false) }
  }, [about])

  const addTagHandler = (e) => {
    if (e.keyCode !== 13) { return false }
    if (e.target.value.length === 0) { return false }
    if (items.includes(e.target.value)) { return setTag('') }

    const newItems = Object.assign([], items);
    newItems.push(e.target.value);
    setItems(newItems);
    setTag('');
  }

  const removeTagHandler = (e, index) => {
    const newItems = Object.assign([], items);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  const removeLastTagHandler = (e) => {
    if (e.target.value.length > 0) { return false }
    if (e.keyCode !== 8) { return false }
    const newItems = Object.assign([], items);
    newItems.pop();
    setItems(newItems);
  }

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) { addTagHandler(e) }
    if (e.keyCode === 8) { removeLastTagHandler(e) }
  }

  const templateHandler = () => {
    setAbout(defaultText);
    setTemplate(false);
  }
  
  return(
    <div className={classes.root}>
      <div className={classes.section}>
        <input
          type='text'
          placeholder='タイトル'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={classes.title}
        />
      </div>
      <div className={classes.section}>
        <TagField
          items={items}
          itemProps={{onClick: removeTagHandler}}
          inputProps={{
            tag: tag,
            onChange: setTag,
            onKeyDown: keyDownHandler
          }}
        />
      </div>
      <div className={classes.section}>
        {template && (
          <Tooltip
            title='見出しが挿入されます。'
            arrow={true}
            placement='top'
            interactive
            classes={{tooltip: classes.tooltip,　arrow: classes.arrow}}
          >
            <button
              type='button'
              onClick={() => templateHandler()}
              className={classes.template}
            >
              テンプレートを使用する
            </button>
          </Tooltip>
        )}
      </div>
      <div className={classes.section}>
        <div className={classes.tool}>
          <Tooltip
            title={preview ? 'エディターを表示' : 'プレビューを表示'}
            arrow={true}
            placement='top'
            interactive
            classes={{tooltip: classes.tooltip,　arrow: classes.arrow}}
          >
            <button type='button' onClick={() => setPreview(!preview)} className={classes.preview}>
                {preview ? (
                  <Icon className={classes.icon}>visibility_off</Icon>
                ) : (
                  <Icon className={classes.icon}>visibility</Icon>
                )}
            </button>
          </Tooltip>
        </div>
        {preview ? (
          <div className={classes.about}>
            <h1 className={classes.header}>{title.length > 0 ? title : 'タイトル'}</h1>
            <Markdown source={about} />
          </div>
        ) : (
          <TextareaAutosize
            type='text'
            placeholder='Markdownで内容を入力'
            defaultValue={about}
            onChange={(e) => setAbout(e.target.value)}
            className={classes.about}
          />
        )}
      </div>
      <div className={classes.section}>
        <div className={classes.submit}>
          <button type='button' className={classes.post}>
            メンバーを募集する
          </button>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 760,
    margin: '0 auto',
    padding: '30px 15px',
  },
  notice: {
    padding: '5px 15px',
    fontSize: '1.3rem',
    color: theme.palette.error.main,
  },
  section: {
    position: 'relative',
    '& + &': {
      margin: '10px 0 0',
    },
  },
  template: {
    display: 'inline-block',
    padding: '5px 15px',
    border: 'none',
    borderRadius: 3,
    outline: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': {
      opacity: 0.6,
    },
  },
  tool: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderLeft: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    outline: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '2rem',
    color: 'rgba(0, 0, 0, 0.5)',
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
  title: {
    display: 'inline-block',
    width: '100%',
    height: 60,
    padding: '0 15px',
    border: '1px solid #ddd',
    borderRadius: 3,
    backgroundColor: '#fff',
    fontSize: '2rem',
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  about: {
    display: 'inline-block',
    width: '100%',
    minHeight: 400,
    lineHeight: '1.5em',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: 3,
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.75)',
    resize: 'none',
    verticalAlign: 'bottom',
  },
  header: {
    margin: '15px 0 30px',
    fontSize: '2.5rem',
    fontWeight: 'bolder',
    borderRadius: 3,
  },
  submit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px 0 0',
    padding: '20px 0 0',
    borderTop: '1px solid #ddd',
  },
  post: {
    display: 'inline-block',
    width: 300,
    padding: '15px',
    border: 'none',
    borderRadius: 3,
    outline: 'none',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 5px 3px -3px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': {
      opacity: 0.6,
    },
  },
});
