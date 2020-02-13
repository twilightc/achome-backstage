import React, { useMemo, FC } from 'react';
import clsx from 'clsx';
import {
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText
} from '../../modules/share-material/material-core';
import {
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  InboxIcon,
  MailIcon
} from '../../modules/share-material/material-icon';
import { useStyles } from './useStyles';
import { useHistory } from 'react-router-dom';

let MiniDrawer: FC = ({ children }) => {
  const history = useHistory();
  const ItemLinks = useMemo(
    () => [
      { key: '管理', value: 'manage' },
      { key: '新增商品', value: 'add-merchandise' },
      { key: '商品列表', value: 'merchandise-list' }
    ],
    []
  );
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.Barcolor, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {ItemLinks.map((data, index) => (
            <ListItem
              button
              key={data.key}
              onClick={() => history.push(`/${data.value}`)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={data.key} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <>{children}</>
        {/* <Typography paragraph>{children}</Typography> */}
      </main>
    </div>
  );
};

export default MiniDrawer;
