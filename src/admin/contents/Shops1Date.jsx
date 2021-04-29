//#Shops1Data
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function Shops1Date() {
  const classes = useStyles();

  return <div className={classes.root}>{"2021-03-29 - 2021-04-04"}</div>;
}

