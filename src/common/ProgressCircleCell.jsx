import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const styles = theme => ({
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
});

export const ProgressCircleCellBase = ({ value, classes, style }) => (
  
  <TableCell
    className={classes.progressBarCell}
    style={style}
    align="center"
  >
    <FiberManualRecordIcon/>
  </TableCell>
);
ProgressCircleCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};
ProgressCircleCellBase.defaultProps = {
  style: {},
};

export const ProgressCircleCell = withStyles(styles, { name: 'ProgressCircleCell' })(ProgressCircleCellBase);