import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import theme from '../../asset/Theme';

export default function Markdown({source}) {
  const classes = useStyles();

  return(
    <ReactMarkdown source={source} skipHtml={true} className={classes.markdown} />
  )
}

const useStyles = makeStyles({
  markdown: {
    width: '100%',
    '& *': {
      lineHeight: '1.8em',
      color: 'rgba(0, 0, 0, 0.75)',
    },
    '& h1, & h2': {
      fontSize: '2rem',
      padding: '0 0 5px 0',
      margin: '50px 0 10px',
      borderBottom: '1px solid #ddd',
      fontWeight: 'bolder',
    },
    '& h3': {
      fontSize: '1.75rem',
      margin: '30px 0 10px',
      fontWeight: 'bolder',
    },
    '& h4, & h5, & h6': {
      fontSize: '1.5rem',
      margin: '10px 0',
      fontWeight: 'bolder',
    },
    '& p': {
      margin: '0 0 15px 0',
    },
    '& ul': {
      listStyle: 'inside',
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& table': {
      borderCollapse: 'collapse',
      border: '1px solid #ddd',
    },
    '& th, & td': {
      padding: '5px 10px',
      border: '1px solid #ddd',
    },
    '& hr': {
      border: 'none',
      width: '100%',
      height: 1,
      backgroundColor: '#ddd',
    },
    '& blockquote': {
      margin: '20px 0',
      padding: 15,
      backgroundColor: '#fafbfc',
      border: '2px dashed #ddd',
      borderRadius: 3,
    },
    '& code': {
      fontFamily: 'monospace',
      display: 'inline-block',
      lineHeight: '1.8em',
      padding: '0 5px',
      borderRadius: 3,
      backgroundColor: '#fafafa',
    },
    '& pre code': {
      fontFamily: 'monospace',
      display: 'inline-block',
      lineHeight: '1.8em',
      width: '100%',
      padding: '10px 20px',
      borderRadius: 3,
      backgroundColor: '#272c34',
      color: 'rgba(255, 255, 255, 0.75)',
    },
  },
});

