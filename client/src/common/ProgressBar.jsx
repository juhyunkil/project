import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    progressBar: {
      float: 'left',
      color:'white'
    },
  }));

const colors = {'pre':'#B21F00','progress':'#C9DE00','complete':'#2FDE00','fail':'#212529'};

export default function ProgressBar(props){
    const classes = useStyles();
    var h = props.height;

    var pre = props.progressArray["pre"]
    var progress = props.progressArray["progress"]
    var complete = props.progressArray["complete"]
    var fail = props.progressArray["fail"]
    var total = pre+progress+complete+fail ? pre+progress+complete+fail : 1 ;

    var preRate =  pre ? parseInt(pre/total*100) : 0;
    var progressRate = progress ? parseInt(progress/total*100) : 0;
    var completeRate = complete ? parseInt(complete/total*100) : 0;
    var failRate = fail ? parseInt(fail/total*100) : 0;

    return(
        <>
            {pre ? 
                <div
                    className={classes.progressBar}
                    style={{ width: `${preRate}%`, backgroundColor:colors['pre'], height: 8*h}}
                >{pre}</div>
            : <div></div>}
            {progress ? 
                <div
                className={classes.progressBar}
                style={{ width: `${progressRate}%`, backgroundColor:colors['progress'], height: 8*h}}
            >{progress}</div>
            : <div></div>}
            {complete ? 
                <div
                className={classes.progressBar}
                style={{ width: `${completeRate}%`, backgroundColor:colors['complete'], height: 8*h}}
            >{complete}</div>
            : <div></div>}
            {fail ? 
                <div
                className={classes.progressBar}
                style={{ width: `${failRate}%`, backgroundColor:colors['fail'], height: 8*h}}
            >{fail}</div>
            : <div></div>}
            
        </>
    )
}
