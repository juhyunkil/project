import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,TableCell } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const colors = {'pre':'#B21F00','progress':'#C9DE00','complete':'#2FDE00','fail':'#212529'};

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
    <FiberManualRecordIcon style={{color:colors[value]}}/>
  </TableCell>
);

ProgressCircleCellBase.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export const ProgressCircleCell = withStyles(styles, { name: 'ProgressCircleCell' })(ProgressCircleCellBase);