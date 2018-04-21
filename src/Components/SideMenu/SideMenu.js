import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function RouteList(props) {
  const {
    routes,
  } = props;

  return routes.map((route) => {
    return (
      <Link to={route.path} key={route.path}>
        <ListItem button>
          <ListItemText primary={route.name} />
        </ListItem>
      </Link>
    )
  })
}

RouteList.propTypes = {
  routes: PropTypes.array.isRequired,
};

const styles = {
  list: {
    width: 250,
  },
};

class SideMenu extends React.Component {
  render() {
    const {
      onToggleDrawer,
      isOpen,
      routes,
    } = this.props;
    const title = 'Menu';

    return (
      <Drawer open={isOpen} onClose={onToggleDrawer} className="side-menu">
        <AppBar position="static">
          <Toolbar disableGutters>
            <IconButton color="inherit" aria-label="Close" onClick={onToggleDrawer}>
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer}
          onKeyDown={onToggleDrawer}
        >
          <List className={this.props.classes.list}>
            <RouteList routes={routes} />
          </List>
        </div>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(SideMenu);
