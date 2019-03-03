import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

function RecipeLink(props: ButtonBaseProps) {
  return <Link to="/" {...props as LinkProps} />;
}
function BarLink(props: ButtonBaseProps) {
  return <Link to="/bar" {...props as LinkProps} />;
}
function GroceryLink(props: ButtonBaseProps) {
  return <Link to="/grocery" {...props as LinkProps} />;
}

class NavBar extends React.Component {
  state = {
    value: 0,
  };
  handleChange = (_event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <BottomNavigation
          style={{ position: 'fixed', bottom: '0', width: '100%' }}
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Recipes" icon={<ListIcon />} component={RecipeLink} />
          <BottomNavigationAction label="HomeBar" icon={<HomeIcon />} component={BarLink} />
          <BottomNavigationAction
            label="Grocery List"
            icon={<ShoppingCartIcon />}
            component={GroceryLink}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default NavBar;
