import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    itemInfo: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
    itemImage: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
);
