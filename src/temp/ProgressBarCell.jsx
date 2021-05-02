import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  progressBar: {
    backgroundColor: '#faa',
    float: 'left',
    height: theme.spacing.unit*2,
  },
});

export const ProgressBarCellBase = ({ value, classes, style }) => (
  
  <TableCell
    className={classes.progressBarCell}
    style={style}
  >
    <div
      className={classes.progressBar}
      style={{ width: `${value}%` }}
      title={`${value.toFixed(1)}%`}
    >{value}</div>
  </TableCell>
);
ProgressBarCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};
ProgressBarCellBase.defaultProps = {
  style: {},
};

export const ProgressBarCell = withStyles(styles, { name: 'ProgressBarCell' })(ProgressBarCellBase);