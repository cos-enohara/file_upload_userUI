import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon,
  Button,
  ButtonGroup
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
import { THEMES } from 'src/constants';
import Account from './Account';
import Contacts from './Contacts';
import Notifications from './Notifications';
import Search from './Search';
import Settings from './Settings';
import useAuth from 'src/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';



const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();


  const handleLogout = async () => {
    try {
      await logout();
      history.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  const handleFileUpload = async () => {
    try {
      history.push('/app/fileupload');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable', {
        variant: 'error'
      });
    }
  };


  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <ButtonGroup variant="text" size="large" color="inherit" aria-label="text primary button group">
          <Button onClick={handleFileUpload}>ファイル提出</Button>
          <Button>FAQ</Button>
          <Button>お問い合わせ</Button>
        </ButtonGroup>
        <Box
          ml={2}
          flexGrow={1}
        />
        <ButtonGroup variant="text" size="large" color="inherit" aria-label="text primary button group">
          <Button>株式会社ベンジャミン</Button>
          <Button>梶間</Button>
          <Button onClick={handleLogout}>ログアウト</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
