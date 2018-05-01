import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styles = {
  root: {
    width: '100%',
    bottom: 0
  },
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: null,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="hola@hgutierrez.com" value="mail" icon={<EmailIcon />} />
        <BottomNavigationAction label="(0221) 483-0171" value="phone" icon={<PhoneIcon />} />
        <BottomNavigationAction label="Diagonal 114 99" value="location" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
