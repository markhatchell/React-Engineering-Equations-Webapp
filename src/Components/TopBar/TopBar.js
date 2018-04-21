import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "material-ui/styles/index";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TopBar(props) {
  const {
    title,
    onToggleDrawer,
  } = props;

  return (
    <div>
      <AppBar position="static">
        <Toolbar disableGutters>
          <IconButton color="inherit" aria-label="Menu" onClick={onToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
