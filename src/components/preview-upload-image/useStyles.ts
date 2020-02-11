import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('lg')]: {
        width: '60%'
      },
      [theme.breakpoints.down('md')]: {
        width: '82%'
      },
      [theme.breakpoints.between('md', 'lg')]: {
        width: '75%'
      },
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      border: '3px #3f51b5 dashed',
      cursor: 'pointer'
    },
    uploadField: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '23vh'
    },
    fileImg: {
      [theme.breakpoints.down('sm')]: {
        maxWidth: '200px',
        maxHeight: '200px'
      },
      maxWidth: '400px',
      maxHeight: '400px'
    }
  })
);

export default useStyles;
