import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green, yellow } from '@material-ui/core/colors';


const styles = theme => ({
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
});


export const ProgressCircleCellBase = ({ value, classes, style }) => (
  
<div>
  {
    {
      complete:<FiberManualRecordIcon style={{color: green[500]}}/>,
      pre:<FiberManualRecordIcon color='secondary'/>,
      progress:<FiberManualRecordIcon style={{color: yellow[500]}}/>,
      fail:<FiberManualRecordIcon/>,
    }[value]
  }
</div>        


    


 
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