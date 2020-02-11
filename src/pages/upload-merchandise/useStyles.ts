import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // '& > *': {
      //   margin: theme.spacing(1),
      //   width: 200
      // }
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    formRoot: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    },
    dragDropField: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
      width: '12%',
      [theme.breakpoints.down('sm')]: {
        width: '60%'
      }
    },
    specField: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '22%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width: '83%'
      }
    },
    specChip: {
      display: 'flex',
      flexDirection: 'column'
    },
    addNewSpec: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        border: '3px #43a047 solid',
        margin: '3px'
      }
    }
  })
);

export default useStyles;
