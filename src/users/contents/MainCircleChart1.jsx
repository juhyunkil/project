import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
    marginLeft: theme.spacing(2),
    width: '400px',
    },
  },
}));

export default function CircularDeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" value={90} />
      <CircularProgress variant="determinate" value={50} />
      <CircularProgress variant="determinate" value={75} />
      <CircularProgress variant="determinate" value={100} />

    </div>
  );
}